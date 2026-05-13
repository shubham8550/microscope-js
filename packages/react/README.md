# @microscope-js/react

React + Next.js adapter. Exposes a `<Viewer />` component, a `useViewer()` hook for fully custom UIs, and a `useRegistry()` helper.

```tsx
'use client';
import { Viewer, useRegistry } from '@microscope-js/react';
import { pdfRenderer } from '@microscope-js/renderer-pdf';
import { imageRenderer } from '@microscope-js/renderer-image';

export default function FilePreview({ file }: { file: File }) {
  const registry = useRegistry([pdfRenderer, imageRenderer]);
  return <Viewer source={file} registry={registry} style={{ height: 600 }} />;
}
```

## SSR / Next.js

The adapter is SSR-safe — it renders only an empty container on the server and never touches `window`, `document`, or `pdfjs-dist` until `useEffect` fires. Use it inside a Client Component (`'use client'`) or wrap with `dynamic(... , { ssr: false })` if you prefer.

## Hook-only usage

```tsx
const { containerRef, loading, error } = useViewer({ source, registry });
return <div ref={containerRef} className="my-custom-frame" />;
```

## Lifecycle

`useViewer` cancels and tears down the previous render whenever `source`, `registry`, `rendererId`, or `options` change — so swapping files is safe and leak-free.
