import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import {
  getYear, setYear, getMonth, setMonth, getDate, setDate, addDays, min, format
} from 'date-fns'
import router from './router'

Vue.use(Vuex)

const makeGetter = fn => state => fn(state.displayDate)
const makeMutation = fn => (state, val) => {
  state.displayDate = min([state.today, fn(state.displayDate, val)])
}
const makeAction = mut => ({ commit, state }, val) => {
  commit(mut, val)
  router.push({ query: { d: format(state.displayDate, 'yyyy-MM-dd') } })
}

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
    const state = { today }
    const DISPLAY = 'displayDate'
    const queryDate = getQueryDate(location.search, 'd')
    if (queryDate) {
      state[DISPLAY] = queryDate
      return state
    }
    const storedDate = getStorageDate(localStorage, 'lastSeen')
    if (storedDate) {
      // Display the date after the last seen one, unless it's today
      state[DISPLAY] = min([today, addDays(storedDate, 1)])
      return state
    }
    state[DISPLAY] = today
    return state
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
  },
  actions: {
    year: makeAction('year'),
    month: makeAction('month'),
    date: makeAction('date'),
    increment: makeAction('increment')
  }
})
