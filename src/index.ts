import type { App, ComponentPublicInstance } from 'vue';
import { computed, getCurrentInstance, inject } from 'vue';
import debugModule from 'debug';
import DialogManager from './dialog_manager';
import type { Router } from 'vue-router';

declare module 'vue-router' {
  interface Router {
    dialogManager: DialogManager;
    goBack: () => boolean;
  }
}

interface EnhancedRouterOptions {
  router: Router;
  debug: boolean;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $enhancedRouter: EnhancedRouter;
  }
}

const logger = debugModule('enhanced-router:EnhancedRouter');

class EnhancedRouter {
  private readonly router: Router;
  public readonly dialogManager: DialogManager;

  constructor(options: EnhancedRouterOptions) {
    this.router = options.router;
    this.dialogManager = new DialogManager(this.router);

    this.router.goBack = this.dialogManager.back.bind(this);
    this.router.dialogManager = this.dialogManager;
  }

  install(app: App) {
    app.config.globalProperties.$enhancedRouter = this;
    app.provide('$enhancedRouter', this);
  }
}

export function makeShowFlag(name: string) {
  const inst = getCurrentInstance();

  return (inst != null)
    ? makeShowFlagComposition(name)
    : makeShowFlagOptions(name);
}

function makeShowFlagOptions(name: string) {
  return {
    get(this: ComponentPublicInstance) {
      const dialogId = `${name}_${this.$.uid}`;
      return this.$enhancedRouter.dialogManager.isExist(dialogId);
    },
    set(this: ComponentPublicInstance, value: boolean) {
      const dialogId = `${name}_${this.$.uid}`;

      if (value) {
        this.$enhancedRouter.dialogManager.showDialog(dialogId);
      } else {
        this.$enhancedRouter.dialogManager.closeDialog(dialogId);
      }
    }
  };
}

function makeShowFlagComposition(name: string) {
  const inst = getCurrentInstance()!;
  const enhancedRouter = inject<EnhancedRouter>('$enhancedRouter');

  return computed({
    get() {
      const dialogId = `${name}_${inst.uid}`;
      return enhancedRouter!.dialogManager.isExist(dialogId);
    },
    set(value: boolean) {
      const dialogId = `${name}_${inst.uid}`;

      if (value) {
        enhancedRouter!.dialogManager.showDialog(dialogId);
      } else {
        enhancedRouter!.dialogManager.closeDialog(dialogId);
      }
    },
  })
}

export default {
  install(app: App, options: EnhancedRouterOptions) {
    logger('Plugin install');

    const enhancedRouter = new EnhancedRouter(options);
    enhancedRouter.install(app);
  }
};
