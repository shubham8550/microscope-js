import { defineConfig } from 'tsup';

/**
 * Shared tsup build config used by every package.
 * Override entry/format/external in per-package tsup.config.ts if needed.
 */
export const sharedConfig = defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2022',
});

export default sharedConfig;
