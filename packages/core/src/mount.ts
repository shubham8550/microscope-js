import { clearContainer, MicroscopeError, normalizeSource, sniffMime } from '@microscope-js/utils';
import type { MountOptions, RenderHandle } from './types.js';

/**
 * The single entry point most callers will use. Normalizes the source,
 * sniffs MIME if unknown, picks a renderer from the registry, and renders.
 *
 * Returns a handle whose `destroy()` MUST be called by the caller.
 */
export async function mount(opts: MountOptions): Promise<RenderHandle> {
  const { source, container, registry, options, signal, t, rendererId } = opts;

  if (!container) {
    throw new MicroscopeError('mount() requires a container element', 'INVALID_SOURCE');
  }
  if (signal?.aborted) {
    throw new MicroscopeError('aborted before start', 'ABORTED');
  }

  const normalized = await normalizeSource(source);
  if (!normalized.mime) {
    normalized.mime = await sniffMime(normalized.blob);
  }

  const renderer = rendererId ? registry.get(rendererId) : await registry.match(normalized);

  if (!renderer) {
    throw new MicroscopeError(
      `No renderer registered for source (mime=${normalized.mime ?? 'unknown'}, name=${normalized.name ?? 'unknown'})`,
      'UNSUPPORTED',
    );
  }

  clearContainer(container);
  return renderer.render({ source: normalized, container, options, signal, t });
}
