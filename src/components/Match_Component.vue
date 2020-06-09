<template>
  <p>Hello</p>
</template>

<script>

export default {
  name: 'Match',
  props: ['match'],
  data() {
    return {
      keyRender: 0 //Variable that will force the match table row to rerender upon a change
    }
  },
  methods: {
  }
};
</script>