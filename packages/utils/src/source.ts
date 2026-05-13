import { MicroscopeError } from './errors.js';

/** Anything callers can hand to a renderer. */
export type Source = File | Blob | ArrayBuffer | Uint8Array | URL | string;

export interface NormalizedSource {
  /** Always a Blob — renderers should consume this. */
  blob: Blob;
  /** Best-known MIME (from the Source or `null`). Not yet sniffed. */
  mime: string | null;
  /** Original filename if available. */
  name: string | null;
  /** Origin URL if the source was a URL/string. */
  url: string | null;
}

const isArrayBuffer = (v: unknown): v is ArrayBuffer =>
  typeof ArrayBuffer !== 'undefined' && v instanceof ArrayBuffer;
const isBlob = (v: unknown): v is Blob => typeof Blob !== 'undefined' && v instanceof Blob;
const isFile = (v: unknown): v is File => typeof File !== 'undefined' && v instanceof File;
const isURL = (v: unknown): v is URL => typeof URL !== 'undefined' && v instanceof URL;
const isUint8 = (v: unknown): v is Uint8Array =>
  typeof Uint8Array !== 'undefined' && v instanceof Uint8Array;

/**
 * Normalize any supported input into a Blob plus best-effort metadata.
 * Does not read network resources — URLs are fetched lazily by {@link loadBytes}.
 */
export async function normalizeSource(source: Source): Promise<NormalizedSource> {
  if (isFile(source)) {
    return { blob: source, mime: source.type || null, name: source.name || null, url: null };
  }
  if (isBlob(source)) {
    return { blob: source, mime: source.type || null, name: null, url: null };
  }
  if (isUint8(source)) {
    return { blob: new Blob([source as BlobPart]), mime: null, name: null, url: null };
  }
  if (isArrayBuffer(source)) {
    return { blob: new Blob([source]), mime: null, name: null, url: null };
  }
  if (isURL(source) || typeof source === 'string') {
    const url = typeof source === 'string' ? source : source.toString();
    return fetchAsSource(url);
  }
  throw new MicroscopeError('Unsupported source type', 'INVALID_SOURCE');
}

async function fetchAsSource(url: string): Promise<NormalizedSource> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new MicroscopeError(`Failed to fetch source (${res.status})`, 'INVALID_SOURCE');
  }
  const blob = await res.blob();
  const cd = res.headers.get('content-disposition') ?? '';
  const nameMatch = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(cd);
  const name = nameMatch?.[1] ?? guessNameFromUrl(url);
  return {
    blob,
    mime: blob.type || res.headers.get('content-type')?.split(';')[0]?.trim() || null,
    name,
    url,
  };
}

function guessNameFromUrl(url: string): string | null {
  try {
    const u = new URL(url, 'http://localhost');
    const last = u.pathname.split('/').filter(Boolean).pop();
    return last ? decodeURIComponent(last) : null;
  } catch {
    return null;
  }
}

/** Read the first `byteLength` bytes of a Blob — used for magic-byte sniffing. */
export async function readHead(blob: Blob, byteLength = 16): Promise<Uint8Array> {
  const slice = blob.slice(0, Math.min(byteLength, blob.size));
  return new Uint8Array(await slice.arrayBuffer());
}

/** Read the entire Blob into a Uint8Array (consider blob.stream() for huge files). */
export async function readAll(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

/** Lowercase extension from a filename, or null. */
export function extOf(name: string | null | undefined): string | null {
  if (!name) return null;
  const dot = name.lastIndexOf('.');
  if (dot < 0 || dot === name.length - 1) return null;
  return name.slice(dot + 1).toLowerCase();
}

/** Enforce a maximum source size — used by renderers to refuse zip-bomb-class inputs. */
export function assertMaxSize(blob: Blob, maxBytes: number): void {
  if (blob.size > maxBytes) {
    throw new MicroscopeError(
      `Source is ${blob.size} bytes, exceeds limit of ${maxBytes}`,
      'TOO_LARGE',
    );
  }
}
