<template>
  <div class="container_comps">
    <div
      class="comp"
      v-for="(comp) in comps"
      v-bind:key="comp._id"
      v-on:dblclick="deleteComp(comp._id)"
    >
      <Comp v-bind:comp="comp" />
    </div>
    <CreateComp v-on:create-comp="createComp" />
  </div>
</template>

<script>
import CompService from '../CompService.js'
import Comp from './Comp_Component.vue'
import CreateComp from './CreateComp_Component.vue'

export default {
  name: 'Comps',
  components: {
    Comp,
    CreateComp
  },
  data() {
    return {
      comps: [],
      error: ''
    }
  },
  async created() {
    try {
      this.comps = await CompService.getComps();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createComp(name) {
      await CompService.createComp(name);
      this.comps = await CompService.getComps();
    },
    async deleteComp(id) {
      await CompService.deleteComp(id);
      this.comps = await CompService.getComps();
    }
  }
}
</script>