<template>
  <div class="container_createComp">
    <label for="createComp">Add a Competition</label>
    <input type="text" v-model='name' placeholder="New Competition" />
    <button v-on:click="$emit('create-comp', name);">Create!</button>
  </div>
</template>

<script>
export default {
  name: 'CreateComp',
  data() {
    return {
      name: ''
    }
  }
}
</script>