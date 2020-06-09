<template>
  <div class="container_main">
    <p id="mainTitle">Hi, Welcome to the 2019 FRC Deep Space Scouting App!</p>
    <p id="mainSub">From here, you can view add all your team's season competition and record and manage all your team's scouting data!</p>
    <Comps v-bind:comps="comps" v-on:delete-comp="deleteComp" v-on:update-comp="updateComp" id="mainComps" :key="comps.length" /> <!-- The key will force a rerendering every time a comp is deleted/added -- fixes the roudned edges glitching out -->
    <CreateComp v-on:create-comp="createComp" id="mainCreateComps" />
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
      comps: []
    }
  },
  async created() {
    try {
      this.comps = await CompService.getComps();
    } catch(err) {
      alert("Error: " + err.message);
    }

    console.log(this.comps);
  },
  methods: {
    async createComp(name) {
      await CompService.createComp(name);
      this.comps = await CompService.getComps();
    },
    async updateComp(id, name) {
      await CompService.updateComp(id, name);
      this.comps = await CompService.getComps();
    },
    async deleteComp(id) {
      await CompService.deleteComp(id);
      this.comps = await CompService.getComps();
    }
  }
}
</script>