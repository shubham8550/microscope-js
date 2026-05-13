import type { Renderer, RenderHandle } from '@microscope-js/core';
import {
  assertMaxSize,
  assertSafeZipEntry,
  ByteBudget,
  createEl,
  MicroscopeError,
  sanitizeHtml,
} from '@microscope-js/utils';

export interface PptxOptions {
  /** Reject .pptx files larger than this many bytes (default 128 MB). */
  maxBytes?: number;
  /** Total uncompressed limit (default 512 MB). Zip-bomb defense. */
  maxUncompressed?: number;
}

const PPTX_MIMES = ['application/vnd.openxmlformats-officedocument.presentationml.presentation'];

export interface PptxHandle extends RenderHandle {
  readonly capabilities: {
    slideCount: number;
    goToSlide(n: number): void;
  };
}

interface SlideText {
  paragraphs: string[][];
}

export const pptxRenderer: Renderer = {
  id: 'pptx',
  name: 'Presentation',
  mimes: PPTX_MIMES,
  extensions: ['pptx'],
  async render({ source, container, options }): Promise<PptxHandle> {
    const opts = (options ?? {}) as PptxOptions;
    assertMaxSize(source.blob, opts.maxBytes ?? 128 * 1024 * 1024);

    const JSZip = (await import('jszip')).default;
    const budget = new ByteBudget(opts.maxUncompressed ?? 512 * 1024 * 1024);

    let zip: Awaited<ReturnType<typeof JSZip.loadAsync>>;
    try {
      zip = await JSZip.loadAsync(source.blob);
    } catch (err) {
      throw new MicroscopeError('Failed to open .pptx (invalid archive)', 'RENDER_FAILED', err);
    }

    const slideEntries = Object.entries(zip.files)
      .filter(([name]) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
      .sort(([a], [b]) => slideNum(a) - slideNum(b));

    if (slideEntries.length === 0) {
      throw new MicroscopeError('No slides found in .pptx', 'RENDER_FAILED');
    }

    const slides: SlideText[] = [];
    for (const [path, entry] of slideEntries) {
      assertSafeZipEntry(path);
      const xml = await entry.async('string');
      budget.consume(xml.length);
      slides.push(parseSlideXml(xml));
    }

    const root = createEl('div', {
      style: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#1f2937',
        padding: '24px',
        boxSizing: 'border-box',
      },
    });
    container.appendChild(root);

    const slideEls: HTMLElement[] = [];
    slides.forEach((slide, i) => {
      const card = createEl('section', {
        attrs: { 'data-slide': String(i + 1), 'aria-label': `Slide ${i + 1}` },
        style: {
          backgroundColor: '#fff',
          color: '#1a1a1a',
          aspectRatio: '16 / 9',
          maxWidth: '960px',
          margin: '0 auto 24px',
          padding: '48px',
          borderRadius: '6px',
          boxShadow: '0 4px 16px rgba(0,0,0,.35)',
          fontFamily: 'Calibri, "Segoe UI", system-ui, sans-serif',
          overflow: 'hidden',
          boxSizing: 'border-box',
        },
      });
      const html = slide.paragraphs.map((p) => `<p>${escapeAndJoin(p)}</p>`).join('');
      card.innerHTML = sanitizeHtml(html);
      root.appendChild(card);
      slideEls.push(card);
    });

    return {
      destroy() {
        root.remove();
      },
      capabilities: {
        slideCount: slides.length,
        goToSlide(n: number) {
          slideEls[Math.max(0, Math.min(n - 1, slideEls.length - 1))]?.scrollIntoView({
            behavior: 'smooth',
          });
        },
      },
    };
  },
};

export default pptxRenderer;

function slideNum(path: string): number {
  return Number(/slide(\d+)\.xml$/.exec(path)?.[1] ?? 0);
}

/**
 * Minimal PPTX slide-XML parser — extracts text runs grouped into paragraphs.
 * We deliberately don't try to render shapes/layout: it would explode the
 * package size for marginal viewer benefit. Future renderers can layer on top.
 */
function parseSlideXml(xml: string): SlideText {
  const paragraphs: string[][] = [];
  // <a:p> ... </a:p> blocks
  const pMatches = xml.matchAll(/<a:p[\s>][\s\S]*?<\/a:p>/g);
  for (const pm of pMatches) {
    const runs: string[] = [];
    const tMatches = pm[0].matchAll(/<a:t[^>]*>([\s\S]*?)<\/a:t>/g);
    for (const tm of tMatches) {
      const text = decodeXmlEntities(tm[1] ?? '');
      if (text) runs.push(text);
    }
    paragraphs.push(runs);
  }
  return { paragraphs };
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function escapeAndJoin(runs: string[]): string {
  // We re-escape because runs become HTML; DOMPurify is the final safety net.
  return runs
    .map((r) =>
      r.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    )
    .join(' ');
}
