import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {
  getYear, setYear, getMonth, setMonth, getDate, setDate, addDays, min
} from 'date-fns'
Vue.use(Vuex)

const displayDate = new Date()
const today = new Date(displayDate)
const makeGetter = fn => state => fn(state.displayDate)
const makeMutation = fn => (state, val) => {
  state.displayDate = min([state.today, fn(state.displayDate, val)])
}
export default new Vue({
  el: 'main',
  render: h => h(App),
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
