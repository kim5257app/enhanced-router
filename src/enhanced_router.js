import DialogManager from './DialogManager';

class EnhancedRouter {
  constructor({ router }) {
    this.router = router;
  }

  install(app) {
    app.config.globalProperties.$erouter = {
      dialogManager: new DialogManager({ router: this.router }),
    }
  }
}

export function createEnhancedRouter(opts) {
  return new EnhancedRouter(opts);
}
