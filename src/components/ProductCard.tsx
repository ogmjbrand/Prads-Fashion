import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/utils/formatting';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative mb-4 bg-brand-cream overflow-hidden aspect-square shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {product.originalPrice && product.price !== null && (
            <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center">
              <span className="text-brand-white text-xs font-semibold uppercase tracking-[0.15em]">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-gray-500 mb-1.5">
            {product.category}
          </p>
          <h3 className="text-sm sm:text-base font-medium mb-2 group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.rating!) ? 'fill-brand-gold text-brand-gold' : 'text-brand-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-brand-gray-500">({product.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-brand-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
