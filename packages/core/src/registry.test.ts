import { describe, expect, it } from 'vitest';
import { createRegistry } from './registry.js';
import type { Renderer } from './types.js';

const pdfRenderer: Renderer = {
  id: 'pdf',
  name: 'PDF',
  mimes: ['application/pdf'],
  extensions: ['pdf'],
  render: async () => ({ destroy() {} }),
};

const imageRenderer: Renderer = {
  id: 'image',
  name: 'Image',
  mimes: ['image/*'],
  extensions: ['png', 'jpg'],
  render: async () => ({ destroy() {} }),
};

describe('registry', () => {
  const reg = createRegistry([pdfRenderer, imageRenderer]);

  it('matches by mime', async () => {
    const r = await reg.match({
      blob: new Blob(),
      mime: 'application/pdf',
      name: null,
      url: null,
    });
    expect(r?.id).toBe('pdf');
  });

  it('matches image wildcard', async () => {
    const r = await reg.match({
      blob: new Blob(),
      mime: 'image/png',
      name: null,
      url: null,
    });
    expect(r?.id).toBe('image');
  });

  it('matches by extension when mime missing', async () => {
    const r = await reg.match({
      blob: new Blob(),
      mime: null,
      name: 'foo.pdf',
      url: null,
    });
    expect(r?.id).toBe('pdf');
  });

  it('returns null on no match', async () => {
    const r = await reg.match({
      blob: new Blob(),
      mime: 'application/x-foo',
      name: null,
      url: null,
    });
    expect(r).toBeNull();
  });

  it('looks up by id', () => {
    expect(reg.get('pdf')?.id).toBe('pdf');
    expect(reg.get('nope')).toBeNull();
  });
});
