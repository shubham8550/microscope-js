import {
  MicroscopeError,
  type Registry,
  type RenderHandle,
  type Source,
  mount,
} from '@microscope-js/core';
import { useEffect, useRef, useState } from 'react';

export interface UseViewerOptions {
  source: Source | null | undefined;
  registry: Registry;
  rendererId?: string;
  options?: Record<string, unknown>;
}

export interface UseViewerResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
  error: Error | null;
  handle: RenderHandle | null;
}

/**
 * Hook that mounts the right renderer into a container ref whenever `source` changes.
 * Cancels in-flight renders and tears down the previous handle on every change.
 *
 * SSR-safe: nothing happens until `useEffect` runs in the browser.
 */
export function useViewer({
  source,
  registry,
  rendererId,
  options,
}: UseViewerOptions): UseViewerResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [handle, setHandle] = useState<RenderHandle | null>(null);

  useEffect(() => {
    if (!source || !containerRef.current) return;
    const ctrl = new AbortController();
    let active = true;
    let current: RenderHandle | null = null;

    setLoading(true);
    setError(null);

    mount({
      source,
      container: containerRef.current,
      registry,
      options,
      signal: ctrl.signal,
      ...(rendererId ? { rendererId } : {}),
    })
      .then((h) => {
        if (!active) {
          h.destroy();
          return;
        }
        current = h;
        setHandle(h);
      })
      .catch((err) => {
        if (!active) return;
        const e = err instanceof Error ? err : new MicroscopeError(String(err), 'RENDER_FAILED');
        setError(e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      ctrl.abort();
      current?.destroy();
      setHandle(null);
    };
  }, [source, registry, rendererId, options]);

  return { containerRef, loading, error, handle };
}
