# @microscope-js/core

[![npm](https://img.shields.io/npm/v/@microscope-js/core?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/core)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/core?label=gzip)](https://bundlephobia.com/package/@microscope-js/core)
[![Types](https://img.shields.io/npm/types/@microscope-js/core?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> **The framework-agnostic heart of [microscope-js](https://github.com/shubham8550/microscope-js).** One `Renderer` interface, one `Registry`, one `mount()`. Everything else is a plugin.

## Install

```bash
pnpm add @microscope-js/core @microscope-js/renderer-pdf
```

You almost never use `core` alone — pair it with one or more `@microscope-js/renderer-*` packages.

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { pdfRenderer } from '@microscope-js/renderer-pdf';
import { imageRenderer } from '@microscope-js/renderer-image';

const registry = createRegistry([pdfRenderer, imageRenderer]);

const handle = await mount({
  source: fileInput.files[0],            // File | Blob | ArrayBuffer | Uint8Array | URL | string
  container: document.getElementById('viewer')!,
  registry,
});

// later, when navigating away
handle.destroy();
```

`mount()` normalizes the source, sniffs the MIME type if needed, picks the highest-priority renderer that claims it, clears the container, and renders.

## API

### `createRegistry(renderers)`

Build a `Registry` from a list of `Renderer`s. Later entries win by default; pass `{ renderer, priority }` to override.

### `composeRegistries(...registries)`

Merge multiple registries — useful when an app layers custom renderers on top of defaults without losing tree-shakability.

### `mount(opts): Promise<RenderHandle>`

| Option        | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `source`      | `Source`                          | What to render — `File`, `Blob`, `ArrayBuffer`, `Uint8Array`, `URL`, or `string` URL |
| `container`   | `HTMLElement`                     | DOM node to mount into. Cleared before render. |
| `registry`    | `Registry`                        | Where to look up the renderer |
| `options?`    | `Record<string, unknown>`         | Per-render options, forwarded to the matched renderer |
| `signal?`     | `AbortSignal`                     | Cancels in-flight rendering |
| `rendererId?` | `string`                          | Force-pick a renderer by id (skips matching) |
| `t?`          | `(key, fallback) => string`       | Translation hook for user-facing strings |

Returns a `RenderHandle` with a required `destroy()` and optional renderer-specific `capabilities` (e.g. `pageCount` / `scrollToPage` from PDF, `sheetNames` / `showSheet` from XLSX).

## Define your own renderer

```ts
import type { Renderer } from '@microscope-js/core';

export const myRenderer: Renderer = {
  id: 'myformat',
  name: 'My format',
  mimes: ['application/x-myformat'],
  extensions: ['myf'],
  async render({ source, container, signal }) {
    // …draw `source.blob` into `container`, honor `signal` for cancellation
    return {
      destroy() { /* clean up */ },
    };
  },
};
```

Renderers are plain values — no class instantiation, no global state. The registry handles matching by MIME + extension, with an optional `canRender()` override for byte-sniffing.

## Re-exports

For convenience the core barrel also exports `MicroscopeError`, `Source`, `NormalizedSource`, `normalizeSource`, `sniffMime`, and `extOf` from `@microscope-js/utils` — so simple consumers don't need a second install.

## See also

- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — `<Viewer />` and `useViewer()` for React / Next.js
- [`@microscope-js/utils`](https://www.npmjs.com/package/@microscope-js/utils) — shared low-level helpers
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
