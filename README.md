<div align="center">

# 🔬 microscope-js

**A 100% client-side, zero-server file viewer for the web.**

Render PDF, DOCX, XLSX, PPTX, images, video, and audio in the browser — no Microsoft/Google viewer iframes, no upload to a backend, no document ever leaves the user's machine.

[![CI](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml)
[![Release](https://github.com/shubham8550/microscope-js/actions/workflows/release.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/release.yml)
[![Pages](https://github.com/shubham8550/microscope-js/actions/workflows/pages.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@microscope-js/react?label=%40microscope-js%2Freact&color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/react)
[![npm downloads](https://img.shields.io/npm/dm/@microscope-js/react?label=downloads&color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@microscope-js/react?label=%40microscope-js%2Freact%20gzip)](https://bundlephobia.com/package/@microscope-js/react)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)
[![OIDC Trusted Publisher](https://img.shields.io/badge/npm-trusted%20publisher-success?logo=npm)](https://docs.npmjs.com/trusted-publishers)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://shubham8550.github.io/microscope-js)
[![Docs](https://img.shields.io/badge/docs-typedoc-purple)](https://shubham8550.github.io/microscope-js/docs)

</div>

---

## Why microscope-js

| Concern             | Other viewers                            | microscope-js                                 |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| Network round-trip  | Uploads file to MS/Google viewer service | Never leaves the browser                      |
| Privacy             | Document seen by third party             | Document seen by user only                    |
| Bundle size         | Monolithic                               | Per-format packages — pay only for what you use |
| Framework lock-in   | jQuery / vendor SDK                      | Plain JS core + thin React adapter            |
| Vulnerabilities     | Mixed                                    | Sandboxed iframes, sanitized HTML, no `eval`  |

## Packages

| Package | Version | Min+gzip | Description |
| ------- | ------- | -------- | ----------- |
| [`@microscope-js/core`](./packages/core)                       | [![npm](https://img.shields.io/npm/v/@microscope-js/core?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/core)                       | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/core?label=)](https://bundlephobia.com/package/@microscope-js/core)                       | Framework-agnostic registry + `mount()` |
| [`@microscope-js/utils`](./packages/utils)                     | [![npm](https://img.shields.io/npm/v/@microscope-js/utils?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/utils)                     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/utils?label=)](https://bundlephobia.com/package/@microscope-js/utils)                     | Source / MIME / sanitize helpers |
| [`@microscope-js/react`](./packages/react)                     | [![npm](https://img.shields.io/npm/v/@microscope-js/react?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/react)                     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/react?label=)](https://bundlephobia.com/package/@microscope-js/react)                     | React / Next.js adapter, `<Viewer />` |
| [`@microscope-js/renderer-pdf`](./packages/renderer-pdf)       | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-pdf?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-pdf)       | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-pdf?label=)](https://bundlephobia.com/package/@microscope-js/renderer-pdf)       | PDF via `pdfjs-dist` |
| [`@microscope-js/renderer-docx`](./packages/renderer-docx)     | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-docx?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-docx)     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-docx?label=)](https://bundlephobia.com/package/@microscope-js/renderer-docx)     | Word `.docx` via `mammoth` + DOMPurify |
| [`@microscope-js/renderer-xlsx`](./packages/renderer-xlsx)     | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-xlsx?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-xlsx)     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-xlsx?label=)](https://bundlephobia.com/package/@microscope-js/renderer-xlsx)     | Excel `.xlsx/.xls/.csv` via SheetJS |
| [`@microscope-js/renderer-pptx`](./packages/renderer-pptx)     | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-pptx?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-pptx)     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-pptx?label=)](https://bundlephobia.com/package/@microscope-js/renderer-pptx)     | PowerPoint `.pptx` via JSZip |
| [`@microscope-js/renderer-image`](./packages/renderer-image)   | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-image?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-image)   | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-image?label=)](https://bundlephobia.com/package/@microscope-js/renderer-image)   | png / jpg / gif / webp / svg / avif / bmp |
| [`@microscope-js/renderer-video`](./packages/renderer-video)   | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-video?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-video)   | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-video?label=)](https://bundlephobia.com/package/@microscope-js/renderer-video)   | mp4 / webm / ogg / mov |
| [`@microscope-js/renderer-audio`](./packages/renderer-audio)   | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-audio?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-audio)   | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-audio?label=)](https://bundlephobia.com/package/@microscope-js/renderer-audio)   | mp3 / wav / flac / ogg / aac |
| [`@microscope-js/renderer-text`](./packages/renderer-text)     | [![npm](https://img.shields.io/npm/v/@microscope-js/renderer-text?color=cb3837&label=)](https://www.npmjs.com/package/@microscope-js/renderer-text)     | [![size](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-text?label=)](https://bundlephobia.com/package/@microscope-js/renderer-text)     | Plain text / source code |

## Quick start (React / Next.js)

```bash
pnpm add @microscope-js/react @microscope-js/renderer-pdf @microscope-js/renderer-image
```

```tsx
'use client';
import { Viewer, useRegistry } from '@microscope-js/react';
import { pdfRenderer } from '@microscope-js/renderer-pdf';
import { imageRenderer } from '@microscope-js/renderer-image';

export default function Page({ file }: { file: File }) {
  const registry = useRegistry([pdfRenderer, imageRenderer]);
  return <Viewer source={file} registry={registry} style={{ height: 600 }} />;
}
```

## Quick start (plain JS)

```js
import { createRegistry, mount } from '@microscope-js/core';
import { pdfRenderer } from '@microscope-js/renderer-pdf';

const registry = createRegistry([pdfRenderer]);
const handle = await mount({
  source: fileInput.files[0],
  container: document.getElementById('viewer'),
  registry,
});
// later
handle.destroy();
```

## Architecture

```
                ┌─────────────────────────────────┐
                │   @microscope-js/core           │
                │   Renderer interface + registry │
                └──────────────┬──────────────────┘
                               │
       ┌───────────────────────┼──────────────────────────┐
       │                       │                          │
┌──────▼──────┐        ┌───────▼────────┐         ┌───────▼─────────┐
│ renderer-pdf│   ...  │ renderer-image │   ...   │ renderer-docx   │
└─────────────┘        └────────────────┘         └─────────────────┘
       │                       │                          │
       └───────────────────────┼──────────────────────────┘
                               │
                ┌──────────────▼──────────────────┐
                │   @microscope-js/react          │
                │   <Viewer />, useViewer()       │
                └─────────────────────────────────┘
```

Every renderer ships its own package. Tree-shaking + per-format dynamic imports keep the bundle minimal.

## Repository layout

```
microscope-js/
├── packages/
│   ├── core/                 # framework-agnostic registry + types
│   ├── utils/                # shared sniffing / source helpers
│   ├── react/                # React + Next.js adapter
│   ├── renderer-pdf/
│   ├── renderer-image/
│   ├── renderer-video/
│   ├── renderer-audio/
│   ├── renderer-docx/
│   ├── renderer-xlsx/
│   ├── renderer-pptx/
│   └── renderer-text/
├── apps/
│   ├── demo/                 # Next.js demo → GitHub Pages
│   └── docs/                 # TypeDoc output landing
├── .github/workflows/        # CI + release + pages
└── .changeset/
```

## Development

```bash
pnpm install
pnpm build           # build all libs
pnpm test            # vitest across all packages
pnpm typecheck       # tsc -b
pnpm lint            # biome
pnpm demo            # run demo on localhost:3000
pnpm docs            # generate typedoc to ./docs-site
```

## Security

- All HTML produced by office renderers is run through DOMPurify with a hardened allowlist.
- PPTX/DOCX archives are scanned for path-traversal entries (`..`, absolute paths) before extraction.
- No renderer uses `eval`, `Function(...)`, `innerHTML` of unsanitized input, or `dangerouslySetInnerHTML` of user content.
- See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.

## Contributing

PRs welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md). Adding a new format is a copy-paste-modify of an existing renderer package.

## License

MIT © microscope-js contributors
