'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Search } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const PRICE_RANGES = [
  { label: 'Under $50', test: (price: number) => price < 50 },
  { label: '$50 - $100', test: (price: number) => price >= 50 && price <= 100 },
  { label: '$100 - $200', test: (price: number) => price > 100 && price <= 200 },
  { label: '$200+', test: (price: number) => price > 200 },
];

export default function ShopPageClient() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>('featured');

  const toggleRange = (label: string) => {
    setSelectedRanges((prev) =>
      prev.includes(label) ? prev.filter((r) => r !== label) : [...prev, label]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesStock = !inStockOnly || product.inStock;
      const matchesPrice =
        selectedRanges.length === 0 ||
        (product.price !== null &&
          selectedRanges.some((label) => PRICE_RANGES.find((r) => r.label === label)?.test(product.price as number)));

      return matchesCategory && matchesSearch && matchesStock && matchesPrice;
    });

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, selectedCategory, selectedRanges, inStockOnly, sort]);

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
              <div className="bg-brand-cream p-6 lg:sticky lg:top-24">
                <h3 className="font-bold text-lg mb-6">Filter</h3>

                {/* Search */}
                <div className="mb-8">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Search</h4>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500" />
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-9 pr-3 py-2 border border-brand-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Category</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          className="w-4 h-4"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
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
                    {PRICE_RANGES.map((range) => (
                      <label key={range.label} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          checked={selectedRanges.includes(range.label)}
                          onChange={() => toggleRange(range.label)}
                        />
                        <span className="ml-3 text-sm group-hover:text-brand-gold transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">Availability</h4>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <span className="ml-3 text-sm group-hover:text-brand-gold transition-colors">
                      In Stock Only
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
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full sm:w-auto px-4 py-2 border border-brand-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-brand-cream">
                  <p className="text-brand-gray-600">No products match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
