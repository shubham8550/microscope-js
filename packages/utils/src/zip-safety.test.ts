import { describe, expect, it } from 'vitest';
import { ByteBudget, assertSafeZipEntry } from './zip-safety.js';

describe('assertSafeZipEntry', () => {
  it('accepts ordinary paths', () => {
    expect(() => assertSafeZipEntry('word/document.xml')).not.toThrow();
  });
  it('rejects path traversal', () => {
    expect(() => assertSafeZipEntry('../etc/passwd')).toThrow();
    expect(() => assertSafeZipEntry('foo/../bar')).toThrow();
  });
  it('rejects absolute paths', () => {
    expect(() => assertSafeZipEntry('/etc/passwd')).toThrow();
    expect(() => assertSafeZipEntry('C:/Windows/system32')).toThrow();
  });
});

describe('ByteBudget', () => {
  it('throws when exceeded', () => {
    const b = new ByteBudget(100);
    b.consume(50);
    expect(() => b.consume(60)).toThrow();
  });
});
