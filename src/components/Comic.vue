<template>
  <!-- <div> -->
    <img :src="src">
  <!-- </div> -->
</template>

<script>
import { format, isSunday } from 'date-fns'
export default {
  name: 'PhantomComic',
  computed: {
    src () {
      const date = this.$store.state.displayDate
      const yyyy = format(date, 'yyyy')
      const MM = format(date, 'MM')
      const dd = format(date, 'dd')
      const frag = isSunday(date) ? '_hs' : ''
      const file = `http://safr.kingfeatures.com/ThePhantom/${yyyy}/${MM}/Phantom${frag}.${yyyy}${MM}${dd}_1440.gif`
      return `https://safr.kingfeatures.com/idn/ck3/content.php?file=${btoa(file)}`
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
    background: url('/spinner.gif') top no-repeat;
    max-height: 100%;
    max-width: 100%;
    opacity: 0.1;
  }
</style>
