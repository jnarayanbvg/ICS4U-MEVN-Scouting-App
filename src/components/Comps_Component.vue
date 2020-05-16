<template>
  <div class="container_comps">
    <table id="compsTable">
      <thead>
        <th class="compsHead" id="long">Competition Name</th>
        <th class="compsHead">Dates</th>
        <th class="compsHead">Teams</th>
        <th class="compsHead">Scouting</th>
        <th class="compsHead">Delete</th>
      </thead>
      <tr class="compsRow" v-for="comp in comps" v-bind:key="comp._id"
        v-on:dblclick="$emit('delete-comp', comp._id)">
        <td class="compsCell">{{ comp.name }}</td>
        <td class="compsCell">{{ getDate(comp.start) }}<br><br>{{ getDate(comp.end) }}</td>
        <td class="compsCell">Teams</td>
        <td class="compsCell">Scout Match</td>
        <td class="compsCell">Delete</td>
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