export function makeShowFlag(name) {
  return {
    get() {
      return this.$erouter.dialogManager.dlgInfo.get(name) != null;
    },
    set(value) {
      if (this[name] !== value) {
        if (value) {
          this.$erouter.dialogManager.showDialog(name);
        } else {
          this.$erouter.dialogManager.closeDialog(name);
        }
      }
    },
  };
}
