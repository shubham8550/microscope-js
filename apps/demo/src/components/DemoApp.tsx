'use client';

import { Viewer, useRegistry } from '@microscope-js/react';
import { audioRenderer } from '@microscope-js/renderer-audio';
import { docxRenderer } from '@microscope-js/renderer-docx';
import { imageRenderer } from '@microscope-js/renderer-image';
import { pdfRenderer } from '@microscope-js/renderer-pdf';
import { pptxRenderer } from '@microscope-js/renderer-pptx';
import { textRenderer } from '@microscope-js/renderer-text';
import { videoRenderer } from '@microscope-js/renderer-video';
import { xlsxRenderer } from '@microscope-js/renderer-xlsx';
import { useRef, useState } from 'react';

const ALL_RENDERERS = [
  pdfRenderer,
  docxRenderer,
  xlsxRenderer,
  pptxRenderer,
  imageRenderer,
  videoRenderer,
  audioRenderer,
  textRenderer,
];

const SAMPLE_HINT = [
  '✅ PDFs, Word (.docx), Excel (.xlsx, .csv), PowerPoint (.pptx)',
  '✅ Images: png, jpg, gif, webp, svg, avif, bmp',
  '✅ Video: mp4, webm, ogg, mov',
  '✅ Audio: mp3, wav, flac, ogg',
  '✅ Plain text, JSON, source code',
];

export function DemoApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const registry = useRegistry(ALL_RENDERERS);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <header style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, margin: 0, letterSpacing: '-0.02em' }}>
          🔬 microscope-js
        </h1>
        <p style={{ color: '#94a3b8', marginTop: 8 }}>
          100% client-side file viewer — drop a file to preview it. Nothing is uploaded.
        </p>
      </header>

      <Dropzone
        onFile={setFile}
        onClick={() => inputRef.current?.click()}
        hasFile={!!file}
      />

      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
        }}
      />

      <section style={{ marginTop: 24 }}>
        <Viewer
          source={file}
          registry={registry}
          style={{
            height: 600,
            backgroundColor: '#0f172a',
            border: '1px solid #1f2937',
            borderRadius: 12,
          }}
          emptyFallback={
            <div style={{ color: '#64748b' }}>
              Select a file above to preview it
            </div>
          }
        />
      </section>

      <section style={{ marginTop: 32, color: '#94a3b8' }}>
        <h2 style={{ fontSize: 18, color: '#cbd5e1' }}>Supported formats</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 20 }}>
          {SAMPLE_HINT.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <footer
        style={{
          marginTop: 48,
          textAlign: 'center',
          color: '#64748b',
          fontSize: 13,
        }}
      >
        <a
          href="https://github.com/shubham8550/microscope-js"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        {' · '}
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/docs/`}
          target="_blank"
          rel="noreferrer"
        >
          API docs
        </a>
      </footer>
    </main>
  );
}

function Dropzone({
  onFile,
  onClick,
  hasFile,
}: {
  onFile: (f: File) => void;
  onClick: () => void;
  hasFile: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        const f = e.dataTransfer.files[0];
        if (f) onFile(f);
      }}
      style={{
        width: '100%',
        padding: '28px 16px',
        border: `2px dashed ${hover ? '#60a5fa' : '#334155'}`,
        background: hover ? '#0b1a2f' : 'transparent',
        color: '#cbd5e1',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 120ms ease',
      }}
    >
      {hasFile ? 'Replace file…' : 'Click or drop a file to preview'}
    </button>
  );
}
