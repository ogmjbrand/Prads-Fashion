'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { formatPrice } from '@/utils/formatting';
import { Product } from '@/types/product';

const BLOB_PATH =
  'M45.3,-58.4C58.4,-49.6,68.4,-34.7,72.7,-18.2C77,-1.7,75.6,16.4,68.1,31.4C60.6,46.4,47,58.3,31.5,64.6C16,70.9,-1.4,71.6,-18.1,67.2C-34.8,62.8,-50.8,53.3,-61.2,39.5C-71.6,25.7,-76.4,7.6,-73.9,-9.2C-71.4,-26,-61.6,-41.5,-48.2,-50.6C-34.8,-59.7,-17.4,-62.4,0.5,-63C18.4,-63.6,36.8,-62.1,45.3,-58.4Z';

const BLOB_COLORS = ['#b8935a', '#6b2333', '#4a3826', '#2b3a4a'];

const AUTO_ADVANCE_MS = 5000;

interface BlobHeroProps {
  products: Product[];
}

export default function BlobHero({ products }: BlobHeroProps) {
  const [index, setIndex] = useState(0);
  const blobRef = useRef<SVGPathElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const product = products[index];
  const color = BLOB_COLORS[index % BLOB_COLORS.length];

  const goTo = (next: number) => {
    setIndex(((next % products.length) + products.length) % products.length);
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [products.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (blobRef.current) {
      gsap.to(blobRef.current, { fill: color, duration: prefersReducedMotion ? 0 : 0.6, ease: 'power2.out' });
    }
    if (imageWrapRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 0.92, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    if (textRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [index, color]);

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/5]">
      {/* Blob background */}
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path ref={blobRef} d={BLOB_PATH} fill={color} />
      </svg>

      {/* Product cutout */}
      <div
        ref={imageWrapRef}
        key={product.id}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[75%] max-w-xs aspect-[3/4] drop-shadow-2xl pointer-events-none"
      >
        <Image
          src={product.cutoutImage ?? product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 60vw, 300px"
          className="object-contain object-bottom select-none"
        />
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous product"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-brand-white/80 hover:bg-brand-white text-brand-black rounded-full p-2 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next product"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-white/80 hover:bg-brand-white text-brand-black rounded-full p-2 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Text + CTA */}
      <div ref={textRef} className="absolute top-6 left-6 right-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-brand-white leading-tight drop-shadow-md">
          {product.name}
        </h2>
        <p className="text-brand-white/90 font-semibold mt-1">{formatPrice(product.price)}</p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 bg-brand-white text-brand-black text-sm font-semibold rounded-full px-5 py-3 text-center hover:bg-brand-cream transition-colors shadow-lg"
        >
          View Product
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-label={`Show ${p.name}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-brand-gold' : 'w-2 bg-brand-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
