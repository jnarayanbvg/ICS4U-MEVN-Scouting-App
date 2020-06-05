<template>
  <div class="container_comps">
    <table id="compsTable">
      <thead>
        <th class="compsHead" id="long">Competition Name</th>
        <th class="compsHead">Teams</th>
        <th class="compsHead">Scouting</th>
        <th class="compsHead">Delete</th>
      </thead>
      <tr class="compsRow" v-for="comp in comps" v-bind:key="comp._id">
        <td class="compsCell">{{ comp.name }}</td>
        <td class="compsCell"><router-link :to="{ name: 'teams', params: { competition: comp._id }}">Teams</router-link></td>
        <td class="compsCell"><router-link :to="{ name: 'scouting', params: { competition: comp._id }}">Scout Match</router-link></td>
        <td class="compsCell compsCellDelete" v-on:click="$emit('delete-comp', comp._id)">Delete</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Comps",
    props: ["comps"]
  };
</script>