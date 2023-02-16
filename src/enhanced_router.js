import DialogManager from './DialogManager';

export default {
  install(app, { router }) {
    app.config.globalProperties.$erouter = {
      dialogManager: new DialogManager({ router }),
    }
  }
}
