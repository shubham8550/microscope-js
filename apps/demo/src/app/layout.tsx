import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'microscope-js — client-side file viewer',
  description:
    'Open-source JavaScript library for rendering PDF, Office, image, video and audio formats entirely in the browser.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
