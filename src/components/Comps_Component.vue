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
          {{ getDate(comp.start) }} to<br>{{ getDate(comp.end) }}
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
        // let date = (""+val.getDate()).padStart(2,'0');
        // let month = (""+val.getMonth()).padStart(2,'0');
        // let year = (""+val.getFullYear()).padStart(2,'0');

        let month;
        switch(val.getMonth()) { //Month is offset by 1 backwards, so 0 is January
          case 0: month = "Jan."; break;
          case 1: month = "Feb."; break;
          case 2: month = "Mar."; break;
          case 3: month = "Apr."; break;
          case 4: month = "May"; break;
          case 5: month = "Jun."; break;
          case 6: month = "Jul."; break;
          case 7: month = "Aug."; break;
          case 8: month = "Sep."; break;
          case 9: month = "Oct."; break;
          case 10: month = "Nov."; break;
          default: month = "Dec."; break;
        }
        let day = val.getDate();
        switch((day+1) % 10) { //Day is offset by 1 backwards, so 0 is the 1st
          case 1: day += "st"; break;
          case 2: day += "nd"; break;
          case 3: day += "rd"; break;
          default: day += "th"; break;
        }

        return `${month} ${day} ${val.getFullYear()}`;
      }
    }
  };
</script>