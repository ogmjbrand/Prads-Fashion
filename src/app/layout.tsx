import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PRADSFASHION | Premium Fashion',
  description: 'Discover premium fashion at PRADSFASHION. Elegant, modern designs crafted for confident individuals.',
  metadataBase: new URL('https://prads-fashion.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prads-fashion.com',
    title: 'PRADSFASHION | Premium Fashion',
    description: 'Discover premium fashion at PRADSFASHION. Elegant, modern designs crafted for confident individuals.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PRADSFASHION',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-brand-white text-brand-black antialiased">
        {children}
      </body>
    </html>
  );
}
