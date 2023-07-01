import debugModule from 'debug';

import DialogManager from './DialogManager';

const logger = debugModule('enhanced-router:EnhancedRouter');

class EnhancedRouter {
  constructor({ router, debug }) {
    this.router = router;

    // Guard Set
    this.beforeEachSet = new Set();

    this.extend();

    if (debug) {
      debugModule.enable('enhanced-router:*');
    }
  }

  extend() {
    this.router.beforeEach((to, from, next) => {
      let flag = true;

      this.beforeEachSet.forEach((fn) => {
        fn(to, from, (fnFlag) => {
          flag = flag && (fnFlag == null);
        });
      });

      next(flag);
    });

    this.router.beforeEachEx = (fn) => {
      this.beforeEachSet.add(fn);
    };
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
