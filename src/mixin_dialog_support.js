let seq = 0;

export function makeShowFlag(name) {
  let dlgName;

  if (name != null) {
    dlgName = name;
  } else {
    dlgName = `dlg_${seq}`;
    seq += 1;
  }

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
