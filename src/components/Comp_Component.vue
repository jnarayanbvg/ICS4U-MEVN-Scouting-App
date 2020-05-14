<template>
  <div class="container" v-on:wheel="$emit('test-event', comp.name)">
    {{ `${comp.createdAt.getDate()}/${comp.createdAt.getMonth()}/${comp.createdAt.getFullYear()}` }}
    <p class="name">{{ comp.name }}_{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'Comp',
  props: ["comp", "text"]
}
</script>