import DialogManager from './DialogManager';

export default {
  install(app) {
    app.config.globalProperties.$erouter = {
      dialogManager: new DialogManager(),
    }
  }
}
