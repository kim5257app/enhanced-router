import { reactive } from 'vue';

export default class DialogManager {
  constructor() {
    this.dlgStack = [];
    this.dlgInfo = reactive(new Map());
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
}
