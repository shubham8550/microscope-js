# @microscope-js/renderer-docx

## 0.1.5

### Patch Changes

- 196bd23: Polish every package's README on a consistent template: npm/size/types/provenance badges, install + use snippets, options table, capabilities reference (for renderers that expose them), explicit security model, cross-links to siblings + repo / demo / docs. The npm package pages should now look professional out of the box.
- Updated dependencies [196bd23]
  - @microscope-js/core@0.1.5
  - @microscope-js/utils@0.1.5

## 0.1.4

### Patch Changes

- b59760b: Rebuild + republish with the upgraded toolchain (TypeScript 6, Biome 2, latest `@types/node`) so every package's published artifact and SLSA provenance attestation match the same build environment.
- Updated dependencies [b59760b]
  - @microscope-js/core@0.1.4
  - @microscope-js/utils@0.1.4

## 0.1.2

### Patch Changes

- c683c46: Add `repository`, `homepage`, and `bugs` fields to each package's `package.json` so npm's provenance attestation can verify the repo claim matches the published source.
- Updated dependencies [c683c46]
  - @microscope-js/core@0.1.2
  - @microscope-js/utils@0.1.2

## 0.1.1

### Patch Changes

- 50a782e: Verify OIDC trusted-publisher release flow end-to-end. No code changes.
- Updated dependencies [50a782e]
  - @microscope-js/core@0.1.1
  - @microscope-js/utils@0.1.1
