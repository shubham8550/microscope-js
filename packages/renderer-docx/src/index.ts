import type { Renderer } from '@microscope-js/core';
import { MicroscopeError, assertMaxSize, createEl, sanitizeHtml } from '@microscope-js/utils';

export interface DocxOptions {
  /** Reject docx files larger than this many bytes (default 64 MB). */
  maxBytes?: number;
  /** Custom style map for mammoth (see mammoth.js docs). */
  styleMap?: string[];
}

const DOCX_MIMES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export const docxRenderer: Renderer = {
  id: 'docx',
  name: 'Word document',
  mimes: DOCX_MIMES,
  extensions: ['docx', 'doc'],
  async render({ source, container, options }) {
    const opts = (options ?? {}) as DocxOptions;
    assertMaxSize(source.blob, opts.maxBytes ?? 64 * 1024 * 1024);

    const mammoth = await import('mammoth');
    const arrayBuffer = await source.blob.arrayBuffer();

    let result: { value: string };
    try {
      result = await mammoth.convertToHtml(
        { arrayBuffer },
        opts.styleMap ? { styleMap: opts.styleMap } : undefined,
      );
    } catch (err) {
      throw new MicroscopeError('Failed to parse DOCX', 'RENDER_FAILED', err);
    }

    const safeHtml = sanitizeHtml(result.value);

    const wrapper = createEl('div', {
      style: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '32px',
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        fontFamily: '"Segoe UI", Calibri, system-ui, sans-serif',
        fontSize: '14px',
        lineHeight: '1.6',
        boxSizing: 'border-box',
      },
    });
    // safeHtml was produced by DOMPurify with our hardened profile — safe to assign.
    wrapper.innerHTML = safeHtml;
    container.appendChild(wrapper);

    return {
      destroy() {
        wrapper.remove();
      },
    };
  },
};

export default docxRenderer;
