import Vue from 'vue'
import App from './App'
import router from './router'
import '@/utils/windowResize'
import '@/style/main.less'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
