<template>
  <div class="container_comp">
    {{ `${comp.createdAt.getDate()}/${comp.createdAt.getMonth()}/${comp.createdAt.getFullYear()}` }}
    <p class="name">{{ comp.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Comp',
  props: ["comp"]
}
</script>