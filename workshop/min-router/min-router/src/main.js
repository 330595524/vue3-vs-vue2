import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// router  动态引入
// import vueMsg from "./plugins/index.js";

Vue.config.productionTip = false;
// Vue.use(vueMsg);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
