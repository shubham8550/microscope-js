import type { RenderContext, Renderer, RenderHandle } from '@microscope-js/core';
import { assertMaxSize, createEl, MicroscopeError, readAll } from '@microscope-js/utils';

export interface PdfOptions {
  /** Reject PDFs larger than this many bytes (default 256 MB). */
  maxBytes?: number;
  /** Cap number of pages rendered (default 5 000). Protects against PDF bombs. */
  maxPages?: number;
  /** Render scale (default 1.25 for crisp text). */
  scale?: number;
  /** URL to the pdf.worker.mjs file. Falls back to `pdfjs-dist`'s bundled worker. */
  workerSrc?: string;
}

const DEFAULTS: Required<Omit<PdfOptions, 'workerSrc'>> = {
  maxBytes: 256 * 1024 * 1024,
  maxPages: 5000,
  scale: 1.25,
};

export interface PdfHandle extends RenderHandle {
  readonly capabilities: {
    pageCount: number;
    scrollToPage(n: number): void;
  };
}

export const pdfRenderer: Renderer = {
  id: 'pdf',
  name: 'PDF',
  mimes: ['application/pdf', 'application/x-pdf'],
  extensions: ['pdf'],
  render: renderPdf,
};

export default pdfRenderer;

async function renderPdf(ctx: RenderContext): Promise<PdfHandle> {
  const opts = { ...DEFAULTS, ...((ctx.options ?? {}) as PdfOptions) };
  assertMaxSize(ctx.source.blob, opts.maxBytes);
  if (ctx.signal?.aborted) throw new MicroscopeError('aborted', 'ABORTED');

  // Dynamic import — keeps pdf.js out of the consumer's main bundle until needed.
  const pdfjs = await import('pdfjs-dist');
  if (opts.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = opts.workerSrc;
  } else if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    // pdfjs-dist ships an ESM worker; consumers can override via `workerSrc`.
    const workerUrl = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url);
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.toString();
  }

  const data = await readAll(ctx.source.blob);
  // pdfjs v5 dropped the `isEvalSupported` option (eval is disabled by default).
  // disableAutoFetch is also no longer a public field in v5's types, but it still
  // works at runtime, so we cast to keep the safety hardening.
  const loadingTask = pdfjs.getDocument({
    data,
    disableAutoFetch: true,
  } as Parameters<typeof pdfjs.getDocument>[0]);
  ctx.signal?.addEventListener('abort', () => loadingTask.destroy(), { once: true });

  const doc = await loadingTask.promise;
  const pageCount = Math.min(doc.numPages, opts.maxPages);

  const root = createEl('div', {
    style: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#525659',
      padding: '16px 0',
      boxSizing: 'border-box',
    },
  });
  ctx.container.appendChild(root);

  const canvases: HTMLCanvasElement[] = [];
  const tasks: Array<Promise<void>> = [];

  for (let i = 1; i <= pageCount; i++) {
    const canvas = createEl('canvas', {
      style: { display: 'block', margin: '0 auto 12px', boxShadow: '0 2px 8px rgba(0,0,0,.4)' },
    });
    root.appendChild(canvas);
    canvases.push(canvas);
    tasks.push(renderOnePage(doc, i, canvas, opts.scale, ctx.signal));
  }

  await Promise.all(tasks).catch((err) => {
    if ((err as Error).name === 'AbortError') return;
    throw new MicroscopeError('PDF render failed', 'RENDER_FAILED', err);
  });

  return {
    destroy() {
      doc.destroy();
      root.remove();
    },
    capabilities: {
      pageCount,
      scrollToPage(n: number) {
        canvases[Math.max(0, Math.min(n - 1, canvases.length - 1))]?.scrollIntoView({
          behavior: 'smooth',
        });
      },
    },
  };
}

async function renderOnePage(
  doc: { getPage: (n: number) => Promise<unknown> },
  pageNum: number,
  canvas: HTMLCanvasElement,
  scale: number,
  signal: AbortSignal | undefined,
): Promise<void> {
  // biome-ignore lint/suspicious/noExplicitAny: pdfjs types vary across versions
  const page: any = await doc.getPage(pageNum);
  if (signal?.aborted) return;

  const viewport = page.getViewport({ scale });
  const ctx2d = canvas.getContext('2d');
  if (!ctx2d) return;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  canvas.style.width = `${viewport.width / (window.devicePixelRatio || 1)}px`;
  canvas.style.height = `${viewport.height / (window.devicePixelRatio || 1)}px`;

  const task = page.render({ canvasContext: ctx2d, viewport });
  signal?.addEventListener('abort', () => task.cancel?.(), { once: true });
  await task.promise;
}
