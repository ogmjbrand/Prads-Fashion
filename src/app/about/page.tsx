import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { BRAND } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'About | PRADSFASHION',
  description: 'The story behind PRADSFASHION, founded by Angel Anifowoshe.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Hero */}
        <div className="bg-brand-black text-brand-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About PRADSFASHION</h1>
            <p className="text-brand-gray-300 text-lg">
              Handcrafted fashion for the confident individual
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-brand-gray-700 leading-relaxed mb-4">
              PRADSFASHION is a premium fashion brand founded by <strong>Angel Anifowoshe</strong>. 
              Our mission is to create handcrafted pieces that celebrate quality, elegance, and 
              individual style.
            </p>
            <p className="text-lg text-brand-gray-700 leading-relaxed mb-4">
              Each piece in our collection is carefully designed and crafted with attention to detail, 
              using premium materials and expert techniques. We believe that fashion should be accessible 
              without compromising on quality or style.
            </p>
            <p className="text-lg text-brand-gray-700 leading-relaxed">
              From our unique striped woven handbags to carefully curated accessories, every PRADSFASHION 
              item tells a story of craftsmanship and passion.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-brand-gray-600">
                We use only premium materials and expert craftsmanship in every piece.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Style</h3>
              <p className="text-brand-gray-600">
                Fashion that&apos;s confident, elegant, and uniquely yours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Service</h3>
              <p className="text-brand-gray-600">
                Dedicated support and seamless shopping experience, every time.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-brand-cream p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-brand-gray-700 mb-6">
              Have questions? We&apos;d love to hear from you. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full">WhatsApp: {BRAND.whatsapp}</Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
