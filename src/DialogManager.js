import { reactive } from 'vue';

export default class DialogManager {
  /**
   * @param router - Router
   */
  constructor({ router }) {
    this.dlgStack = [];
    this.dlgInfo = reactive(new Map());
    this.router = router;
    this.prePosition = -1;

    this.setRouterGuard();
  }

  setRouterGuard() {
    this.router.beforeEach((to, from, next) => {
      const history = this.router.options.history;

      console.log(
        'Router beforEach in library',
        this.prePosition,
        history.state.position,
        to.fullPath,
        from.fullPath,
      );

      const isBack = (this.prePosition > history.state.position);

      if (isBack) {
        if (this.isEmptyDialog()) {
          next();
        } else {
          this.popDialog();
          console.log('popDialog');
          next(false);
        }
      } else {
        this.cleanupDialog();
        next();
      }
    });

    this.router.afterEach((to, from, failure) => {
      const history = this.router.options.history;

      console.log(
        'Router afterEach in library',
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
    return (this.dlgStack.length === 0)
  }

  back() {
    let canGoBack = false;
    const history = this.router.options.history;

    if (history.state.back != null) {
      this.router.back();
      canGoBack = true;
    } else if (!this.isEmptyDialog()) {
      this.popDialog();
      canGoBack = true;
    }

    return canGoBack;
  }
}
