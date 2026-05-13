/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = isPages ? '/microscope-js' : '';

export default {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // Keep the worker chunks out of the server build.
    serverActions: { allowedOrigins: [] },
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  transpilePackages: [
    '@microscope-js/core',
    '@microscope-js/react',
    '@microscope-js/utils',
    '@microscope-js/renderer-pdf',
    '@microscope-js/renderer-image',
    '@microscope-js/renderer-video',
    '@microscope-js/renderer-audio',
    '@microscope-js/renderer-docx',
    '@microscope-js/renderer-xlsx',
    '@microscope-js/renderer-pptx',
    '@microscope-js/renderer-text',
  ],
};
