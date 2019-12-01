<template>
  <main>
    <phantom-controls></phantom-controls>
    <phantom-comic></phantom-comic>
  </main>
</template>

<script>
import PhantomComic from './Comic'
import PhantomControls from './Controls'
export default {
  name: 'App',
  components: {
    PhantomComic,
    PhantomControls
  }
}
</script>

<style>
  html, body, main {
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: column nowrap;
  }
  main {
    box-sizing: border-box;
    padding: 10px;
    background: beige;
  }
</style>
