<template>
  <main>
    <phantom-controls></phantom-controls>
    <phantom-comic></phantom-comic>
  </main>
</template>

<script>
import PhantomComic from './components/Comic'
import PhantomControls from './components/Controls'
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
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
  main {
    background: beige;
  }
</style>
