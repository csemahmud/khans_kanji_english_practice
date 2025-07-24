/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'kanji-texture': "url('/pattern.svg')",
      },
      fontSize: {
        'fluid-xl': 'clamp(1rem, 5vw, 2rem)',
      },
    },
  },
  plugins: [],
};

