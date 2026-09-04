import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Shop | PRADSFASHION',
  description: 'Browse our complete collection of premium fashion. Filter by category, price, and more.',
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Page Header */}
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shop Collection</h1>
            <p className="text-brand-gray-600">Discover premium fashion for every style</p>
          </div>
        </div>

        {/* Shop Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-brand-cream p-6 rounded-lg sticky top-24">
                <h3 className="font-bold text-lg mb-6">Filter</h3>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Category</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          defaultChecked={category === 'All'}
                        />
                        <span className="ml-3 text-sm group-hover:text-brand-gold transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Price</h4>
                  <div className="space-y-3">
                    {['Under $50', '$50 - $100', '$100 - $200', '$200+'].map((range) => (
                      <label key={range} className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span className="ml-3 text-sm group-hover:text-brand-gold transition-colors">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Availability</h4>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                    <span className="ml-3 text-sm group-hover:text-brand-gold transition-colors">
                      In Stock
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-4">
              {/* Sort Options */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <p className="text-sm text-brand-gray-600 mb-4 sm:mb-0">
                  Showing {products.length} products
                </p>
                <select className="w-full sm:w-auto px-4 py-2 border border-brand-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rated</option>
                </select>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="primary">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
