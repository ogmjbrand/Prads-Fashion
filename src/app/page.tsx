import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import HeroSceneClient from '@/components/HeroSceneClient';
import BlobHero from '@/components/BlobHero';
import { getProducts } from '@/lib/products';
import { BRAND, SOCIAL_MEDIA } from '@/utils/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PRADSFASHION | Handcrafted Bags & Ankara Fashion',
  description: 'Discover PRADSFASHION’s handcrafted bags and Ankara-print pieces, made by Angel Anifowoshe.',
  openGraph: {
    title: 'PRADSFASHION | Handcrafted Bags & Ankara Fashion',
    description: 'Discover PRADSFASHION’s handcrafted bags and Ankara-print pieces.',
    images: [{ url: '/products/flap-bag-rainbow-stripe.webp', width: 1200, height: 1200 }],
  },
};

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.slice(0, 3);

  const shopCategories = Array.from(new Set(products.map((p) => p.category))).map((name) => ({
    name,
    image: products.find((p) => p.category === name)?.image ?? '',
  }));

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Hero Section */}
        <section className="relative bg-brand-black text-brand-white overflow-hidden">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <HeroSceneClient />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text */}
              <div className="order-2 lg:order-1">
                <div className="mb-4 inline-block">
                  <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">
                    Welcome to PRADSFASHION
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Elevate Your <span className="text-brand-gold">Style</span>
                </h1>
                
                <p className="text-lg text-brand-gray-300 mb-8 leading-relaxed">
                  Handcrafted bags and Ankara-print fashion, made by Angel Anifowoshe for the confident individual.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop">
                    <Button variant="secondary" size="lg" className="text-center w-full">
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/shop#featured">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-center w-full border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-brand-gray-700">
                  <div>
                    <div className="text-2xl font-bold text-brand-gold">Handcrafted</div>
                    <p className="text-xs text-brand-gray-400">Made with care</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-gold">WhatsApp</div>
                    <p className="text-xs text-brand-gray-400">Direct ordering support</p>
                  </div>
                </div>
              </div>

              {/* Hero Product Showcase */}
              <div className="order-1 lg:order-2">
                <BlobHero products={featuredProducts} />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="featured">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Collection</h2>
              <p className="text-brand-gray-600">Curated pieces for the modern wardrobe</p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            stagger={0.08}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollReveal>

          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="bg-brand-cream py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Shop by Category</h2>
                <p className="text-brand-gray-600">Find exactly what you&apos;re looking for</p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
              {shopCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group overflow-hidden block"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/50 transition-colors flex items-center justify-center">
                      <span className="text-brand-white text-lg font-bold">{category.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Best Sellers</h2>
              <p className="text-brand-gray-600">Customer favorites and most loved pieces</p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            stagger={0.08}
          >
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollReveal>
        </section>

        {/* Why PRADSFASHION */}
        <section className="bg-brand-black text-brand-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Why Choose PRADSFASHION</h2>
                <p className="text-brand-gray-300">Dedicated to quality, style, and your satisfaction</p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
              {[
                {
                  title: 'Premium Quality',
                  description: 'Carefully selected fabrics and expert craftsmanship in every piece.',
                },
                {
                  title: 'Easy Ordering',
                  description: 'Simple, secure shopping experience from browsing to checkout.',
                },
                {
                  title: 'Customer Focused',
                  description: 'Reach us directly via WhatsApp or email with questions before and after you order.',
                },
                {
                  title: 'Secure & Convenient',
                  description: 'Multiple payment options and safe, straightforward transactions.',
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-brand-gold text-brand-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-brand-gray-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Customer Reviews</h2>
              <p className="text-brand-gray-600">What our customers are saying</p>
            </div>

            <div className="bg-brand-cream p-10 text-center max-w-2xl mx-auto">
              <p className="text-brand-gray-700 leading-relaxed">
                We&apos;re just getting started — customer reviews will appear here as PRADSFASHION
                grows. Shopped with us already? Share your experience via WhatsApp and we may
                feature it.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Instagram Feed (Social Proof) */}
        <section className="bg-brand-cream py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Follow Us</h2>
              <p className="text-brand-gray-600 mb-6">Join our community on social media</p>

              <div className="flex justify-center space-x-4 sm:space-x-6">
                <a
                  href={SOCIAL_MEDIA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-black text-brand-white px-6 py-3 rounded font-semibold hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_MEDIA.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-black text-brand-white px-6 py-3 rounded font-semibold hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>

            {/* Social Grid Placeholder */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-brand-gray-300 aspect-square" />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-black text-brand-white py-16 sm:py-20">
          <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" as="div">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Elevate Your Wardrobe?</h2>
            <p className="text-brand-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our collection and discover premium fashion pieces that speak to your individual style.
            </p>
            <Link href="/shop">
              <Button variant="secondary" size="lg">
                Start Shopping Now
              </Button>
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
