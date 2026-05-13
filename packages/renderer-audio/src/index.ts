import type { Renderer } from '@microscope-js/core';
import { renderNativeMedia } from '@microscope-js/utils';

export interface AudioOptions {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const audioRenderer: Renderer = {
  id: 'audio',
  name: 'Audio',
  mimes: ['audio/*'],
  extensions: ['mp3', 'wav', 'ogg', 'oga', 'flac', 'aac', 'm4a', 'opus', 'weba'],
  async render({ source, container, options }) {
    return renderNativeMedia('audio', source, container, (options ?? {}) as AudioOptions);
  },
};

export default audioRenderer;
