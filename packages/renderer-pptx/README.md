# @microscope-js/renderer-pptx

Renders `.pptx` decks as paginated text-only slides. We open the archive with [JSZip](https://stuk.github.io/jszip/), reject path-traversal entries (`..`, absolute paths), cap uncompressed size to defend against zip bombs, and extract the text runs from each `slide*.xml`.

This is intentionally a **lightweight text view** rather than a pixel-perfect renderer — it keeps the package tiny and avoids shipping a full OOXML layout engine. If you need pixel-perfect rendering, pair this with a server-side preview pipeline; if you don't, you save ~2 MB of bundle vs. alternatives.
