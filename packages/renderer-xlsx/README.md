# @microscope-js/renderer-xlsx

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-xlsx?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-xlsx)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-xlsx?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-xlsx)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-xlsx?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Spreadsheet renderer for [microscope-js](https://github.com/shubham8550/microscope-js), backed by [SheetJS](https://sheetjs.com/). Renders `.xlsx`, `.xls`, `.xlsm`, `.xlsb`, `.csv`, `.tsv`, and `.ods`. Multi-sheet workbooks get a tab strip; HTML output is sanitized via the shared DOMPurify profile; **formulas are never evaluated**.

## Install

```bash
pnpm add @microscope-js/renderer-xlsx
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { xlsxRenderer } from '@microscope-js/renderer-xlsx';

const registry = createRegistry([xlsxRenderer]);
const handle = await mount({ source: file, container, registry });

// renderer-specific capabilities
const cap = handle.capabilities as { sheetNames: string[]; showSheet(name: string): void };
console.log(cap.sheetNames);
cap.showSheet('Q4 Revenue');
```

## Options

| Option         | Default            | Description                                                                |
| -------------- | ------------------ | -------------------------------------------------------------------------- |
| `maxBytes`     | `64 * 1024 * 1024` | Reject workbooks larger than this (`MicroscopeError('TOO_LARGE')`)         |
| `initialSheet` | `0`                | Index of the sheet shown on first render                                   |

## Capabilities exposed on the `RenderHandle`

```ts
interface XlsxHandle extends RenderHandle {
  readonly capabilities: {
    sheetNames: string[];
    showSheet(name: string): void;
  };
}
```

Wire a custom dropdown to `showSheet()` for a polished UX.

## Format support

- `.xlsx` / `.xlsm` / `.xlsb` (Office Open XML)
- `.xls` (legacy binary)
- `.ods` (OpenDocument)
- `.csv` / `.tsv` (delimited text)

## Security model

- SheetJS is called with `cellFormula: false` — **formulas are dropped, not evaluated.** No untrusted spreadsheet expression ever runs.
- The HTML SheetJS produces is run through `sanitizeHtml` from `@microscope-js/utils` before insertion.
- The size cap defends against zip-bomb-class inputs.
- All rendering is in-browser. The workbook never leaves the tab.

## See also

- [`@microscope-js/renderer-docx`](https://www.npmjs.com/package/@microscope-js/renderer-docx) · [`@microscope-js/renderer-pptx`](https://www.npmjs.com/package/@microscope-js/renderer-pptx)
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
