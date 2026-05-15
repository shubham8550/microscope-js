# @microscope-js/renderer-docx

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-docx?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-docx)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-docx?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-docx)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-docx?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Renders `.docx` (Word) documents in the browser for [microscope-js](https://github.com/shubham8550/microscope-js), via [mammoth.js](https://github.com/mwilliamson/mammoth.js). The HTML mammoth produces is run through a hardened **DOMPurify** profile before it ever touches the DOM.

## Install

```bash
pnpm add @microscope-js/renderer-docx
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { docxRenderer } from '@microscope-js/renderer-docx';

const registry = createRegistry([docxRenderer]);
await mount({ source: file, container, registry });
```

Or with React:

```tsx
<Viewer
  source={file}
  registry={useRegistry([docxRenderer])}
  options={{ maxBytes: 32 * 1024 * 1024 }}
/>
```

## Options

| Option      | Default            | Description                                                                |
| ----------- | ------------------ | -------------------------------------------------------------------------- |
| `maxBytes`  | `64 * 1024 * 1024` | Reject docx files larger than this (`MicroscopeError('TOO_LARGE')`)        |
| `styleMap`  | mammoth defaults   | Custom [style map](https://github.com/mwilliamson/mammoth.js#writing-style-maps) — map Word styles to HTML elements |

## Format support

- `.docx` (Word 2007+) — primary target, well supported by mammoth
- `.doc` (legacy binary) — best-effort; mammoth has limited coverage of the older format

## Security model

- Every HTML node mammoth emits is sanitized via the shared DOMPurify profile from `@microscope-js/utils` — `script`, `iframe`, `form`, every `on*` attribute, `data:` URIs (except safe image types), and unknown protocols are stripped.
- All anchors are rewritten to `rel="noopener noreferrer"` + `target="_blank"`.
- The size cap defends against zip-bomb-class inputs.
- mammoth + this renderer run **only in the user's browser**. The document never leaves the tab.

## See also

- [`@microscope-js/renderer-xlsx`](https://www.npmjs.com/package/@microscope-js/renderer-xlsx) · [`@microscope-js/renderer-pptx`](https://www.npmjs.com/package/@microscope-js/renderer-pptx) — the other Office formats
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
