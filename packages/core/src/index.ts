export * from './types.js';
export * from './registry.js';
export * from './mount.js';

// Re-export the small set of utils users need at the entry point
// so consumers don't have to install `@microscope-js/utils` separately.
export {
  MicroscopeError,
  type Source,
  type NormalizedSource,
  normalizeSource,
  sniffMime,
  extOf,
} from '@microscope-js/utils';
