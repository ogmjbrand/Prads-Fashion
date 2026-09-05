import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Policies | PRADSFASHION',
  description: 'Shipping, returns, privacy, and terms policies for PRADSFASHION.',
};

function PlaceholderNotice() {
  return (
    <p className="text-sm bg-brand-cream border border-brand-gray-200 px-4 py-3 text-brand-gray-600">
      This section is a placeholder. Final policy details will be supplied by {BRAND.owner} and
      published here before the store accepts real orders.
    </p>
  );
}

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-white">
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Store Policies</h1>
            <p className="text-brand-gray-600">Shipping, returns, privacy, and terms of use.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-16">
          <section id="shipping">
            <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
            <PlaceholderNotice />
          </section>

          <section id="returns">
            <h2 className="text-2xl font-bold mb-4">Returns &amp; Refunds</h2>
            <PlaceholderNotice />
          </section>

          <section id="privacy">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <PlaceholderNotice />
            <p className="text-brand-gray-600 mt-4 text-sm">
              In general, information submitted through this site (such as contact or order
              details) is used only to fulfil your enquiry or order and is not sold to third
              parties.
            </p>
          </section>

          <section id="terms">
            <h2 className="text-2xl font-bold mb-4">Terms &amp; Conditions</h2>
            <PlaceholderNotice />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Questions?</h2>
            <p className="text-brand-gray-600">
              For anything not covered here, message us on WhatsApp at{' '}
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                className="text-brand-gold font-semibold"
              >
                {BRAND.whatsapp}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
