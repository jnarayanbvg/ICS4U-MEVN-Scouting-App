<template>
  <div class="container_createComp">
    <h1>Add Competition</h1>
    <div id="createFlexBox">
      <div>
        <label for="createName">Competition Name</label>
        <input type="text" id="createName" v-model="name" />
      </div>
      <div>
        <label for="createStart">Start Date</label>
        <input type="date" id="createStart" v-model="start" />
      </div>
      <div>
        <label for="createEnd">End Date</label>
        <input type="date" id="createEnd" v-model="end" />
      </div>
    </div>
    <button v-on:click="$emit('create-comp', name, start, end)">Create Competition</button>
  </div>
</template>

<script>
export default {
  name: "CreateComp",
  data() {
    return {
      name: "",
      start: "",
      end: ""
    };
  },
  mounted() {
    //Set the default date values
    let date = new Date();
    let month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let string = `${date.getFullYear()}-${month}-${day}`;
    this.start = string;
    this.end = string;
  },
};
</script>
