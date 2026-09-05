'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { products } from '@/data/products';
import { formatPrice, generateWhatsAppMessage, generateWhatsAppLink } from '@/utils/formatting';
import { BRAND } from '@/utils/constants';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Heart } from 'lucide-react';
import { Product } from '@/types/product';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [mainImage, setMainImage] = useState(product.image);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage(
      [{ name: product.name, quantity, price: product.price, size: selectedSize, color: selectedColor }],
      (product.price ?? 0) * quantity
    );
    const link = generateWhatsAppLink(message, BRAND.whatsapp);
    window.open(link, '_blank');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-2 text-sm text-brand-gray-600">
            <Link href="/" className="hover:text-brand-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-black">
              Shop
            </Link>
            <span>/</span>
            <span className="text-brand-black font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {product.isSample && (
            <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-brand-gray-600 bg-brand-cream border border-brand-gray-200 rounded px-3 py-2 inline-block">
              Sample product for demonstration — not confirmed inventory
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="order-2 lg:order-1">
              {/* Main Image */}
              <div className="relative mb-4 bg-brand-cream rounded-lg overflow-hidden aspect-square">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative bg-brand-cream rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                      mainImage === image ? 'border-brand-gold' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="order-1 lg:order-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-brand-gray-600 uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
                  </div>
                  <button className="p-2 hover:bg-brand-cream rounded-full transition-colors" aria-label="Save to wishlist">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            i < Math.round(product.rating!) ? 'text-brand-gold' : 'text-brand-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-brand-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-brand-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Availability */}
                <p className={`text-sm font-semibold mb-6 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                </p>
              </div>

              {/* Description */}
              <p className="text-brand-gray-700 mb-8 leading-relaxed">{product.description}</p>

              {/* Selection Options */}
              <div className="mb-8">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3">Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded border-2 text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-brand-gold bg-brand-cream'
                              : 'border-brand-gray-300 hover:border-brand-gold'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3">Color</label>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`py-2 px-4 rounded border-2 text-sm font-medium transition-all ${
                            selectedColor === color
                              ? 'border-brand-gold bg-brand-cream'
                              : 'border-brand-gray-300 hover:border-brand-gold'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Quantity</label>
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-brand-gray-300 rounded hover:bg-brand-cream transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-brand-gray-300 rounded hover:bg-brand-cream transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {isAddedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={handleWhatsAppOrder}
                    disabled={!product.inStock}
                  >
                    Order via WhatsApp
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Why Choose This Item</h3>
                <ul className="space-y-2 text-sm text-brand-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-3">✓</span>
                    <span>Premium quality materials and expert craftsmanship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-3">✓</span>
                    <span>Versatile design that works for multiple occasions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-3">✓</span>
                    <span>Carefully tested for durability and comfort</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-3">✓</span>
                    <span>Fast, secure shipping with tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-brand-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="cursor-pointer group block">
                    <div className="relative mb-4 bg-brand-white rounded-lg overflow-hidden aspect-square">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-brand-gold transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold">{formatPrice(relatedProduct.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
