import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import {
  getYear, setYear, getMonth, setMonth, getDate, setDate, addDays, min, parse
} from 'date-fns'

Vue.use(Vuex)

const makeGetter = fn => state => fn(state.displayDate)
const makeMutation = fn => (state, val) => {
  state.displayDate = min([state.today, fn(state.displayDate, val)])
}
const getDateFromQuery = (query, prop) => {
  if (!query) return null
  const str = new URLSearchParams(query).get(prop)
  if (!str) return null
  const date = new Date(str)
  return isNaN(date) ? null : date
}

const getDateFromStorage = (storage, prop) => {
  const stored = storage.getItem(prop)
  if (!stored) return null
  const date = parse(parseInt(stored, 10))
  return isNaN(date) ? null : date
}

export default new Store({
  state () {
    const today = new Date()
    const queryDate = getDateFromQuery(location.search, 'd')
    const storedDate = getDateFromStorage(localStorage, 'lastSeen')
    const displayDate = queryDate || storedDate || today
    return { today, queryDate, storedDate, displayDate }
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
