import { extOf, mimeMatches, type NormalizedSource } from '@microscope-js/utils';
import type { Registry, RegistryEntry, Renderer } from './types.js';

/**
 * Build a registry from a list of renderers. Later renderers in the list win
 * unless an explicit priority is given via `{ renderer, priority }`.
 *
 * The registry is intentionally tiny — picking a renderer is just:
 *   1. Run `canRender` overrides first (custom byte-sniffing wins).
 *   2. Otherwise match by MIME, then by extension, then by sniffed MIME.
 *   3. Highest priority wins.
 */
export function createRegistry(
  renderers: ReadonlyArray<Renderer | RegistryEntry>,
): Registry {
  const entries: RegistryEntry[] = renderers.map((r, i) =>
    'renderer' in r ? r : { renderer: r, priority: i },
  );

  const byId = new Map<string, Renderer>();
  for (const { renderer } of entries) {
    byId.set(renderer.id, renderer);
  }

  return {
    entries,
    get(id) {
      return byId.get(id) ?? null;
    },
    async match(source) {
      const ext = extOf(source.name);
      const mime = source.mime;

      // First pass — let any renderer with a custom `canRender` claim the source.
      // This is how byte-sniffing renderers (ZIP-based formats) override MIME.
      const candidates: RegistryEntry[] = [];
      for (const entry of entries) {
        const r = entry.renderer;
        if (r.canRender) {
          const ok = await r.canRender(source);
          if (ok) candidates.push(entry);
          continue;
        }
        if (claimsByMeta(r, mime, ext)) candidates.push(entry);
      }

      if (candidates.length === 0) return null;
      candidates.sort((a, b) => b.priority - a.priority);
      return candidates[0]?.renderer ?? null;
    },
  };
}

function claimsByMeta(r: Renderer, mime: string | null, ext: string | null): boolean {
  if (mime) {
    for (const m of r.mimes) {
      if (mimeMatches(mime, m)) return true;
    }
  }
  if (ext && r.extensions.includes(ext)) return true;
  return false;
}

/**
 * Compose two registries — useful when an app wants its own custom renderers
 * layered on top of the default ones without losing tree-shakability.
 */
export function composeRegistries(...regs: ReadonlyArray<Registry>): Registry {
  const merged: RegistryEntry[] = [];
  for (const r of regs) merged.push(...r.entries);
  return createRegistry(merged);
}
