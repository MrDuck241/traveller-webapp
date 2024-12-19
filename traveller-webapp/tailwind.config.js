/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-hover': '0 8px 20px rgba(0, 0, 0, 0.5)', // Dodaj niestandardowy cień
      },
      screens: {
        'h-sm': { 'raw': '(min-height: 500px)' },
        'h-md': { 'raw': '(min-height: 768px)' }, // Przykład breakpointu na wysokość
        'h-lg': { 'raw': '(min-height: 1024px)' },
      },
    },
  },
  plugins: [
    aspectRatio, // Wtyczka Aspect Ratio
  ],
};
