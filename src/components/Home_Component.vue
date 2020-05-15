<template>
  <div class="container_home">
    <h1>Your Newest FRC Competitions</h1>
    <hr />
    <Comps v-bind:comps="comps" v-on:delete-comp="deleteComp" />
    <CreateComp v-on:create-comp="createComp" />
  </div>
</template>

<script>
import CompService from '../CompService.js'
import Comps from './Comps_Component.vue'
import CreateComp from './CreateComp_Component.vue'

export default {
  name: 'Home',
  components: {
    Comps,
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