# @microscope-js/react

[![npm](https://img.shields.io/npm/v/@microscope-js/react?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/react)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/react?label=gzip)](https://bundlephobia.com/package/@microscope-js/react)
[![Types](https://img.shields.io/npm/types/@microscope-js/react?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> React + Next.js adapter for [microscope-js](https://github.com/shubham8550/microscope-js). One `<Viewer />` component, one `useViewer()` hook for fully custom UIs, one `useRegistry()` helper. SSR-safe — works inside the Next.js App Router with `'use client'`.

## Install

```bash
pnpm add @microscope-js/react @microscope-js/core
# plus whichever format renderers you actually need
pnpm add @microscope-js/renderer-pdf @microscope-js/renderer-image
```

Peer deps: `react >= 18`, `react-dom >= 18`.

## Use — drop-in component

```tsx
'use client';
import { Viewer, useRegistry } from '@microscope-js/react';
import { pdfRenderer } from '@microscope-js/renderer-pdf';
import { imageRenderer } from '@microscope-js/renderer-image';

export default function FilePreview({ file }: { file: File }) {
  const registry = useRegistry([pdfRenderer, imageRenderer]);
  return (
    <Viewer
      source={file}
      registry={registry}
      style={{ height: 600 }}
      loadingFallback={<Spinner />}
      errorFallback={(err) => <Alert>{err.message}</Alert>}
      emptyFallback={<DropHint />}
    />
  );
}
```

`source` accepts a `File`, `Blob`, `ArrayBuffer`, `Uint8Array`, `URL`, or `string` URL.

## Use — hook (custom UI)

When you want full control over the toolbar / chrome around the viewer:

```tsx
'use client';
import { useViewer, useRegistry } from '@microscope-js/react';
import { pdfRenderer } from '@microscope-js/renderer-pdf';

export function MyPdfViewer({ file }: { file: File }) {
  const registry = useRegistry([pdfRenderer]);
  const { containerRef, loading, error, handle } = useViewer({ source: file, registry });

  const pageCount = handle?.capabilities?.pageCount as number | undefined;

  return (
    <div className="my-frame">
      {loading && <Spinner />}
      {error && <Alert>{error.message}</Alert>}
      {pageCount && <span>{pageCount} pages</span>}
      <div ref={containerRef} className="my-canvas" />
    </div>
  );
}
```

## `<Viewer />` props

| Prop              | Type                              | Description |
| ----------------- | --------------------------------- | ----------- |
| `source`          | `Source \| null \| undefined`     | What to render. `null` shows the `emptyFallback`. |
| `registry`        | `Registry`                        | From `useRegistry([...])` or `createRegistry([...])`. |
| `rendererId?`     | `string`                          | Force-pick a renderer by id (skips matching). |
| `options?`        | `Record<string, unknown>`         | Forwarded to the matched renderer. |
| `className?`      | `string`                          | Container class. |
| `style?`          | `CSSProperties`                   | Container inline style. Default is a 16:9 box with a subtle border. |
| `loadingFallback?` | `ReactNode`                      | Shown while a render is in flight. |
| `errorFallback?`  | `(err) => ReactNode`              | Render prop for errors. |
| `emptyFallback?`  | `ReactNode`                       | Shown when `source` is nullish. |

## SSR / Next.js

The adapter is SSR-safe — on the server it returns the wrapper div and nothing else. The format-specific renderer is only loaded inside `useEffect`. You can use it in two ways:

- Mark the parent file with `'use client'` (recommended — keeps it simple)
- Or `import dynamic from 'next/dynamic'` and load with `{ ssr: false }`

`pdfjs-dist`, `mammoth`, `xlsx`, and `jszip` are loaded via `import()` so they never end up in the SSR bundle.

## Lifecycle guarantees

`useViewer` cancels the previous in-flight render and tears down the previous `handle` whenever `source`, `registry`, `rendererId`, or `options` change. Swapping files is safe and leak-free; object URLs are revoked on teardown.

## See also

- [`@microscope-js/core`](https://www.npmjs.com/package/@microscope-js/core) — the framework-agnostic foundation
- [Format renderers](https://github.com/shubham8550/microscope-js#-packages) — pick the ones you need
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
