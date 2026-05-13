import DOMPurify, { type Config } from 'dompurify';

type Purifier = ReturnType<typeof DOMPurify>;

const HARDENED_PROFILE: Config = {
  USE_PROFILES: { html: true, svg: true },
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'meta', 'link'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'formaction', 'srcdoc'],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel|cid|blob|data:image\/(?:png|jpeg|gif|webp|svg\+xml));?)/i,
  RETURN_TRUSTED_TYPE: false,
};

let purifier: Purifier | null = null;

function getPurifier(): Purifier {
  if (purifier) return purifier;
  if (typeof window === 'undefined') {
    throw new Error('sanitizeHtml is browser-only — call it from a client component');
  }
  purifier = DOMPurify(window);
  purifier.addHook('afterSanitizeAttributes', (node: Element) => {
    if (node instanceof HTMLAnchorElement) {
      node.setAttribute('rel', 'noopener noreferrer');
      node.setAttribute('target', '_blank');
    }
  });
  return purifier;
}

/** Sanitize arbitrary HTML from an untrusted document with a hardened profile. */
export function sanitizeHtml(dirty: string): string {
  return getPurifier().sanitize(dirty, HARDENED_PROFILE) as unknown as string;
}

/** Sanitize and return a DOM fragment ready to attach with `appendChild`. */
export function sanitizeToFragment(dirty: string): DocumentFragment {
  return getPurifier().sanitize(dirty, {
    ...HARDENED_PROFILE,
    RETURN_DOM_FRAGMENT: true,
  }) as unknown as DocumentFragment;
}
