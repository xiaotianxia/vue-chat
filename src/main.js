import Vue from 'vue'
import App from './App'
import router from './router'
import '@/utils/windowResize'
import '@/style/main.less'

Vue.config.productionTip = false;

window.socket = IO.connect("ws://127.0.0.1:7000");

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
