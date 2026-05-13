import type { Registry, Source } from '@microscope-js/core';
import type { CSSProperties, ReactNode } from 'react';
import { useViewer } from './useViewer.js';

export interface ViewerProps {
  source: Source | null | undefined;
  registry: Registry;
  rendererId?: string;
  options?: Record<string, unknown>;
  /** Container className — apply your own styles here. */
  className?: string;
  /** Container inline style. Defaults to a sane 16:9 box. */
  style?: CSSProperties;
  /** Element shown while a render is in flight. */
  loadingFallback?: ReactNode;
  /** Render prop for errors. Receives the error; return your UI. */
  errorFallback?: (err: Error) => ReactNode;
  /** Element shown when no source is supplied. */
  emptyFallback?: ReactNode;
}

const DEFAULT_STYLE: CSSProperties = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  backgroundColor: '#f3f4f6',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  overflow: 'hidden',
};

/**
 * Drop-in React component. SSR-safe — renders an empty container on the server
 * and mounts the format-specific renderer once on the client.
 */
export function Viewer({
  source,
  registry,
  rendererId,
  options,
  className,
  style,
  loadingFallback,
  errorFallback,
  emptyFallback,
}: ViewerProps) {
  const hookOpts: Parameters<typeof useViewer>[0] = { source, registry };
  if (rendererId !== undefined) hookOpts.rendererId = rendererId;
  if (options !== undefined) hookOpts.options = options;

  const { containerRef, loading, error } = useViewer(hookOpts);

  return (
    <div className={className} style={{ ...DEFAULT_STYLE, ...style }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {!source && <Overlay>{emptyFallback ?? <span>No file selected</span>}</Overlay>}
      {loading && <Overlay>{loadingFallback ?? <span>Loading…</span>}</Overlay>}
      {error && (
        <Overlay tone="error">
          {errorFallback ? errorFallback(error) : <span>{error.message}</span>}
        </Overlay>
      )}
    </div>
  );
}

function Overlay({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: 'error';
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        textAlign: 'center',
        color: tone === 'error' ? '#b91c1c' : '#6b7280',
        backgroundColor: 'rgba(255,255,255,.7)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}
