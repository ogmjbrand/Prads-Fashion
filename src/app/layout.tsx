import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRADSFASHION | Handcrafted Bags & Ankara Fashion',
  description: 'Discover PRADSFASHION’s handcrafted bags and Ankara-print pieces, made by Angel Anifowoshe.',
  metadataBase: new URL('https://prads-fashion.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prads-fashion.com',
    title: 'PRADSFASHION | Handcrafted Bags & Ankara Fashion',
    description: 'Discover PRADSFASHION’s handcrafted bags and Ankara-print pieces.',
    images: [
      {
        url: '/products/flap-bag-rainbow-stripe.webp',
        width: 1200,
        height: 1200,
        alt: 'PRADSFASHION handcrafted rainbow stripe flap bag',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-brand-white text-brand-black antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
