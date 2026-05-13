import type { NormalizedSource, Source } from '@microscope-js/utils';

/** Runtime context handed to a Renderer when it's asked to display a source. */
export interface RenderContext {
  /** The normalized source. Renderers receive a Blob, not the original input. */
  source: NormalizedSource;
  /** DOM node the renderer must mount into. It will be cleared before render. */
  container: HTMLElement;
  /** Per-render options forwarded to the renderer. Shape is renderer-specific. */
  options?: Record<string, unknown>;
  /** Cancels in-flight rendering. The renderer should clean up partial state. */
  signal?: AbortSignal;
  /** Translation callback for any user-facing strings (toolbar labels, errors). */
  t?: (key: string, fallback: string) => string;
}

/** Handle returned to callers — destroy() is the only required capability. */
export interface RenderHandle {
  /** Tear down: revoke object URLs, abort workers, detach listeners. */
  destroy(): void;
  /** Renderer-specific capabilities (zoom, navigate, fullscreen, etc.). */
  readonly capabilities?: Readonly<Record<string, unknown>>;
}

/** What a Renderer reports about itself before being asked to handle anything. */
export interface RendererMeta {
  /** Unique id — e.g. `pdf`, `image`, `docx`. */
  id: string;
  /** Human-readable name for UI. */
  name: string;
  /** MIME types this renderer claims. Supports `*` wildcards (e.g. `image/*`). */
  mimes: ReadonlyArray<string>;
  /** Lowercase file extensions this renderer claims (no leading dot). */
  extensions: ReadonlyArray<string>;
}

/**
 * The single interface every format implementation must satisfy.
 * Stateless — instances are reusable across renders.
 */
export interface Renderer extends RendererMeta {
  /**
   * Cheap predicate run by the registry. Defaults check MIME + extension; renderers
   * that need byte-sniffing override this to inspect `source.bytes()`.
   */
  canRender?(source: NormalizedSource): boolean | Promise<boolean>;
  /** Perform the actual render. Must throw {@link MicroscopeError} on failure. */
  render(ctx: RenderContext): Promise<RenderHandle>;
}

/** Entry the registry stores internally. */
export interface RegistryEntry {
  renderer: Renderer;
  priority: number;
}

/** Input to {@link mount} — what callers actually pass. */
export interface MountOptions {
  source: Source;
  container: HTMLElement;
  registry: Registry;
  options?: Record<string, unknown>;
  signal?: AbortSignal;
  t?: RenderContext['t'];
  /** Force a specific renderer by id (skips matching). */
  rendererId?: string;
}

export interface Registry {
  readonly entries: ReadonlyArray<RegistryEntry>;
  /** Pick the highest-priority renderer that claims this source, or null. */
  match(source: NormalizedSource): Promise<Renderer | null>;
  /** Look up a renderer by id (used when callers force-select one). */
  get(id: string): Renderer | null;
}
