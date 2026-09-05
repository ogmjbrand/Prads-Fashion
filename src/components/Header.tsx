'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { gsap } from '@/lib/gsap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { count, isHydrated } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(count);

  useEffect(() => {
    if (isHydrated && count > prevCount.current && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 1.6 },
        { scale: 1, duration: 0.4, ease: 'back.out(3)' }
      );
    }
    prevCount.current = count;
  }, [count, isHydrated]);

  return (
    <header className="sticky top-0 z-50 bg-brand-white border-b border-brand-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-brand-gold">PRADS</span>
              <span className="text-brand-black">FASHION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link
              href="/cart"
              className="relative text-brand-black hover:text-brand-gold transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {isHydrated && count > 0 && (
                <span
                  ref={badgeRef}
                  className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-brand-black"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-brand-gray-200">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                href="/shop"
                className="block px-3 py-2 text-sm font-medium hover:bg-brand-cream rounded"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium hover:bg-brand-cream rounded"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium hover:bg-brand-cream rounded"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
