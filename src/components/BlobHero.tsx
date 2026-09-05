'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { formatPrice } from '@/utils/formatting';
import { Product } from '@/types/product';

const BLOB_PATH =
  'M45.3,-58.4C58.4,-49.6,68.4,-34.7,72.7,-18.2C77,-1.7,75.6,16.4,68.1,31.4C60.6,46.4,47,58.3,31.5,64.6C16,70.9,-1.4,71.6,-18.1,67.2C-34.8,62.8,-50.8,53.3,-61.2,39.5C-71.6,25.7,-76.4,7.6,-73.9,-9.2C-71.4,-26,-61.6,-41.5,-48.2,-50.6C-34.8,-59.7,-17.4,-62.4,0.5,-63C18.4,-63.6,36.8,-62.1,45.3,-58.4Z';

const BLOB_COLORS = [
  { deep: '#8a6a3c', mid: '#b8935a', light: '#d9bd8c' },
  { deep: '#4a1c26', mid: '#6b2333', light: '#93414f' },
  { deep: '#2e2116', mid: '#4a3826', light: '#6d5842' },
  { deep: '#161d26', mid: '#2b3a4a', light: '#455a6e' },
];

const AUTO_ADVANCE_MS = 5500;

interface BlobHeroProps {
  products: Product[];
}

export default function BlobHero({ products }: BlobHeroProps) {
  const [index, setIndex] = useState(0);
  const stopDeepRef = useRef<SVGStopElement>(null);
  const stopMidRef = useRef<SVGStopElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const product = products[index];
  const palette = BLOB_COLORS[index % BLOB_COLORS.length];

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
    const dur = prefersReducedMotion ? 0 : 0.7;

    if (stopDeepRef.current) gsap.to(stopDeepRef.current, { attr: { 'stop-color': palette.deep }, duration: dur, ease: 'power2.out' });
    if (stopMidRef.current) gsap.to(stopMidRef.current, { attr: { 'stop-color': palette.mid }, duration: dur, ease: 'power2.out' });
    if (glowRef.current) gsap.to(glowRef.current, { fill: palette.light, duration: dur, ease: 'power2.out' });

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
  }, [index, palette]);

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/5]">
      {/* Ambient glow */}
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full scale-110 blur-3xl opacity-40" preserveAspectRatio="xMidYMid slice">
        <path ref={glowRef} d={BLOB_PATH} fill={palette.light} />
      </svg>

      {/* Blob background */}
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="blobGradient" cx="35%" cy="30%" r="80%">
            <stop ref={stopMidRef} offset="0%" stopColor={palette.mid} />
            <stop ref={stopDeepRef} offset="100%" stopColor={palette.deep} />
          </radialGradient>
        </defs>
        <path d={BLOB_PATH} fill="url(#blobGradient)" />
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
          priority={index === 0}
          sizes="(max-width: 1024px) 60vw, 300px"
          className="object-contain object-bottom select-none"
        />
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous product"
        className="absolute left-3 top-1/2 -translate-y-1/2 border border-brand-white/40 bg-brand-black/10 backdrop-blur-sm hover:bg-brand-white hover:text-brand-black text-brand-white rounded-full p-2.5 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next product"
        className="absolute right-3 top-1/2 -translate-y-1/2 border border-brand-white/40 bg-brand-black/10 backdrop-blur-sm hover:bg-brand-white hover:text-brand-black text-brand-white rounded-full p-2.5 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Text + CTA */}
      <div ref={textRef} className="absolute top-7 left-7 right-7">
        <p className="text-brand-gold text-[10px] font-semibold uppercase tracking-[0.25em] mb-2">
          Featured Piece
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-white leading-[1.1] drop-shadow-md">
          {product.name}
        </h2>
        <p className="text-brand-white/85 text-sm mt-2 tracking-wide">{formatPrice(product.price)}</p>
      </div>

      <div className="absolute bottom-7 left-7 right-7">
        <Link
          href={`/product/${product.id}`}
          className="group/cta flex items-center justify-center gap-2 bg-brand-white text-brand-black text-xs font-semibold uppercase tracking-[0.15em] px-5 py-3.5 text-center hover:bg-brand-cream transition-colors shadow-lg"
        >
          View Product
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-label={`Show ${p.name}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-7 bg-brand-gold' : 'w-1.5 bg-brand-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
