'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...props
  },
  forwardedRef
) {
  const innerRef = useRef<HTMLButtonElement | null>(null);

  const setRefs = (node: HTMLButtonElement | null) => {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const baseClasses =
    'font-semibold uppercase tracking-[0.12em] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-brand-black text-brand-white hover:bg-brand-gray-800',
    secondary: 'bg-brand-gold text-brand-black hover:bg-brand-black hover:text-brand-white',
    outline: 'border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-[11px]',
    md: 'px-7 py-3.5 text-xs',
    lg: 'px-9 py-4 text-sm',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (innerRef.current) gsap.to(innerRef.current, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
    onMouseEnter?.(e);
  };
  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (innerRef.current) gsap.to(innerRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
    onMouseLeave?.(e);
  };
  const handleMouseDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (innerRef.current) gsap.to(innerRef.current, { scale: 0.97, duration: 0.1, ease: 'power2.out' });
    onMouseDown?.(e);
  };
  const handleMouseUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (innerRef.current) gsap.to(innerRef.current, { scale: 1.03, duration: 0.15, ease: 'power2.out' });
    onMouseUp?.(e);
  };

  return (
    <button
      ref={setRefs}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
