<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <CompComponent/>
  </div>
</template>

<script>
import CompComponent from './components/CompComponent.vue'

export default {
  name: 'App',
  components: {
    CompComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
