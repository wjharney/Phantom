import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App.vue'
import {
  getYear, setYear, getMonth, setMonth, getDate, setDate, addDays, min
} from 'date-fns'
Vue.use(Router)
Vue.use(Vuex)

const displayDate = new Date()
const today = new Date(displayDate)
const makeGetter = fn => state => fn(state.displayDate)
const makeMutation = fn => (state, val) => {
  state.displayDate = min([state.today, fn(state.displayDate, val)])
}
export default window.app = new Vue({
  el: 'router-view',
  router: new Router({
    mode: 'history',
    routes: [{ path: '/', component: App }],
    parseQuery (str = '') {
      const parsed = Object.fromEntries(new URLSearchParams(str))
      if (parsed.hasOwnProperty('date') && isNaN(new Date(parsed.date))) {
        delete parsed.date
      }
      return parsed
    },
    stringifyQuery (obj) {
      const entries = Object.entries(obj)
      return entries.length ? '?' + new URLSearchParams(entries) : ''
    }
  }),
  store: new Vuex.Store({
    state: {
      displayDate,
      today
    },
    getters: {
      year: makeGetter(getYear),
      month: makeGetter(getMonth),
      date: makeGetter(getDate)
    },
    mutations: {
      year: makeMutation(setYear),
      month: makeMutation(setMonth),
      date: makeMutation(setDate),
      increment: makeMutation(addDays)
    }
  })
})
