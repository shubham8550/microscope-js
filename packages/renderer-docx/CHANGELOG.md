# @microscope-js/renderer-docx

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
