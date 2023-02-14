import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from 'pathe';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        'enhanced-router': resolve(__dirname, 'src/index.js'),
        'mixin-dialog-support': resolve(__dirname, 'src/mixin_dialog_support.js'),
      },
      name: 'EnhancedRouter',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'vue',
        'vuetify',
      ],
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
