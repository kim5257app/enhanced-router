import { reactive } from 'vue';
import debugModule from 'debug';

const debug = debugModule('enhanced-router:DialogManager');

export default class DialogManager {
  /**
   * @param router - Router
   */
  constructor({ router }) {
    this.dlgStack = [];
    this.dlgInfo = reactive(new Map());
    this.router = router;
    this.prePosition = -1;
    this.seq = 0;

    this.setRouterGuard();
  }

  setRouterGuard() {
    this.router.beforeEachEx((to, from, next) => {
      const { state } = this.router.options.history;

      debug(
        'Router beforeEach: prePosition(%s), position(%s), to(%s), from(%s)',
        this.prePosition,
        state.position,
        to.fullPath,
        from.fullPath,
      );

      const isBack = (this.prePosition > state.position);

      if (isBack) {
        if (this.isEmptyDialog()) {
          next();
        } else {
          this.popDialog();
          debug(`popDialog: ${this.dlgStack.length}`);
          next(false);
        }
      } else {
        this.cleanupDialog();
        next();
      }
    });

    this.router.afterEach((to, from, failure) => {
      const { history } = this.router.options;

      debug(
        'Router afterEach - location(%s), back(%s), cur(%s), forward(%s), position(%s)',
        history.location,
        history.state.back,
        history.state.current,
        history.state.forward,
        history.state.position,
      );

      if (failure == null) {
        this.prePosition = history.state.position;
      }
    });
  }

  getDialogName() {
    this.seq += 1;
    return `dlg_${this.seq}`;
  }

  showDialog(name) {
    this.dlgInfo.set(name, true);
    this.dlgStack.push(name);
  }

  closeDialog(name) {
    const idx = this.dlgStack.findIndex((item) => (item === name));

    if (idx >= 0) {
      this.dlgStack.splice(idx, 1);
      this.dlgInfo.delete(name);
    }
  }

  popDialog() {
    const item = this.dlgStack.pop();

    if (item != null) {
      this.dlgInfo.delete(item);
    }
  }

  cleanupDialog() {
    this.dlgStack = [];
    this.dlgInfo.clear();
  }

  isEmptyDialog() {
    return (this.dlgStack.length === 0);
  }

  back() {
    let canGoBack = false;
    const { back } = window.history.state;

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
