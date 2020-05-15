<template>
  <div class="container_comps">
    <table id="compsTable">
      <thead>
        <th class="compsHead">Competition Name</th>
        <th class="compsHead">Start Date</th>
        <th class="compsHead">End Date</th>
      </thead>
      <tr class="compsRow" v-for="comp in comps" v-bind:key="comp._id"
        v-on:dblclick="$emit('delete-comp', comp._id)">
        <td class="compsCell">{{ comp.name }}</td>
        <td class="compsCell">{{ getDate(comp.start) }}</td>
        <td class="compsCell">{{ getDate(comp.end) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Comps",
    props: ["comps"],
    methods: {
      getDate(date) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      }
    }
  };
</script>