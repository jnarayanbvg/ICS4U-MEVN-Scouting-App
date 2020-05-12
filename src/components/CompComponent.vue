<template>
  <div class="container">
    <h1>Your Newest FRC Competitions</h1>
    <div class="createComp">
      <label for="createComp">Add a Competition</label>
      <input type="text" id="createComp:text" v-model="name" placeholder="New Competition">
      <button v-on:click="createComp">Create!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="compsContainer">
      <div class="comp" v-for="(comp) in comps" v-bind:key="comp._id" v-on:dblclick="deleteComp(comp._id)">
          {{ `${comp.createdAt.getDate()}/${comp.createdAt.getMonth()}/${comp.createdAt.getFullYear()}` }}
          <p class="name">{{ comp.name }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'

export default {
  name: 'CompComponent',
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
    }
  }
}
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.comp {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.createdAt {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
