# @microscope-js/renderer-text

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-text?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-text)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-text?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-text)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-text?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Plain-text / source-code renderer for [microscope-js](https://github.com/shubham8550/microscope-js). Content is set with `textContent`, **never `innerHTML`** — XSS-safe by construction. Recognizes every common source-code extension out of the box.

## Install

```bash
pnpm add @microscope-js/renderer-text
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { textRenderer } from '@microscope-js/renderer-text';

const registry = createRegistry([textRenderer]);
await mount({
  source: file,
  container,
  registry,
  options: { maxBytes: 4 * 1024 * 1024, encoding: 'utf-8' },
});
```

## Options

| Option      | Default                | Description                                                              |
| ----------- | ---------------------- | ------------------------------------------------------------------------ |
| `maxBytes`  | `8 * 1024 * 1024`      | Reject files larger than this (`MicroscopeError('TOO_LARGE')`)           |
| `encoding`  | `'utf-8'`              | Override `TextDecoder` encoding — accepts any IANA name your runtime supports |

## Format support

Plain text (`text/*`) plus JSON, XML, YAML, and most source-code extensions:

```
txt md markdown log csv tsv json jsonl xml yaml yml
js mjs cjs ts tsx jsx css scss html htm
go rs py rb java kt swift c cc cpp h hpp
sh bash zsh ini toml env
```

Don't see your extension? Pass `rendererId: 'text'` to `mount()` / `<Viewer />` to force-pick this renderer.

## Security model

- The decoded text is assigned via `element.textContent` — **HTML in the source is never parsed**. No DOMPurify needed because no HTML exists in the first place.
- Files over `maxBytes` are rejected before decoding to prevent OOM.
- `TextDecoder` is constructed with `fatal: false` so a malformed sequence shows replacement characters instead of throwing.

## See also

- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
