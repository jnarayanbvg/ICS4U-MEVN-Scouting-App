<!-- App Component - Main User SPA Screen -->

<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view> <!-- Key allows for reloading when user is routed to same component with varied parameters (i.e. match 1 to match 2) -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/style.css";
</style>
