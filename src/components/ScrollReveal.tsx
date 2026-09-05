'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay (seconds) applied to direct children instead of animating this element as one block. */
  stagger?: number;
  y?: number;
  delay?: number;
  as?: 'div' | 'section';
}

export default function ScrollReveal({
  children,
  className = '',
  stagger,
  y = 32,
  delay = 0,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
