<template>
  <div class="container_createComp">
    <!-- <h1>Add Competition</h1> -->
    <form id="createFlexBox" v-on:submit.prevent="checkForm(name)">
      <div id="createName">
        <label for="createName">Competition Name</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <input type="submit" value="Create Competition" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateComp",
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    this.setForm();
  },
  methods: {
    setForm() {
      this.name = "";
    },
    checkForm(name) {
      if(!document.getElementById("createFlexBox").checkValidity()) return;
      this.$emit('create-comp', name);
      this.setForm();
    }
  }
};
</script>
