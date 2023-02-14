import DialogManager from './DialogManager';

export default {
  install(app, { router }) {
    app.config.globalProperties.$erouter = {
      dialogManager: new DialogManager(),
    }

    router.beforeEach((to, from) => {
      console.log('Router beforEach in library', to, from);
    });
  }
}
