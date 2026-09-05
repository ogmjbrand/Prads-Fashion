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
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative mb-4 bg-brand-cream overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.originalPrice && product.price !== null && (
            <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 rounded text-xs font-bold">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-brand-black/30 flex items-center justify-center">
              <span className="text-brand-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-2 group-hover:text-brand-gold transition-colors">
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
            <span className="text-base sm:text-lg font-bold">
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
