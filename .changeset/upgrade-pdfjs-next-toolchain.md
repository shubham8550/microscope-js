---
'@microscope-js/renderer-pdf': patch
---

Upgrade `pdfjs-dist` 4.10.x → 5.7.x. Drops the `isEvalSupported: false` option (PDF.js v5 disables `eval` by default), keeps `disableAutoFetch: true` for the same safety hardening.
