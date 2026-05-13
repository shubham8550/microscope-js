import { MicroscopeError } from './errors.js';

/**
 * Reject archive entry paths that could escape the destination directory
 * (CWE-22 — zip-slip). Renderers MUST call this for every entry they extract.
 */
export function assertSafeZipEntry(path: string): void {
  if (!path) throw new MicroscopeError('Empty archive entry', 'UNSAFE_ARCHIVE');
  if (path.startsWith('/') || /^[a-z]:[\\/]/i.test(path)) {
    throw new MicroscopeError(`Absolute path in archive: ${path}`, 'UNSAFE_ARCHIVE');
  }
  const segments = path.split(/[\\/]/);
  for (const seg of segments) {
    if (seg === '..') {
      throw new MicroscopeError(`Path-traversal segment in archive: ${path}`, 'UNSAFE_ARCHIVE');
    }
  }
}

/** Cap total uncompressed bytes when iterating an archive — defends against zip bombs. */
export class ByteBudget {
  private used = 0;
  constructor(private readonly maxBytes: number) {}
  consume(n: number): void {
    this.used += n;
    if (this.used > this.maxBytes) {
      throw new MicroscopeError(
        `Archive exceeds uncompressed limit of ${this.maxBytes} bytes`,
        'TOO_LARGE',
      );
    }
  }
}
