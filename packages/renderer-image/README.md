# @microscope-js/renderer-image

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-image?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-image)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-image?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-image)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-image?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Image renderer for [microscope-js](https://github.com/shubham8550/microscope-js). Uses the browser's native `<img>` element — sub-kilobyte runtime, every codec your browser already ships.

## Install

```bash
pnpm add @microscope-js/renderer-image
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { imageRenderer } from '@microscope-js/renderer-image';

const registry = createRegistry([imageRenderer]);
await mount({ source: file, container, registry });
```

## Format support

| Extension                           | MIME                  |
| ----------------------------------- | --------------------- |
| `.png`                              | `image/png`           |
| `.jpg` / `.jpeg`                    | `image/jpeg`          |
| `.gif`                              | `image/gif`           |
| `.webp`                             | `image/webp`          |
| `.svg`                              | `image/svg+xml`       |
| `.avif`                             | `image/avif`          |
| `.bmp`                              | `image/bmp`           |
| `.ico`                              | `image/vnd.microsoft.icon` |

Browser-native decoding — if your target browsers support a format, this renderer supports it.

## Security model

- SVGs are mounted via `<img src="blob:…">`, **not** inline. Inline `<svg>` would let arbitrary `<script>` and event handlers run; `<img>`-loaded SVGs are sandboxed by the browser and cannot execute scripts or fetch external resources.
- Object URLs created for the source are revoked on `destroy()`.
- No HTML is built from the source — no DOMPurify needed.

## See also

- [`@microscope-js/renderer-video`](https://www.npmjs.com/package/@microscope-js/renderer-video) · [`@microscope-js/renderer-audio`](https://www.npmjs.com/package/@microscope-js/renderer-audio) — sibling native-element renderers
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
