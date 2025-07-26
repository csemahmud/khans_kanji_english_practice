// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/khans_kanji_english_practice/',  // Required for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias @ → src
    },
  },
  server: {
    port: 3020
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-libs': ['framer-motion', 'sweetalert2', 'xlsx'],
          // add more libraries as needed
        }
      }
    },
    chunkSizeWarningLimit: 1000, // default is 500 (in KB)
  }
});
