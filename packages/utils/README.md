# @microscope-js/utils

[![npm](https://img.shields.io/npm/v/@microscope-js/utils?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/utils)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/utils?label=gzip)](https://bundlephobia.com/package/@microscope-js/utils)
[![Types](https://img.shields.io/npm/types/@microscope-js/utils?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Shared low-level helpers for [microscope-js](https://github.com/shubham8550/microscope-js): source normalization, MIME sniffing, hardened DOMPurify, zip-slip / zip-bomb defenses, DOM micro-helpers. **If you find yourself writing the same helper in two renderers, add it here instead.**

## Install

```bash
pnpm add @microscope-js/utils
```

End-user apps usually get this transitively via `@microscope-js/core` — install it directly only when authoring a custom renderer.

## What's in the box

### Source normalization

```ts
import { normalizeSource, readAll, readHead, extOf, assertMaxSize } from '@microscope-js/utils';

const norm = await normalizeSource(file);   // -> { blob, mime, name, url }
const bytes = await readAll(norm.blob);      // Uint8Array
const head = await readHead(norm.blob, 32);  // first 32 bytes
assertMaxSize(norm.blob, 256 * 1024 * 1024); // throws MicroscopeError('TOO_LARGE')
const ext = extOf('Report.PDF');             // -> 'pdf'
```

### MIME sniffing

```ts
import { sniffMime, sniffMimeFromBytes, mimeMatches } from '@microscope-js/utils';

await sniffMime(blob);                         // -> 'application/pdf' | null
sniffMimeFromBytes(new Uint8Array([0x25, 0x50, 0x44, 0x46])); // -> 'application/pdf'
mimeMatches('image/png', 'image/*');           // -> true
```

### Hardened HTML sanitization

DOMPurify wrapped with a profile that forbids `script`, `iframe`, `object`, `embed`, `form`, `meta`, `link`, every `on*` attribute, and `data:` URIs except for safe image types.

```ts
import { sanitizeHtml, sanitizeToFragment } from '@microscope-js/utils';

container.innerHTML = sanitizeHtml(maybeEvilHtml);
container.appendChild(sanitizeToFragment(maybeEvilHtml));
```

> Browser-only. Throws if imported in an SSR context.

### Zip-slip + zip-bomb defenses

```ts
import { assertSafeZipEntry, ByteBudget } from '@microscope-js/utils';

const budget = new ByteBudget(512 * 1024 * 1024); // 512 MB uncompressed cap

for (const [path, entry] of Object.entries(zip.files)) {
  assertSafeZipEntry(path);          // rejects `..` segments + absolute paths
  const xml = await entry.async('string');
  budget.consume(xml.length);        // throws MicroscopeError('TOO_LARGE') if exceeded
}
```

### DOM micro-helpers

```ts
import { createEl, clearContainer, anySignal, objectUrl, renderNativeMedia } from '@microscope-js/utils';

const img = createEl('img', { attrs: { src }, style: { maxWidth: '100%' } });
clearContainer(parent);

const merged = anySignal(userSignal, timeoutSignal);
const url = objectUrl(blob, (fn) => teardown.push(fn));   // auto-revoke

// One-liner native media renderer shared by renderer-video + renderer-audio
renderNativeMedia('video', source, container, { autoplay: false });
```

### Error class

```ts
import { MicroscopeError } from '@microscope-js/utils';

throw new MicroscopeError('Source too large', 'TOO_LARGE');
// Codes: UNSUPPORTED | INVALID_SOURCE | TOO_LARGE | UNSAFE_ARCHIVE | RENDER_FAILED | ABORTED
```

## See also

- [`@microscope-js/core`](https://www.npmjs.com/package/@microscope-js/core) — `Renderer` interface + `mount()` (re-exports the most common utils for convenience)
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
