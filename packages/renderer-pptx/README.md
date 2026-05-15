# @microscope-js/renderer-pptx

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-pptx?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-pptx)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-pptx?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-pptx)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-pptx?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> PowerPoint `.pptx` renderer for [microscope-js](https://github.com/shubham8550/microscope-js). Reads the OOXML archive with [JSZip](https://stuk.github.io/jszip/), extracts the text runs from each `slide*.xml`, and renders them as paginated slides. **Lightweight text view** — no full OOXML layout engine.

## Install

```bash
pnpm add @microscope-js/renderer-pptx
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { pptxRenderer } from '@microscope-js/renderer-pptx';

const registry = createRegistry([pptxRenderer]);
const handle = await mount({ source: file, container, registry });

const cap = handle.capabilities as { slideCount: number; goToSlide(n: number): void };
console.log(cap.slideCount);
cap.goToSlide(3);
```

## Options

| Option              | Default               | Description                                                       |
| ------------------- | --------------------- | ----------------------------------------------------------------- |
| `maxBytes`          | `128 * 1024 * 1024`   | Reject .pptx files larger than this                               |
| `maxUncompressed`   | `512 * 1024 * 1024`   | Total uncompressed cap — zip-bomb defense                         |

## Capabilities exposed on the `RenderHandle`

```ts
interface PptxHandle extends RenderHandle {
  readonly capabilities: {
    slideCount: number;
    goToSlide(n: number): void;
  };
}
```

## Why "text view, not pixel-perfect"

Rendering OOXML pixel-perfect requires a complete shape + layout + font + image engine — usually ~2 MB of code and a long maintenance tail. This package goes the other way: it keeps the bundle tiny, leans on the browser for typography, and surfaces the **content** users actually want to read. If you need exact visual fidelity, pair this with a server-side preview pipeline (LibreOffice, OnlyOffice, etc.) for that one workflow.

Pixel-perfect rendering is on the [roadmap](https://github.com/shubham8550/microscope-js#%EF%B8%8F-roadmap) as an opt-in package.

## Security model

- Every archive entry path is run through `assertSafeZipEntry()` before extraction — `..` segments and absolute paths are rejected (CWE-22, zip-slip).
- `ByteBudget` caps total uncompressed bytes — defends against zip bombs (a 1 KB zip that expands to 4 GB).
- Slide HTML is passed through `sanitizeHtml` before being inserted.
- All rendering is in-browser. The deck never leaves the tab.

## See also

- [`@microscope-js/renderer-docx`](https://www.npmjs.com/package/@microscope-js/renderer-docx) · [`@microscope-js/renderer-xlsx`](https://www.npmjs.com/package/@microscope-js/renderer-xlsx)
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
