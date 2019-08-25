<template>
  <h1>
    <span class="button" @click="prevWeek">«</span>
    <span class="button" @click="prev">&lt;</span>
    <input class="wide" type="number" v-model="year" :max="maxYear" step="1">
    <span>–</span>
    <input type="number" v-model="month" min="0" max="13" step="1">
    <span>–</span>
    <input type="number" v-model="date" min="0" max="32" step="1">
    <span class="button" @click="next" :disabled="isToday">&gt;</span>
    <span class="button" @click="nextWeek" :disabled="isThisWeek">»</span>
  </h1>
</template>

<script>
import {
  getYear, getMonth, getDate, setYear, setMonth, setDate, isSameDay, isBefore,
  addDays, differenceInWeeks, min
} from 'date-fns'
import { mapState } from 'vuex'
const UPDATE = 'updateDisplay'
const makeMethod = val => function () {
  const { displayDate, today } = this.$store.state
  const changed = addDays(displayDate, val)
  if (isBefore(changed, today)) {
    this.$store.dispatch(UPDATE, changed)
  }
}
const makeComputed = (getter, setter, displayOffset = 0) => ({
  get (...args) {
    return getter(this.$store.state.displayDate) + displayOffset
  },
  set (val, ...args) {
    const { displayDate, today } = this.$store.state
    const changed = setter(displayDate, val - displayOffset)
    const chosen = min([changed, today])
    this.$store.dispatch(UPDATE, chosen)
  }
})
export default {
  name: 'PhantomControls',
  computed: {
    year: makeComputed(getYear, setYear),
    month: makeComputed(getMonth, setMonth, 1),
    date: makeComputed(getDate, setDate),
    ...mapState({
      isToday: state => isSameDay(state.today, state.displayDate),
      isThisWeek: state => !differenceInWeeks(state.today, state.displayDate),
      maxYear: state => getYear(state.today)
    })
  },
  methods: {
    prev: makeMethod(-1),
    next: makeMethod(1),
    prevWeek: makeMethod(-7),
    nextWeek: makeMethod(7)
  }
}
</script>

<style scoped>
h1 {
  -moz-user-select: none;
  user-select: none;
  align-items: center;
  border-bottom: 2px ridge gray;
  display: flex;
  justify-content: center;
}

span {
  font-size: 1.5em;
  margin: 0 0.5ex;
}

input {
  border: none;
  font-size: 2em;
  text-align: center;
  width: 1.5em;
  background: #f5f5f5;
}

.wide {
  width: 3em;
}

.hidden {
  display: none;
}

.button:hover, input:focus {
  color: #777;
}
</style>
