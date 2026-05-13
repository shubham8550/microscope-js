import type { Renderer } from '@microscope-js/core';
import { createEl, objectUrl } from '@microscope-js/utils';

/** Image renderer — covers every browser-native bitmap/vector format. */
export const imageRenderer: Renderer = {
  id: 'image',
  name: 'Image',
  mimes: ['image/*'],
  extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif', 'bmp', 'ico'],
  async render({ source, container }) {
    const teardown: Array<() => void> = [];
    const url = objectUrl(source.blob, (fn) => teardown.push(fn));

    const img = createEl('img', {
      attrs: {
        src: url,
        alt: source.name ?? 'image',
        loading: 'eager',
        decoding: 'async',
      },
      style: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' },
    });
    container.appendChild(img);

    return {
      destroy() {
        for (const fn of teardown) fn();
        img.remove();
      },
    };
  },
};

export default imageRenderer;
