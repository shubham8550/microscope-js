# @microscope-js/renderer-video

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-video?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-video)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-video?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-video)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-video?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Video renderer for [microscope-js](https://github.com/shubham8550/microscope-js). A tiny wrapper around the browser's native `<video>` element with controls — sub-kilobyte runtime, every codec your browser already supports.

## Install

```bash
pnpm add @microscope-js/renderer-video
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { videoRenderer } from '@microscope-js/renderer-video';

const registry = createRegistry([videoRenderer]);
await mount({
  source: file,
  container,
  registry,
  options: { autoplay: false, loop: true, muted: true },
});
```

## Options

| Option      | Default | Description                              |
| ----------- | ------- | ---------------------------------------- |
| `autoplay`  | `false` | Start playback as soon as it's ready     |
| `loop`      | `false` | Restart on `ended`                       |
| `muted`     | `false` | Start muted (required for autoplay in most browsers) |

The element ships with `controls`, `playsinline`, and `preload="metadata"` by default — sane for previewing user-uploaded clips.

## Format support

| Extension                                                      | MIME          |
| -------------------------------------------------------------- | ------------- |
| `.mp4` / `.m4v`                                                | `video/mp4`   |
| `.webm`                                                        | `video/webm`  |
| `.ogg` / `.ogv`                                                | `video/ogg`   |
| `.mov`                                                         | `video/quicktime` |
| `.mkv`                                                         | `video/x-matroska` |

Decoding is entirely the browser's responsibility. If a codec isn't supported natively (e.g. older browsers and HEVC), playback fails — there's no transcoding fallback.

## Security

- The source is wrapped in a `blob:` URL revoked on `destroy()`.
- No HTML is built from the source — no DOMPurify needed.
- The element is paused and `src` is cleared on teardown so the file is released.

## See also

- [`@microscope-js/renderer-audio`](https://www.npmjs.com/package/@microscope-js/renderer-audio) — sibling native-element renderer (shares the `renderNativeMedia` helper)
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
