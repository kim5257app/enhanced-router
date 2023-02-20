import debugModule from 'debug';

import DialogManager from './DialogManager';

const logger = debugModule('enhanced-router');

class EnhancedRouter {
  constructor({ router, debug }) {
    this.router = router;

    if (debug) {
      debugModule.enable('enhanced-router:*');
    }
  }

  install(app) {
    logger('Plugin install');

    app.config.globalProperties.$erouter = {
      dialogManager: new DialogManager({ router: this.router }),
    };
  }
}

export function createEnhancedRouter(opts) {
  return new EnhancedRouter(opts);
}

export default {};
