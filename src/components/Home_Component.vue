<template>
  <div class="container_home">
    <h1>Your Newest FRC Competitions</h1>
    <hr />
    <Comps />
  </div>
</template>

<script>
import Comps from './Comps_Component.vue'

export default {
  name: 'Home',
  components: {
    Comps
  }
}
</script>