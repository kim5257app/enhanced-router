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
import { createEnhancedRouter } from '../../../dist/enhanced-router';

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(createEnhancedRouter({ router, debug: true }))
}
