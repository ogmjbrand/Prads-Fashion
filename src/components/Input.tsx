import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-[0.1em] mb-2 text-brand-gray-600">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-transparent border-b border-brand-gray-300 focus:outline-none focus:border-brand-gold transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
