import { createRegistry, type Registry, type Renderer } from '@microscope-js/core';
import { useMemo } from 'react';

/**
 * Stable {@link Registry} memoized by the renderer ids — so consumers can pass
 * an inline array literal (`useRegistry([pdf, image])`) without thrashing on
 * every render.
 */
export function useRegistry(renderers: ReadonlyArray<Renderer>): Registry {
  const key = renderers.map((r) => r.id).join('|');
  // biome-ignore lint/correctness/useExhaustiveDependencies: key encodes renderers
  return useMemo(() => createRegistry(renderers), [key]);
}
