import type { Renderer } from '@microscope-js/core';
import { renderNativeMedia } from '@microscope-js/utils';

export interface VideoOptions {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const videoRenderer: Renderer = {
  id: 'video',
  name: 'Video',
  mimes: ['video/*'],
  extensions: ['mp4', 'webm', 'ogg', 'ogv', 'mov', 'm4v', 'mkv'],
  async render({ source, container, options }) {
    return renderNativeMedia('video', source, container, (options ?? {}) as VideoOptions);
  },
};

export default videoRenderer;
