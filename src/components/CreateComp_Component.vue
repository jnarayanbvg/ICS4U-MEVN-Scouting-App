<template>
  <div class="container_createComp">
    <p>Add Competition</p>
    <div id="createFlexBox">
      <div>
        <label for="createName">Competition Name</label>
        <input type="text" id="createName">
      </div>
      <div>
        <label for="createStart">Start Date</label>
        <input type="date" id="createStart">
      </div>
      <div>
        <label for="createEnd">End Date</label>
        <input type="date" id="createEnd">
      </div>
    </div>
    <button v-on:click="$emit('create-comp', name);">Create Competition</button>
  </div>
</template>

<script>
export default {
  name: 'CreateComp',
  data() {
    return {
      name: '',
      start: '',
      end: ''
    }
  },
  mounted() {
    //Set the default date values
    let date = new Date();
    let month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let string = `${date.getFullYear()}-${month}-${day}`;
    document.getElementById('createStart').defaultValue = string;
    document.getElementById('createEnd').defaultValue = string;
  }
}
</script>