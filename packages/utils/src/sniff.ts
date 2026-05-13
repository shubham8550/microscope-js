import { readHead } from './source.js';

/**
 * Magic-byte signatures for the formats microscope-js supports.
 * Keep this list short — file-type detection is "best effort" and
 * always paired with extension/MIME fallback in the registry.
 */
const SIGNATURES: ReadonlyArray<{
  mime: string;
  offset: number;
  bytes: ReadonlyArray<number | null>; // null = wildcard
}> = [
  { mime: 'application/pdf', offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { mime: 'image/png', offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/jpeg', offset: 0, bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/gif', offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
  { mime: 'image/webp', offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] }, // RIFF....WEBP
  { mime: 'image/bmp', offset: 0, bytes: [0x42, 0x4d] },
  // ZIP-based (DOCX/XLSX/PPTX). Disambiguation by extension/MIME happens upstream.
  { mime: 'application/zip', offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04] },
  { mime: 'application/zip', offset: 0, bytes: [0x50, 0x4b, 0x05, 0x06] },
  // Audio
  { mime: 'audio/mpeg', offset: 0, bytes: [0x49, 0x44, 0x33] }, // ID3
  { mime: 'audio/wav', offset: 0, bytes: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x41, 0x56, 0x45] },
  { mime: 'audio/flac', offset: 0, bytes: [0x66, 0x4c, 0x61, 0x43] },
  // Video
  { mime: 'video/mp4', offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
  { mime: 'video/webm', offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] },
];

/** Detect a MIME type from the leading bytes. Returns `null` if unknown. */
export function sniffMimeFromBytes(head: Uint8Array): string | null {
  for (const { mime, offset, bytes } of SIGNATURES) {
    if (head.length < offset + bytes.length) continue;
    let match = true;
    for (let i = 0; i < bytes.length; i++) {
      const expect = bytes[i];
      if (expect === null) continue;
      if (head[offset + i] !== expect) {
        match = false;
        break;
      }
    }
    if (match) return mime;
  }
  return null;
}

/** Convenience wrapper: read the first 32 bytes of a Blob and sniff. */
export async function sniffMime(blob: Blob): Promise<string | null> {
  const head = await readHead(blob, 32);
  return sniffMimeFromBytes(head);
}

/** Match a given MIME against a list of MIME globs (e.g. `image/*`). */
export function mimeMatches(actual: string, pattern: string): boolean {
  if (pattern === '*' || pattern === '*/*') return true;
  const [pT, pS] = pattern.split('/', 2);
  const [aT, aS] = actual.split('/', 2);
  if (pT !== '*' && pT !== aT) return false;
  if (pS !== '*' && pS !== aS) return false;
  return true;
}
