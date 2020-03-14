<template>
  <div>
    <img :src="src">
    <!-- Preload prev/next images for smoother experience -->
    <link rel="preload" as="image" :href="prev" crossorigin="anonymous">
    <link rel="preload" as="image" :href="next" crossorigin="anonymous">
  </div>
</template>

<script>
import { addDays, format, isSunday } from 'date-fns'
function computedComicUrl (offsetDays) {
  return function comicUrl () {
    const date = addDays(this.$store.state.displayDate, offsetDays)
    const yyyy = format(date, 'yyyy')
    const MM = format(date, 'MM')
    const dd = format(date, 'dd')
    const frag = isSunday(date) ? '_hs' : ''
    const file = `ThePhantom/${yyyy}/${MM}/Phantom${frag}.${yyyy}${MM}${dd}_1536.gif`
    return `https://safr.kingfeatures.com/api/img.php?s=c&file=${btoa(file)}`
  }
}
const SPINNER = '/spinner.gif'
export default {
  name: 'PhantomComic',
  data: () => ({
    src: SPINNER
  }),
  computed: {
    prev: computedComicUrl(-1),
    url: computedComicUrl(0),
    next: computedComicUrl(1)
  },
  watch: {
    url: {
      immediate: true,
      handler (val) {
        this.src = SPINNER
        const img = new Image()
        img.src = val
        img.addEventListener('load', () => {
          this.src = val
        }, { once: true })
      }
    }
  }
}
</script>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    /* flex: 1 1 auto; */
    max-height: 100%;
    max-width: 100%;
    opacity: 0.1;
  }
</style>
