import Link from 'next/link';
import { BRAND, SOCIAL_MEDIA } from '@/utils/constants';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-lg font-bold mb-4">
              <span className="text-brand-gold">PRADS</span>FASHION
            </div>
            <p className="text-brand-gray-400 text-sm">
              Premium fashion for the confident individual.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=blazers" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  Blazers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dresses" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-brand-gray-400 hover:text-brand-white text-sm">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                className="flex items-center space-x-2 text-brand-gray-400 hover:text-brand-gold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{BRAND.whatsapp}</span>
              </a>
              <a
                href="mailto:contact@pradsfashion.com"
                className="flex items-center space-x-2 text-brand-gray-400 hover:text-brand-gold text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-gray-800 pt-8 mt-8">
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href={SOCIAL_MEDIA.instagram}
              className="text-brand-gray-400 hover:text-brand-gold transition-colors"
              aria-label="Instagram"
            >
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a
              href={SOCIAL_MEDIA.tiktok}
              className="text-brand-gray-400 hover:text-brand-gold transition-colors"
              aria-label="TikTok"
            >
              <span className="text-sm font-medium">TikTok</span>
            </a>
            <a
              href={SOCIAL_MEDIA.facebook}
              className="text-brand-gray-400 hover:text-brand-gold transition-colors"
              aria-label="Facebook"
            >
              <span className="text-sm font-medium">Facebook</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-brand-gray-500 text-xs">
            <p>&copy; {currentYear} {BRAND.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
