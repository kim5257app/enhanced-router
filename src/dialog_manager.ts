import debugModule from 'debug';
import type { Router } from 'vue-router';
import { ref } from 'vue';

const logger = debugModule('enhanced-router:DialogManager');

class DialogManager {
  private readonly router: Router;

  private dlgStack: any[] = [];
  private dlgInfo = ref(new Map<string, boolean>());
  private prePosition = -1;

  constructor(router: Router) {
    this.router = router;

    this.setRouterGuard();
  }

  private setRouterGuard() {
    this.router.beforeEach((to, from, next) => {
      const { state } = this.router.options.history;

      logger(
        'Router beforeEach: prePosition(%s), position(%s), to(%s), from(%s)',
        this.prePosition,
        state.position,
        to.fullPath,
        from.fullPath,
      );

      const isBack = (this.prePosition > (state.position as number));

      if (isBack) {
        if (this.isEmptyDialog()) {
          next();
        } else {
          this.popDialog();
          logger(`popDialog: ${this.dlgStack.length}`);

          next(false);
        }
      } else {
        this.cleanupDialog();
        next();
      }
    });

    this.router.afterEach((to, from, failure) => {
      const { history } = this.router.options;

      logger(
        'Router afterEach - location(%s), back(%s), cur(%s), forward(%s), position(%s)',
        history.location,
        history.state.back,
        history.state.current,
        history.state.forward,
        history.state.position,
      );

      if (failure == null) {
        this.prePosition = (history.state.position as number);
      }
    });
  }

  showDialog(name: string) {
    this.dlgInfo.value.set(name, true);
    this.dlgStack.push(name);
  }

  closeDialog(name: string) {
    const idx = this.dlgStack.findIndex((item) => (item === name));

    if (idx >= 0) {
      this.dlgStack.splice(idx, 1);
      this.dlgInfo.value.delete(name);
    }
  }

  private popDialog() {
    const item = this.dlgStack.pop();

    if (item != null) {
      this.dlgInfo.value.delete(item);
    }
  }

  private cleanupDialog() {
    this.dlgStack = [];
    this.dlgInfo.value.clear();
  }

  private isEmptyDialog() {
    return (this.dlgStack.length === 0);
  }

  isExist(name: string) {
    return (this.dlgInfo.value.get(name) != null);
  }

  back() {
    let canGoBack = false;

    const { back } = window.history.state;

    logger('back:', back);

    if (back != null) {
      this.router.back();
      canGoBack = true;
    } else if (!this.isEmptyDialog()) {
      this.popDialog();
      canGoBack = true;
    }

    return canGoBack;
  }
}

export {
  DialogManager
};

export default DialogManager;
