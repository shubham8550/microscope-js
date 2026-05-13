<div align="center">

# 🔬 microscope-js

**A 100% client-side, zero-server file viewer for the web.**

Render PDF, DOCX, XLSX, PPTX, images, video, and audio in the browser — no Microsoft/Google viewer iframes, no upload to a backend, no document ever leaves the user's machine.

[![CI](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
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

## Supported formats

| Format            | Package                              | Engine                |
| ----------------- | ------------------------------------ | --------------------- |
| PDF               | `@microscope-js/renderer-pdf`        | `pdfjs-dist`          |
| DOCX              | `@microscope-js/renderer-docx`       | `mammoth` + DOMPurify |
| XLSX / XLS / CSV  | `@microscope-js/renderer-xlsx`       | `xlsx`                |
| PPTX              | `@microscope-js/renderer-pptx`       | JSZip + canvas        |
| Image (png/jpg/gif/webp/svg/avif) | `@microscope-js/renderer-image` | native `<img>`        |
| Video (mp4/webm/ogg) | `@microscope-js/renderer-video`   | native `<video>`      |
| Audio (mp3/wav/ogg/flac) | `@microscope-js/renderer-audio` | native `<audio>`     |
| Plain text / code | `@microscope-js/renderer-text`       | DOMPurify             |

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
