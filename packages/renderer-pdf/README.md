# @microscope-js/renderer-pdf

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-pdf?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-pdf)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-pdf?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-pdf)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-pdf?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> PDF renderer for [microscope-js](https://github.com/shubham8550/microscope-js), powered by [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist) v5. All parsing + canvas painting happens inside a Web Worker — the main thread stays responsive.

## Install

```bash
pnpm add @microscope-js/renderer-pdf
```

`pdfjs-dist` is a real dependency (not a peer) so consumers get a deduplicated copy.

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { pdfRenderer } from '@microscope-js/renderer-pdf';

const registry = createRegistry([pdfRenderer]);
const handle = await mount({ source: file, container, registry });

// renderer-specific capabilities
const cap = handle.capabilities as { pageCount: number; scrollToPage(n: number): void };
console.log(cap.pageCount);
cap.scrollToPage(42);
```

## Options

Pass via `mount({ options: { … } })` or `<Viewer options={{ … }} />`.

| Option       | Default              | Description                                            |
| ------------ | -------------------- | ------------------------------------------------------ |
| `maxBytes`   | `256 * 1024 * 1024`  | Reject PDFs larger than this (`MicroscopeError('TOO_LARGE')`) |
| `maxPages`   | `5000`               | Cap pages rendered — defends against PDF bombs        |
| `scale`      | `1.25`               | Canvas render scale (also DPR-aware for crisp text)   |
| `workerSrc`  | bundled              | Override `pdf.worker.mjs` URL (e.g. self-host on CDN)  |

## Capabilities exposed on the `RenderHandle`

```ts
interface PdfHandle extends RenderHandle {
  readonly capabilities: {
    pageCount: number;
    scrollToPage(n: number): void;
  };
}
```

## Security model

- pdfjs v5 disables runtime JS evaluation by default — no `eval`-style path is ever taken.
- `disableAutoFetch: true` — never re-fetches over the network during render.
- All rendering happens in the user's browser. **The PDF byte stream never leaves the tab.**
- The worker is sandboxed to its own thread; a malformed PDF can't read the main page's DOM or globals.
- `maxBytes` / `maxPages` defaults defend against pathological inputs ("PDF bombs").

## Bundle notes

The pdfjs worker is loaded via `new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url)`. Webpack 5, Vite, and Next.js handle that asset-module pattern out of the box. If you ship behind a CDN, pass `options.workerSrc` to point at your own hosted copy.

## See also

- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — `<Viewer />` for React / Next.js
- [`@microscope-js/core`](https://www.npmjs.com/package/@microscope-js/core) — the registry that picks this renderer
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
