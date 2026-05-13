# @microscope-js/renderer-pdf

## 0.1.4

### Patch Changes

- Updated dependencies [b59760b]
  - @microscope-js/core@0.1.4
  - @microscope-js/utils@0.1.4

## 0.1.3

### Patch Changes

- 69bb65d: Upgrade `pdfjs-dist` 4.10.x → 5.7.x. Drops the `isEvalSupported: false` option (PDF.js v5 disables `eval` by default), keeps `disableAutoFetch: true` for the same safety hardening.

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
