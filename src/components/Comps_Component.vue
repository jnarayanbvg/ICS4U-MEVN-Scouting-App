<!-- Comps Component - List all competition and determines update and delete events -->

<template>
  <div class="container_comps">
    <table id="compsTable">
      <thead>
        <th class="compsHead" id="long">Competition Name</th>
        <th class="compsHead">Teams</th>
        <th class="compsHead">Scouting</th>
        <th class="compsHead">Delete</th>
      </thead>
      <tbody>
        <tr class="compsRow" v-for="comp in comps" :key="comp._id + keyRender">
          <!-- keyRender forces component reloading upon update event - must have key use a v-for-defined variable AND a variable controlled by me to force updates -->
          <!-- This chunk handles the competition name displaying and updating -->
          <td class="compsCell compName" :id="`compName-${comp._id}`">
            <div
              :id="`compNameShow-${comp._id}`"
              class="compNameShow"
              v-on:click="switchToEdit(comp._id)"
            >
              {{ comp.name }}
            </div>
            <button
              v-on:click="pushUpdatedComp(comp._id)"
              :id="`compNameCheck-${comp._id}`"
              class="compNameCheck hidden"
            >
              ✔
            </button>
          </td>

          <!-- Allow routing to teams page, scouting app page, and delete functionality -->
          <router-link
            tag="td"
            class="compsCell"
            :to="{ name: 'teams', params: { competition: comp._id } }"
            >Teams</router-link
          >
          <router-link
            tag="td"
            class="compsCell"
            :to="{ name: 'scouting', params: { competition: comp._id } }"
            >Scout Match</router-link
          >
          <td
            class="compsCell compsCellDelete"
            v-on:click="$emit('delete-comp', comp._id)"
          >
            Delete
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Comps',
  props: ["comps"],
  data() {
    return {
      keyRender: 0 //Variable that will force the comps table to rerender upon a change
    }
  },
  methods: {
    /// When in editing mode, clicking the check will trigger this method to push the change to the parent component and then the database
    async pushUpdatedComp(id) {
      let elem = document.getElementById(`compNameEdit-${id}`);
      let check = document.getElementById(`compNameCheck-${id}`);
      let comp = this.comps.filter(comp => comp._id == id)[0]; //Have to access the clientside comps and not make a WS call to make change appear instantaneous

      check.className = "compNameCheck hidden";

      let newName = elem.value;

      //Update values and switch to normal display
      await this.$emit('update-comp', id, newName);

      //Edit this.comps on the client side to make transition to new edited value LOOK immediate while the db runs function in background
      comp.name = newName;
      
      //Use keychanging to force a rerender - can't use JUST id as key since that never changes for editing (it does when deleting) and name
      //doesn't ALWAYS change because the user could click check without changing anything
      this.keyRender++;
    },

    /// When in display mode, clicking a competition name cell will switch to edit mode
    switchToEdit(id) {
      let elem = document.getElementById(`compName-${id}`);
      let check = document.getElementById(`compNameCheck-${id}`);
      let comp = this.comps.filter(comp => comp._id == id)[0];

      //Check to confirm if it's in display mode - otherwise innerText would include only a ✔ obecause the name would be in an input tag
      if(elem.innerText == comp.name){
        //Show the checkmark
        check.className = "compNameCheck";

        //Switch to edit mode
        let show = document.getElementById(`compNameShow-${id}`);
        show.outerHTML = `<input id="compNameEdit-${id}" class="compNameEdit" type="text" value="${comp.name}">`;
      }
    }
  }
};
</script>