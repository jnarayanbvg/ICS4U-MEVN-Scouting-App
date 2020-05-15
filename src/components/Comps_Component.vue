<template>
  <div class="container_comps">
    <div
      class="comp"
      v-for="(comp) in comps"
      v-bind:key="comp._id"
      v-on:dblclick="$emit('delete-comp', comp._id)"
    >
      <Comp v-bind:comp="comp" />
    </div>
  </div>
</template>

<script>
import Comp from './Comp_Component.vue'

export default {
  name: 'Comps',
  components: {
    Comp
  },
  props: ["comps"]
}
</script>