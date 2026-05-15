<div align="center">

# 🔬 microscope-js

### **The file viewer for paranoid frontends.**

Render PDF · Word · Excel · PowerPoint · image · video · audio — **entirely in the browser**.
No Microsoft Online Viewer iframe. No Google Docs preview. No "we upload your file to our server first."
The bytes never leave the tab.

<!-- project health -->
[![CI](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/ci.yml)
[![Release](https://github.com/shubham8550/microscope-js/actions/workflows/release.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/release.yml)
[![Pages](https://github.com/shubham8550/microscope-js/actions/workflows/pages.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/pages.yml)
[![CodeQL](https://github.com/shubham8550/microscope-js/actions/workflows/security.yml/badge.svg)](https://github.com/shubham8550/microscope-js/actions/workflows/security.yml)

<!-- npm -->
[![npm](https://img.shields.io/npm/v/@microscope-js/react?label=npm&color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/react)
[![Downloads](https://img.shields.io/npm/dm/@microscope-js/react?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/react)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/react?label=gzip)](https://bundlephobia.com/package/@microscope-js/react)
[![Tree-shakable](https://img.shields.io/badge/tree--shakable-✓-success)](#packages)
[![Types](https://img.shields.io/npm/types/@microscope-js/react?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)
[![Trusted Publisher](https://img.shields.io/badge/npm-trusted%20publisher-success?logo=npm)](https://docs.npmjs.com/trusted-publishers)

<!-- repo -->
[![License](https://img.shields.io/github/license/shubham8550/microscope-js?color=blue)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/shubham8550/microscope-js?style=social)](https://github.com/shubham8550/microscope-js/stargazers)
[![Forks](https://img.shields.io/github/forks/shubham8550/microscope-js?style=social)](https://github.com/shubham8550/microscope-js/network/members)
[![Last commit](https://img.shields.io/github/last-commit/shubham8550/microscope-js)](https://github.com/shubham8550/microscope-js/commits/main)
[![Issues](https://img.shields.io/github/issues/shubham8550/microscope-js)](https://github.com/shubham8550/microscope-js/issues)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

<!-- tech -->
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](./tsconfig.base.json)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Changesets](https://img.shields.io/badge/Changesets-managed-22272e?logo=changesets)](./RELEASING.md)
[![Biome](https://img.shields.io/badge/Biome-formatted-60A5FA?logo=biome&logoColor=white)](./biome.json)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

**[🌐 Live demo](https://shubham8550.github.io/microscope-js)** · **[📚 API docs](https://shubham8550.github.io/microscope-js/docs)** · **[🐛 Issues](https://github.com/shubham8550/microscope-js/issues/new/choose)** · **[💬 Discussions](https://github.com/shubham8550/microscope-js/discussions)**

</div>

---

## ✨ Why people pick microscope-js

- **🔒 Zero data exfiltration.** Documents are parsed in the user's browser. No backend round-trip, no third-party iframe, no telemetry.
- **🪶 Pay for what you use.** Every format lives in its own npm package; tree-shake or dynamic-import only what your app actually needs.
- **⚛️ React & Next.js native.** `'use client'`, drop in `<Viewer />`, done. The hook works with Suspense and the App Router.
- **🧩 Pluggable.** A renderer is 30 lines of TypeScript implementing one interface. Add a new format in an afternoon.
- **🛡️ Hardened by default.** DOMPurify-sanitized HTML, zip-slip & zip-bomb defenses, size caps, no `eval`, no `dangerouslySetInnerHTML` of user content.
- **🔏 Signed releases.** Every npm version ships with SLSA provenance via GitHub OIDC trusted publishing — verifiable build origin, no tokens involved.

## 🎬 Try it now

> **[👉 shubham8550.github.io/microscope-js](https://shubham8550.github.io/microscope-js)**

Drop any of these onto the page — it renders locally:

- 📄 `*.pdf`
- 📝 `*.docx` &nbsp; `*.doc`
- 📊 `*.xlsx` &nbsp; `*.xls` &nbsp; `*.csv` &nbsp; `*.tsv` &nbsp; `*.ods`
- 📽️ `*.pptx`
- 🖼️ `*.png` `*.jpg` `*.gif` `*.webp` `*.svg` `*.avif` `*.bmp`
- 🎞️ `*.mp4` `*.webm` `*.ogg` `*.mov` `*.mkv`
- 🎵 `*.mp3` `*.wav` `*.flac` `*.aac` `*.m4a` `*.opus`
- 💻 `*.txt` `*.md` `*.json` `*.yaml` and every common source-code extension

## 📦 Packages

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

## 🚀 Quick start

### React / Next.js

```bash
pnpm add @microscope-js/react @microscope-js/renderer-pdf @microscope-js/renderer-image
```

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

`<Viewer />` accepts a `File`, `Blob`, `ArrayBuffer`, `Uint8Array`, `URL`, or a `string` URL — anything you have on hand.

### Plain JS / Vue / Svelte / vanilla

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { pdfRenderer } from '@microscope-js/renderer-pdf';

const registry = createRegistry([pdfRenderer]);
const handle = await mount({
  source: fileInput.files[0],
  container: document.getElementById('viewer')!,
  registry,
});
// later...
handle.destroy();
```

### Hook-only (custom UI)

```tsx
const { containerRef, loading, error, handle } = useViewer({ source, registry });
return (
  <div ref={containerRef} className="my-toolbar-frame">
    {handle?.capabilities?.pageCount /* renderer-specific extras */}
  </div>
);
```

## 🆚 How it compares

| Concern                | MS Office iframe          | Google Docs viewer        | docx-preview / etc.       | **microscope-js**                                |
| ---------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------------------------------ |
| File leaves the device | ✅ uploads to Microsoft    | ✅ uploads to Google       | ❌                         | ❌                                                |
| Works offline          | ❌                         | ❌                         | partial                   | ✅                                                |
| Formats covered        | Office only               | Office + PDF              | one per library           | PDF + Office + media + image + code, one API     |
| Bundle cost            | iframe (heavy)            | iframe (heavy)            | one library, monolithic   | ~1–5 KB core + per-format packages, tree-shakable |
| React + Next.js / SSR  | ⚠️ iframe                  | ⚠️ iframe                  | varies                    | ✅ first-class, SSR-safe                          |
| Provenance / signing   | n/a                       | n/a                       | usually unsigned          | ✅ SLSA + npm trusted publisher                   |
| License                | proprietary               | proprietary               | mixed                     | MIT                                              |

## 🏗️ Architecture

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

The `core` package defines exactly one interface (`Renderer`) and one registry. Every format implementation lives in its own npm package and is loaded via dynamic `import()` so first-paint pays only for `core` + `react`.

## 🛡️ Security model

| Threat                          | Mitigation                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| HTML in Office documents        | All renderer output passes through DOMPurify with a hardened allowlist                           |
| Zip-slip (`..` in DOCX/XLSX/PPTX) | Archive entries with parent-dir or absolute paths are rejected before extraction                |
| Zip bombs                       | `ByteBudget` caps total uncompressed bytes (default 512 MB)                                      |
| Oversized PDFs                  | Configurable `maxBytes` / `maxPages` per renderer                                                |
| SVG / XML XSS                   | SVGs are mounted via `<img>` (no script execution); inline SVG is sanitized                      |
| Dynamic JS                      | No `eval`, no `new Function`, no `dangerouslySetInnerHTML` of user content — CI greps for these |
| Supply-chain                    | Every published tarball is signed with SLSA provenance via npm OIDC trusted publishing           |

See **[SECURITY.md](./SECURITY.md)** to report a vulnerability privately.

## 🧪 Development

```bash
pnpm install
pnpm build           # build all packages
pnpm test            # vitest across the monorepo
pnpm typecheck       # tsc --noEmit, per package
pnpm lint            # biome check
pnpm demo            # localhost:3000
pnpm docs            # TypeDoc -> ./docs-site
```

```
microscope-js/
├── packages/
│   ├── core/         # Renderer interface + registry
│   ├── utils/        # source / sniff / sanitize / zip-safety helpers
│   ├── react/        # <Viewer /> + useViewer + useRegistry
│   ├── renderer-pdf/
│   ├── renderer-docx/
│   ├── renderer-xlsx/
│   ├── renderer-pptx/
│   ├── renderer-image/
│   ├── renderer-video/
│   ├── renderer-audio/
│   └── renderer-text/
├── apps/
│   └── demo/         # Next.js → GitHub Pages
└── .github/workflows/  # CI · release · pages · security · dependabot
```

## 🗺️ Roadmap

- [ ] Pixel-perfect PPTX (shape + image layout, not just text)
- [ ] EPUB / FB2 ebook renderer
- [ ] RTF / ODT renderer
- [ ] Optional Web Worker for office formats (offload main-thread parsing)
- [ ] Plugin: in-viewer search across PDF / DOCX
- [ ] Plugin: annotation / highlight overlay
- [ ] Solid / Vue / Svelte adapters

Got an idea? [Open a discussion](https://github.com/shubham8550/microscope-js/discussions).

## 🤝 Contributing

PRs are welcome — see **[CONTRIBUTING.md](./CONTRIBUTING.md)**. Adding a new format is a copy of `packages/renderer-image` with a new `Renderer` object. The registry picks it up automatically.

If this saved you a backend, **a star on [GitHub](https://github.com/shubham8550/microscope-js) goes a long way.** ⭐

## ⭐ Star history

[![Star history chart](https://api.star-history.com/svg?repos=shubham8550/microscope-js&type=Date)](https://star-history.com/#shubham8550/microscope-js&Date)

## 📄 License

[MIT](./LICENSE) © microscope-js contributors

<sub>Built with [pnpm](https://pnpm.io) · [tsup](https://tsup.egoist.dev) · [Changesets](https://github.com/changesets/changesets) · [Biome](https://biomejs.dev) · [Vitest](https://vitest.dev) · [TypeDoc](https://typedoc.org). Published with [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers) + [SLSA provenance](https://slsa.dev/).</sub>
