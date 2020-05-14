<template>
  <div class="container">
    <h1>Your Newest FRC Competitions</h1>
    <div class="createComp">
      <label for="createComp">Add a Competition</label>
      <input type="text" v-model="name" placeholder="New Competition" />
      <button v-on:click="createComp">Create!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="compsContainer">
      <div
        class="comp"
        v-for="(comp) in comps"
        v-bind:key="comp._id"
        v-on:dblclick="deleteComp(comp._id)"
      >
        <Comp v-bind:comp="comp" v-bind:text="name" v-on:test-event="testEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import Comp from './Comp_Component.vue'

export default {
  name: 'Comps',
  components: {
    Comp
  },
  data() {
    return {
      comps: [],
      error: '', //unnecessary for FRC?
      name: '' //To get the name of a new competition
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
    async createComp() {
      await CompService.createComp(this.name);
      this.comps = await CompService.getComps();
    },
    async deleteComp(id) {
      await CompService.deleteComp(id);
      this.comps = await CompService.getComps();
    },
    testEvent(data) {
      alert("Test event from " + data);
    }
  }
}
</script>