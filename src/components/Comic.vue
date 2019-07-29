<template>
  <!-- <div> -->
    <img :src="src">
  <!-- </div> -->
</template>

<script>
import { format, isSunday } from 'date-fns'
const SPINNER = '/spinner.gif'
export default {
  name: 'PhantomComic',
  data: () => ({
    src: SPINNER
  }),
  computed: {
    url () {
      const date = this.$store.state.displayDate
      const yyyy = format(date, 'yyyy')
      const MM = format(date, 'MM')
      const dd = format(date, 'dd')
      const frag = isSunday(date) ? '_hs' : ''
      const file = `http://safr.kingfeatures.com/ThePhantom/${yyyy}/${MM}/Phantom${frag}.${yyyy}${MM}${dd}_1440.gif`
      return `https://safr.kingfeatures.com/idn/ck3/content.php?file=${btoa(file)}`
    }
  },
  watch: {
    url: {
      immediate: true,
      handler (val) {
        this.src = SPINNER
        const img = new Image()
        img.addEventListener('load', () => {
          this.src = val
        }, { once: true })
        img.src = val
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
