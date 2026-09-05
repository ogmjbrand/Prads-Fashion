/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          white: '#fafafa',
          gold: '#b8935a',
          cream: '#f5f1ea',
          gray: {
            50: '#f7f7f6',
            100: '#efeeec',
            200: '#e0ddd8',
            300: '#c7c2ba',
            400: '#a49c8f',
            500: '#847a6d',
            600: '#665e53',
            700: '#4d4740',
            800: '#332f2a',
            900: '#1a1815',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
