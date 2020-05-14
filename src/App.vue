<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Comps />
  </div>
</template>

<script>
import Comps from './components/Comps_Component.vue'

export default {
  name: 'App',
  components: {
    Comps
  }
}
</script>

<style>
@import "./assets/css/style.css";
</style>
