// Re-export the small set of utils users need at the entry point
// so consumers don't have to install `@microscope-js/utils` separately.
export {
  extOf,
  MicroscopeError,
  type NormalizedSource,
  normalizeSource,
  type Source,
  sniffMime,
} from '@microscope-js/utils';
export * from './mount.js';
export * from './registry.js';
export * from './types.js';
