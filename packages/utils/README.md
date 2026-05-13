# @microscope-js/utils

Shared low-level helpers used by every renderer in microscope-js:

- `normalizeSource(input)` — turn any `File | Blob | ArrayBuffer | Uint8Array | URL | string` into a `Blob` with metadata
- `sniffMimeFromBytes(head)` — magic-byte MIME detection
- `sanitizeHtml(dirty)` — DOMPurify wrapped with a hardened profile (used by office renderers)
- `assertSafeZipEntry(path)` / `ByteBudget` — zip-slip + zip-bomb defenses
- `createEl`, `clearContainer`, `anySignal`, `objectUrl` — DOM micro-helpers

> If you find yourself writing the same helper in two renderers, **add it here instead**.
