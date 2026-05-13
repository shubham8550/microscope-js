# Contributing to microscope-js

Thanks for your interest! This project is fully open-source and welcomes contributions of all sizes.

## Getting started

```bash
git clone https://github.com/shubham8550/microscope-js
cd microscope-js
pnpm install
pnpm build
pnpm test
```

## Repository philosophy

- **One package per concern.** Every format lives in its own `@microscope-js/renderer-*` package.
- **Zero duplication.** Shared logic belongs in `@microscope-js/utils`. If two renderers need the same helper, extract it there.
- **No service calls.** Renderers must work on `file://` and offline. Reject any change that introduces a network dependency for rendering.
- **No `eval` / `new Function` / unsanitized `innerHTML`.** Office formats must run output through DOMPurify.
- **TypeScript everywhere**, strict mode, no `any` without `// biome-ignore` justification.

## Adding a new format

1. Copy `packages/renderer-image` as a template.
2. Rename references (`@microscope-js/renderer-image` → `@microscope-js/renderer-yourformat`).
3. Implement the [`Renderer`](./packages/core/src/types.ts) interface.
4. Register MIME types and file extensions in the renderer's metadata.
5. Add a story in `apps/demo`.
6. Run `pnpm changeset` and pick the affected packages.

## Commit / PR

- Conventional commits (`feat: …`, `fix: …`, `chore: …`).
- One logical change per PR.
- Every behavioural change ships with a Changeset (`pnpm changeset`).

## Running the demo locally

```bash
pnpm demo            # http://localhost:3000
```

## Releasing

Maintainers only — the `release` workflow on `main` consumes pending changesets and publishes to npm.
