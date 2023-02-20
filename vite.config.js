import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'EnhancedRouter',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          debug: 'debug',
        },
      },
      external: [
        'vue',
        'debug',
      ],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
