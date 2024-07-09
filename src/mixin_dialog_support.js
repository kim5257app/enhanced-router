export function makeShowFlag(name) {
  const dlgName = (name != null)
    ? name : this.$erouter.dialogManager.getDialogName();

  return {
    get() {
      return this.$erouter.dialogManager.dlgInfo.get(dlgName) != null;
    },
    set(value) {
      if (this[name] !== value) {
        if (value) {
          this.$erouter.dialogManager.showDialog(dlgName);
        } else {
          this.$erouter.dialogManager.closeDialog(dlgName);
        }
      }
    },
  };
}

export default {};
