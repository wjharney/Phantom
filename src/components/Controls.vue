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
import { differenceInWeeks, getYear, isSameDay } from 'date-fns'
import { mapState } from 'vuex'
const makeMethod = val => function () {
  return this.$store.commit('increment', val)
}
const makeComputed = (prop, displayOffset = 0) => ({
  get () {
    return this.$store.getters[prop] + displayOffset
  },
  set (val) {
    return this.$store.commit(prop, val - displayOffset)
  }
})
export default {
  name: 'PhantomControls',
  computed: {
    ...mapState({
      isToday: state => isSameDay(state.today, state.displayDate),
      isThisWeek: state => !differenceInWeeks(state.today, state.displayDate),
      maxYear: state => getYear(state.today)
    }),
    year: makeComputed('year'),
    month: makeComputed('month', 1),
    date: makeComputed('date')
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
