/** Empty a container in one assignment — used by every renderer before mounting. */
export function clearContainer(el: HTMLElement): void {
  el.replaceChildren();
}

/**
 * Create a child element with classes, attributes, and styles in one call.
 * Lets renderers avoid hand-rolling `document.createElement` boilerplate.
 */
export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  opts: {
    className?: string;
    attrs?: Record<string, string>;
    style?: Partial<CSSStyleDeclaration>;
    text?: string;
  } = {},
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (opts.className) el.className = opts.className;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) el.setAttribute(k, v);
  }
  if (opts.style) {
    Object.assign(el.style, opts.style);
  }
  if (opts.text !== undefined) el.textContent = opts.text;
  return el;
}

/** Build an `AbortSignal` that fires when any of the inputs do. */
export function anySignal(...signals: Array<AbortSignal | undefined>): AbortSignal {
  const ctrl = new AbortController();
  for (const sig of signals) {
    if (!sig) continue;
    if (sig.aborted) {
      ctrl.abort(sig.reason);
      break;
    }
    sig.addEventListener('abort', () => ctrl.abort(sig.reason), { once: true });
  }
  return ctrl.signal;
}

/** Issue a Blob URL with automatic revocation on a teardown hook. */
export function objectUrl(blob: Blob, onTeardown: (fn: () => void) => void): string {
  const url = URL.createObjectURL(blob);
  onTeardown(() => URL.revokeObjectURL(url));
  return url;
}
