import type { RenderHandle, Renderer } from '@microscope-js/core';
import {
  MicroscopeError,
  assertMaxSize,
  createEl,
  readAll,
  sanitizeHtml,
} from '@microscope-js/utils';

export interface XlsxOptions {
  /** Reject workbooks larger than this many bytes (default 64 MB). */
  maxBytes?: number;
  /** Initial sheet index to display (default 0). */
  initialSheet?: number;
}

const XLSX_MIMES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
  'text/tab-separated-values',
];

export interface XlsxHandle extends RenderHandle {
  readonly capabilities: {
    sheetNames: string[];
    showSheet(name: string): void;
  };
}

export const xlsxRenderer: Renderer = {
  id: 'xlsx',
  name: 'Spreadsheet',
  mimes: XLSX_MIMES,
  extensions: ['xlsx', 'xls', 'xlsm', 'xlsb', 'csv', 'tsv', 'ods'],
  async render({ source, container, options }): Promise<XlsxHandle> {
    const opts = (options ?? {}) as XlsxOptions;
    assertMaxSize(source.blob, opts.maxBytes ?? 64 * 1024 * 1024);

    const XLSX = await import('xlsx');
    const buffer = await readAll(source.blob);

    let wb: ReturnType<typeof XLSX.read>;
    try {
      wb = XLSX.read(buffer, { type: 'array', cellHTML: true, cellFormula: false });
    } catch (err) {
      throw new MicroscopeError('Failed to parse spreadsheet', 'RENDER_FAILED', err);
    }

    const root = createEl('div', {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
      },
    });
    const tabs = createEl('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        padding: '6px 8px',
        backgroundColor: '#f3f4f6',
        borderBottom: '1px solid #e5e7eb',
        flexShrink: '0',
      },
    });
    const body = createEl('div', { style: { flex: '1', overflow: 'auto' } });
    root.append(tabs, body);
    container.appendChild(root);

    const showSheet = (name: string): void => {
      const ws = wb.Sheets[name];
      if (!ws) return;
      const dirty = XLSX.utils.sheet_to_html(ws, { editable: false });
      body.innerHTML = sanitizeHtml(dirty);
      const table = body.querySelector('table');
      if (table) {
        table.style.borderCollapse = 'collapse';
        table.style.width = 'max-content';
        for (const td of table.querySelectorAll('td, th')) {
          (td as HTMLElement).style.border = '1px solid #e5e7eb';
          (td as HTMLElement).style.padding = '4px 8px';
          (td as HTMLElement).style.whiteSpace = 'nowrap';
        }
      }
      for (const btn of tabs.querySelectorAll('button[data-sheet]')) {
        const active = (btn as HTMLButtonElement).dataset.sheet === name;
        (btn as HTMLButtonElement).style.fontWeight = active ? '600' : '400';
        (btn as HTMLButtonElement).style.backgroundColor = active ? '#fff' : 'transparent';
      }
    };

    wb.SheetNames.forEach((name, i) => {
      const btn = createEl('button', {
        attrs: { type: 'button', 'data-sheet': name },
        style: {
          padding: '4px 10px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '12px',
        },
        text: name,
      });
      btn.addEventListener('click', () => showSheet(name));
      tabs.appendChild(btn);
      if (i === (opts.initialSheet ?? 0)) showSheet(name);
    });

    return {
      destroy() {
        root.remove();
      },
      capabilities: { sheetNames: wb.SheetNames, showSheet },
    };
  },
};

export default xlsxRenderer;
