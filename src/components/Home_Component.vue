<template>
  <div class="container_home">
    <div class="row">
      <Comps v-bind:comps="comps" v-on:delete-comp="deleteComp" id="homeComps"/>
      <CreateComp v-on:create-comp="createComp" id="homeCreateComps" />
    </div>
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
    async createComp(name, start, end) {
      await CompService.createComp(name, start, end);
      this.comps = await CompService.getComps();
    },
    async deleteComp(id) {
      await CompService.deleteComp(id);
      this.comps = await CompService.getComps();
    }
  }
}
</script>