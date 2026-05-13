import type { NormalizedSource } from './source.js';
import { createEl, objectUrl } from './dom.js';

/**
 * Shared body for native-media renderers (`<video>`, `<audio>`).
 * Keeps the per-format renderer packages to a few lines and avoids duplicating
 * URL/teardown plumbing across them.
 */
export function renderNativeMedia(
  tag: 'video' | 'audio',
  source: NormalizedSource,
  container: HTMLElement,
  opts: { autoplay?: boolean; loop?: boolean; muted?: boolean } = {},
): { destroy(): void } {
  const teardown: Array<() => void> = [];
  const url = objectUrl(source.blob, (fn) => teardown.push(fn));

  const el = createEl(tag, {
    attrs: {
      src: url,
      controls: '',
      preload: 'metadata',
      playsinline: '',
      ...(opts.autoplay ? { autoplay: '' } : {}),
      ...(opts.loop ? { loop: '' } : {}),
      ...(opts.muted ? { muted: '' } : {}),
    },
    style: {
      width: '100%',
      maxHeight: '100%',
      display: 'block',
      backgroundColor: 'black',
    },
  });
  container.appendChild(el);

  return {
    destroy() {
      el.pause?.();
      el.removeAttribute('src');
      el.load?.();
      for (const fn of teardown) fn();
      el.remove();
    },
  };
}
