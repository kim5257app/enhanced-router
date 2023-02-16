import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

console.log('resolve:', resolve('src/enhanced_router.js'));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        'enhanced-router': resolve('src/enhanced_router.js'),
        'mixin-dialog-support': resolve('src/mixin_dialog_support.js'),
      },
      name: 'EnhancedRouter',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
