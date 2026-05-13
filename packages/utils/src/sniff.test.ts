import { describe, expect, it } from 'vitest';
import { mimeMatches, sniffMimeFromBytes } from './sniff.js';

describe('sniffMimeFromBytes', () => {
  it('detects PDF', () => {
    expect(sniffMimeFromBytes(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))).toBe(
      'application/pdf',
    );
  });
  it('detects PNG', () => {
    expect(sniffMimeFromBytes(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))).toBe('image/png');
  });
  it('returns null for unknown', () => {
    expect(sniffMimeFromBytes(new Uint8Array([0, 0, 0, 0]))).toBeNull();
  });
});

describe('mimeMatches', () => {
  it('matches glob', () => {
    expect(mimeMatches('image/png', 'image/*')).toBe(true);
    expect(mimeMatches('image/png', 'video/*')).toBe(false);
    expect(mimeMatches('application/pdf', 'application/pdf')).toBe(true);
  });
});
