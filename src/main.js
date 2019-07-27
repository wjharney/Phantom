import Vue from 'vue'
import router from './router'
import store from './store'
export default window.app = new Vue({
  router, store
}).$mount('router-view')
