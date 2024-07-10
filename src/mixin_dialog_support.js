export function makeShowFlag(name) {
  return {
    get() {
      const dlgId = `${name}_${this.$.uid}`;
      return this.$erouter.dialogManager.dlgInfo.get(dlgId) != null;
    },
    set(value) {
      const dlgId = `${name}_${this.$.uid}`;

      if (this[dlgId] !== value) {
        if (value) {
          this.$erouter.dialogManager.showDialog(dlgId);
        } else {
          this.$erouter.dialogManager.closeDialog(dlgId);
        }
      }
    },
  };
}

export default {};
