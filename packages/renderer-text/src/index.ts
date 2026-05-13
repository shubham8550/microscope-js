import type { Renderer } from '@microscope-js/core';
import { assertMaxSize, createEl, readAll } from '@microscope-js/utils';

export interface TextOptions {
  /** Maximum decoded text size to render (default 8 MB). Larger files are refused. */
  maxBytes?: number;
  /** Override encoding detection (default tries BOM, then UTF-8). */
  encoding?: string;
}

const DEFAULT_MAX = 8 * 1024 * 1024;

/** Plain text / source-code renderer. Content is `textContent`, never `innerHTML`. */
export const textRenderer: Renderer = {
  id: 'text',
  name: 'Text',
  mimes: ['text/*', 'application/json', 'application/xml', 'application/x-yaml'],
  extensions: [
    'txt',
    'md',
    'markdown',
    'log',
    'csv',
    'tsv',
    'json',
    'jsonl',
    'xml',
    'yaml',
    'yml',
    'js',
    'mjs',
    'cjs',
    'ts',
    'tsx',
    'jsx',
    'css',
    'scss',
    'html',
    'htm',
    'go',
    'rs',
    'py',
    'rb',
    'java',
    'kt',
    'swift',
    'c',
    'cc',
    'cpp',
    'h',
    'hpp',
    'sh',
    'bash',
    'zsh',
    'ini',
    'toml',
    'env',
  ],
  async render({ source, container, options }) {
    const opts = (options ?? {}) as TextOptions;
    const max = opts.maxBytes ?? DEFAULT_MAX;
    assertMaxSize(source.blob, max);

    const bytes = await readAll(source.blob);
    const text = new TextDecoder(opts.encoding ?? 'utf-8', { fatal: false }).decode(bytes);

    const pre = createEl('pre', {
      style: {
        margin: '0',
        padding: '12px',
        overflow: 'auto',
        height: '100%',
        whiteSpace: 'pre',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
      },
      text,
    });
    container.appendChild(pre);

    return {
      destroy() {
        pre.remove();
      },
    };
  },
};

export default textRenderer;
