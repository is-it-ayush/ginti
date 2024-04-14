import '~/styles/globals.css';

import { Poppins, Space_Mono } from 'next/font/google';
import { Metadata } from 'next';

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

const _ = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  applicationName: 'ginti.',
  title: 'ginti.',
  description: 'A simple way to understand number systems.',
  icons: [
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-57x57.png',
      sizes: '57x57',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-60x60.png',
      sizes: '60x60',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-72x72.png',
      sizes: '72x72',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-76x76.png',
      sizes: '76x76',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-114x114.png',
      sizes: '114x114',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-120x120.png',
      sizes: '120x120',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-144x144.png',
      sizes: '144x144',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-152x152.png',
      sizes: '152x152',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      url: '/apple-icon-180x180.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/android-icon-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-96x96.png',
      sizes: '96x96',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-16x16.png',
      sizes: '16x16',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'ginti.',
    description: 'A simple way to understand number systems.',
    images: [
      {
        url: '/ginti_og.png',
        alt: 'ginti. | A simple way to understand number systems. | by isitayush',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://ginti-eta.vercel.app',
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${font.variable}`}>{children}</body>
    </html>
  );
}
