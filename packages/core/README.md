# @microscope-js/core

Framework-agnostic core of microscope-js. Defines the `Renderer` interface and the registry that picks the right renderer for a source.

```ts
import { createRegistry, mount } from '@microscope-js/core';
import { pdfRenderer } from '@microscope-js/renderer-pdf';

const registry = createRegistry([pdfRenderer]);
const handle = await mount({
  source: file,
  container: document.getElementById('viewer')!,
  registry,
});
// later...
handle.destroy();
```

## Defining a renderer

```ts
import type { Renderer } from '@microscope-js/core';

export const myRenderer: Renderer = {
  id: 'myformat',
  name: 'My Format',
  mimes: ['application/x-myformat'],
  extensions: ['myf'],
  async render({ source, container, signal }) {
    // ... mount into container, listen to signal for cancellation
    return {
      destroy() { /* clean up */ },
    };
  },
};
```

Renderers are pure values — no class instantiation, no global state. The registry handles matching by MIME + extension, with custom `canRender` overrides for byte-sniffing renderers.
