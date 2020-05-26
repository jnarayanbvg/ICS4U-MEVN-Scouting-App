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
      <tr class="compsRow" v-for="comp in comps" v-bind:key="comp._id">
        <td class="compsCell">{{ comp.name }}</td>
        <td class="compsCell">
          {{ getDate(comp.start) }} &mdash; {{ getDate(comp.end) }}
        </td>
        <td class="compsCell">Teams</td>
        <td class="compsCell"><router-link :to="{ name: 'scouting', params: { competition: comp._id }}">Scout Match</router-link></td>
        <td class="compsCell compsCellDelete" v-on:click="$emit('delete-comp', comp._id)">Delete</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Comps",
    props: ["comps"],
    methods: {
      getDate(val) {
        let date = (""+val.getDate()).padStart(2,'0');
        let month = (""+val.getMonth()).padStart(2,'0');
        let year = (""+val.getFullYear()).padStart(2,'0');
        return `${date}/${month}/${year}`;
      }
    }
  };
</script>