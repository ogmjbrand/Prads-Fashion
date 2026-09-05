import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-brand-white text-brand-black antialiased">
        {children}
      </body>
    </html>
  );
}
