<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Home />
  </div>
</template>

<script>
import Home from './components/Home_Component.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import "./assets/css/style.css";
</style>
