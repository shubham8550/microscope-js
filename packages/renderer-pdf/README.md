# @microscope-js/renderer-pdf

PDF renderer backed by [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist). All rendering happens inside a Web Worker.

## Options

| Option       | Default            | Description                                         |
| ------------ | ------------------ | --------------------------------------------------- |
| `maxBytes`   | `256 * 1024 * 1024` | Reject PDFs larger than this                       |
| `maxPages`   | `5000`             | Cap pages rendered (defends against PDF bombs)      |
| `scale`      | `1.25`             | Canvas render scale                                 |
| `workerSrc`  | bundled            | Override pdf.worker.mjs URL (e.g. self-host on CDN) |

## Security notes

- `isEvalSupported: false` — disables PDF.js's runtime eval path entirely.
- `disableAutoFetch: true` — never re-fetches over the network.
- All rendering happens in the user's browser. The PDF byte stream is never sent anywhere.
