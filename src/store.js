import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import {
  addDays, format, isSameDay, min
} from 'date-fns'
import router from './router'
Vue.use(Vuex)

const getQueryDate = (query, prop) => {
  if (!query) return null
  const str = new URLSearchParams(query).get(prop)
  if (!str) return null
  const date = new Date(str)
  return isNaN(date) ? null : date
}
const getStorageDate = (storage, prop) => {
  const stored = storage.getItem(prop)
  if (!stored) return null
  const date = new Date(parseInt(stored, 10))
  return isNaN(date) ? null : date
}
const setStorageDate = (storage, prop) => {
  let prev = +getStorageDate(storage, prop)
  return store => store.subscribe(() => {
    const curr = +store.state.displayDate
    if (curr > prev) {
      storage.setItem(prop, curr)
      prev = curr
    }
  })
}

export default new Store({
  plugins: [setStorageDate(localStorage, 'lastSeen')],
  state () {
    const today = new Date()
    const state = { today, loading: false }
    const queryDate = getQueryDate(location.search, 'd')
    const setDisplayDate = val => {
      state.displayDate = min([today, val])
      return state
    }
    if (queryDate) {
      return setDisplayDate(queryDate)
    }
    const storedDate = getStorageDate(localStorage, 'lastSeen')
    if (storedDate) {
      // Display the date after the last seen one, unless it's today
      return setDisplayDate(addDays(storedDate, 1))
    }
    return setDisplayDate(today)
  },
  mutations: {
    changeDate (state, date) {
      state.displayDate = date
    }
  },
  actions: {
    updateDisplay ({ commit, state }, date) {
      commit('changeDate', date)
      if (isSameDay(date, state.today)) {
        router.push({ query: {} })
      } else {
        router.push({ query: { d: format(date, 'yyyy-MM-dd') } })
      }
    }
  }
})
