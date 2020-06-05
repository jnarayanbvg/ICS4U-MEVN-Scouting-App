<template>
  <div class="container_createComp">
    <!-- <h1>Add Competition</h1> -->
    <form id="createFlexBox" v-on:submit.prevent="checkForm(name, start, end)">
      <div id="createName">
        <label for="createName">Competition Name</label>
        <input type="text" v-model="name" required />
      </div>
      <div id="createStart">
        <label for="createStart">Start Date</label>
        <input type="date" v-model="start" required />
      </div>
      <div id="createEnd">
        <label for="createEnd">End Date</label>
        <input type="date" v-model="end" required />
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
      name: "",
      start: "",
      end: "",
    };
  },
  mounted() {
    this.setForm();
  },
  methods: {
    setForm() {
      this.name = "";
      //Set the default date values
      let date = new Date();
      let month =
        date.getMonth() < 9 //Month is always offset by 1, so January is 0
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let string = `${date.getFullYear()}-${month}-${day}`;
      this.start = string;
      this.end = string;
    },
    checkForm(name, start, end) {
      if(!document.getElementById("createFlexBox").checkValidity()) return;
      this.$emit('create-comp', name, start, end);
      this.setForm();
    }
  }
};
</script>
