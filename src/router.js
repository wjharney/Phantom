import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{ path: '/', component: App }],
  parseQuery (str = '') {
    const parsed = Object.fromEntries(new URLSearchParams(str))
    if (parsed.hasOwnProperty('d') && isNaN(new Date(parsed.d))) {
      delete parsed.d
    }
    return parsed
  },
  stringifyQuery (obj) {
    const entries = Object.entries(obj)
    return entries.length ? '?' + new URLSearchParams(entries) : ''
  }
})
