/**
 * plugins/enhanced_router.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import EnhancedRouter from 'enhanced-router';

export function registerPlugins (app) {
  loadFonts().then(() => {});
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(EnhancedRouter, { router, debug: true })
}
