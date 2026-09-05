import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-brand-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 py-24">
          <h1 className="text-6xl font-bold mb-4 text-brand-gold">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-brand-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
