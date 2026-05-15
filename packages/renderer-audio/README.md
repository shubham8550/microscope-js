# @microscope-js/renderer-audio

[![npm](https://img.shields.io/npm/v/@microscope-js/renderer-audio?color=cb3837&logo=npm)](https://www.npmjs.com/package/@microscope-js/renderer-audio)
[![Bundle](https://img.shields.io/bundlephobia/minzip/@microscope-js/renderer-audio?label=gzip)](https://bundlephobia.com/package/@microscope-js/renderer-audio)
[![Types](https://img.shields.io/npm/types/@microscope-js/renderer-audio?logo=typescript)](https://www.typescriptlang.org/)
[![Provenance](https://img.shields.io/badge/SLSA-provenance-blueviolet?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)

> Audio renderer for [microscope-js](https://github.com/shubham8550/microscope-js). A tiny wrapper around the browser's native `<audio>` element with controls — sub-kilobyte runtime.

## Install

```bash
pnpm add @microscope-js/renderer-audio
```

## Use

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { audioRenderer } from '@microscope-js/renderer-audio';

const registry = createRegistry([audioRenderer]);
await mount({
  source: file,
  container,
  registry,
  options: { autoplay: false, loop: false, muted: false },
});
```

## Options

| Option      | Default | Description                              |
| ----------- | ------- | ---------------------------------------- |
| `autoplay`  | `false` | Start playback as soon as it's ready     |
| `loop`      | `false` | Restart on `ended`                       |
| `muted`     | `false` | Start muted                              |

## Format support

| Extension                                      | MIME             |
| ---------------------------------------------- | ---------------- |
| `.mp3`                                         | `audio/mpeg`     |
| `.wav`                                         | `audio/wav`      |
| `.ogg` / `.oga`                                | `audio/ogg`      |
| `.flac`                                        | `audio/flac`     |
| `.aac` / `.m4a`                                | `audio/aac`      |
| `.opus`                                        | `audio/opus`     |
| `.weba`                                        | `audio/webm`     |

Decoding is entirely the browser's responsibility — codec support matches your target browsers exactly.

## Security

- The source is wrapped in a `blob:` URL revoked on `destroy()`.
- No HTML is built from the source.
- The element is paused and `src` is cleared on teardown so the file is released.

## See also

- [`@microscope-js/renderer-video`](https://www.npmjs.com/package/@microscope-js/renderer-video) — sibling native-element renderer (shares the `renderNativeMedia` helper)
- [`@microscope-js/react`](https://www.npmjs.com/package/@microscope-js/react) — React adapter
- [Repository](https://github.com/shubham8550/microscope-js) · [Live demo](https://shubham8550.github.io/microscope-js) · [API docs](https://shubham8550.github.io/microscope-js/docs)

## License

[MIT](https://github.com/shubham8550/microscope-js/blob/main/LICENSE)
