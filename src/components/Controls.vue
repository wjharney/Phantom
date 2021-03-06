<template>
  <h1>
    <span class="small button" @click="prevWeek">&#9668;</span>
    <span class="button" @click="prev">&#9668;</span>
    <input class="wide" type="number" v-model="year" :max="maxYear" step="1">
    <span class="sep">–</span>
    <input type="number" v-model="month" min="0" max="13" step="1">
    <span class="sep">–</span>
    <input type="number" v-model="date" min="0" max="32" step="1">
    <span class="button" :class="{disabled: isToday}" @click="next">&#9658;</span>
    <span class="small button" :class="{disabled: isThisWeek}" @click="nextWeek">&#9658;</span>
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
  created () {
    window.addEventListener('keyup', this.onKeyUp)
  },
  destroyed () {
    window.removeEventListener('keyup', this.onKeyUp)
  },
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
    nextWeek: makeMethod(7),
    onKeyUp (evt) {
      switch (evt.key) {
        case 'ArrowLeft': return this.prev()
        case 'ArrowRight': return this.next()
      }
    }
  }
}
</script>

<style scoped>
h1 {
  user-select: none;
  align-items: center;
  border-bottom: 2px ridge gray;
  margin-top: 0;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.sep {
  font-size: 1.5em;
  margin: 0 0.5ex;
}

input {
  border: none;
  font-size: 2em;
  text-align: center;
  width: 1.5em;
  background-color: inherit;
}

.wide {
  width: 3em;
}

.hidden {
  display: none;
}

.button {
  font-size: 1.3em;
  cursor: pointer;
}

.button.disabled {
  cursor: default;
}
.button.disabled, .button.disabled:hover {
  color: #bbb;
}
.button:hover, input:focus {
  color: #888;
}

.small {
  font-size: 0.7em;
}
</style>
