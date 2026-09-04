import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { BRAND, SOCIAL_MEDIA } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'PRADSFASHION | Premium Fashion for the Confident Individual',
  description: 'Discover premium, elegant fashion. Shop our collection of blazers, trousers, denim, and accessories.',
  openGraph: {
    title: 'PRADSFASHION | Premium Fashion',
    description: 'Discover premium, elegant fashion.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Hero Section */}
        <section className="relative bg-brand-black text-brand-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
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
                  Premium fashion for the confident individual. Discover curated collections designed for quality, elegance, and timeless sophistication.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-center"
                    onClick={() => window.location.href = '/shop'}
                  >
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-center border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
                    onClick={() => window.location.href = '/shop#featured'}
                  >
                    Explore Collection
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-brand-gray-700">
                  <div>
                    <div className="text-2xl font-bold text-brand-gold">100%</div>
                    <p className="text-xs text-brand-gray-400">Quality Assured</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-gold">48hrs</div>
                    <p className="text-xs text-brand-gray-400">Fast Dispatch</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-gold">24/7</div>
                    <p className="text-xs text-brand-gray-400">Customer Support</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1556821552-5a63fe0ae5e9?w=600&q=80"
                  alt="Premium Fashion"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="featured">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Collection</h2>
            <p className="text-brand-gray-600">Curated pieces for the modern wardrobe</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/shop'}
            >
              View All Products
            </Button>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="bg-brand-cream py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-brand-gray-600">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Blazers', image: 'https://images.unsplash.com/photo-1591047990857-e627b92f94d3?w=400&q=80' },
                { name: 'Trousers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' },
                { name: 'Knitwear', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
                { name: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => window.location.href = `/shop?category=${category.name.toLowerCase()}`}
                  className="group overflow-hidden rounded-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/50 transition-colors flex items-center justify-center">
                      <span className="text-brand-white text-lg font-bold">{category.name}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-brand-gray-600">Customer favorites and most loved pieces</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why PRADSFASHION */}
        <section className="bg-brand-black text-brand-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Why Choose PRADSFASHION</h2>
              <p className="text-brand-gray-300">Dedicated to quality, style, and your satisfaction</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  description: 'Dedicated support available 24/7 via WhatsApp and email.',
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
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Customer Reviews</h2>
            <p className="text-brand-gray-600">What our customers are saying</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                text: 'The quality is exceptional. Every piece feels premium and the fit is perfect. Highly recommend!',
                rating: 5,
              },
              {
                name: 'James K.',
                text: 'Fast shipping and beautiful packaging. Customer service was incredibly helpful.',
                rating: 5,
              },
              {
                name: 'Emma L.',
                text: 'Finally found a fashion brand that understands quality and style. Will definitely order again.',
                rating: 5,
              },
            ].map((review, index) => (
              <div key={index} className="bg-brand-cream p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-brand-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-brand-gray-700 mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-semibold text-brand-black">{review.name}</p>
              </div>
            ))}
          </div>
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
                <div key={i} className="bg-brand-gray-300 aspect-square rounded-lg" />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-black text-brand-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Elevate Your Wardrobe?</h2>
            <p className="text-brand-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our collection and discover premium fashion pieces that speak to your individual style.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/shop'}
            >
              Start Shopping Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
