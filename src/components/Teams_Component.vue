<!-- Teams Component - Show all teams averages for a specific competition -->

<template>
  <div class="container_main">
    <!-- Handle strategy-side page navigation -->
    <p id="mainTitle">Team Averages</p>
    <button
      id="linkMatch"
      class="topLinks"
      v-on:mouseover="checkValid()"
      v-on:click="redirect()"
    >
      Match <input type="text" id="matchRedirect" v-on:change="checkValid()" />
    </button>
    <router-link
      tag="button"
      :to="{ name: 'home' }"
      id="linkHome"
      class="topLinks valid"
      >Home</router-link
    >
    <p id="mainSub">@ {{ comp.name }}</p>

    <!-- Matches Component displays all given match data (appropriated to display averages) -->
    <div class="container_match">
      <Matches
        v-bind:matches="averages"
        v-bind:exclude="'allianceColor matchNumber comments scout'"
        v-bind:comp="comp"
      ></Matches>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import AverageService from '../AverageService.js'
import Matches from './Matches_Component.vue'

export default {
  name: 'Teams',
  components: {
    Matches
  },
  data() {
    return {
      comp: {},
      averages: [],
      teams: []
    }
  },
  async created() {
    // Figure out the name of the current competition
    try {
      this.comp = await CompService.getOneComp(this.$route.params.competition);
      if(this.comp.name == undefined || this.comp.name == "") throw "No competition with this id exists.";
    } catch(err) {
      console.log(err);
      alert("Please click a valid teams link from the home page!");
      this.$router.push({name: 'home'});
    }

    // Load all averages
    try {
      this.averages = await AverageService.getAveragesByComp(this.comp._id);
    } catch(err) {
      alert("Error: " + err.message);
    }

    // Map all averages to an array understandable by the Matches component
    this.averages.map(avg => {
      //Account for divide by zero exceptions -- just make it a very high value so the number gets rounded off to zero
      if(avg.matchCount == 0) avg.matchCount = Number.MAX_SAFE_INTEGER;
      if(avg.defenseCount == 0) avg.defenseCount = Number.MAX_SAFE_INTEGER;

      avg.habLeave = toInt(avg.habLeave / avg.matchCount);
      avg.habClimb = toInt(avg.habClimb / avg.matchCount);
      avg.sandstormCargo = toInt(avg.sandstormCargo / avg.matchCount);
      avg.sandstormPanel = toInt(avg.sandstormPanel / avg.matchCount);
      avg.shipCargo = toInt(avg.shipCargo / avg.matchCount);
      avg.shipPanel = toInt(avg.shipPanel / avg.matchCount);
      avg.lowCargo = toInt(avg.lowCargo / avg.matchCount);
      avg.lowPanel = toInt(avg.lowPanel / avg.matchCount);
      avg.midCargo = toInt(avg.midCargo / avg.matchCount);
      avg.midPanel = toInt(avg.midPanel / avg.matchCount);
      avg.highCargo = toInt(avg.highCargo / avg.matchCount);
      avg.highPanel = toInt(avg.highPanel / avg.matchCount);
      avg.cargoFloor = toInt(avg.cargoFloor / avg.matchCount);
      avg.cargoHuman = toInt(avg.cargoHuman / avg.matchCount);
      avg.panelFloor = toInt(avg.panelFloor / avg.matchCount);
      avg.panelHuman = toInt(avg.panelHuman / avg.matchCount);
      avg.timeDefending = toInt(avg.timeDefending / avg.defenseCount);
      avg.defenseStrength = toInt(avg.defenseStrength / avg.defenseCount);
    });

    // Helper method for converting long float values to shorter values (not actually ints)
    function toInt(val) {
      return parseFloat(val.toFixed(2));
    }
  },
  methods: {
    //Check if match redirect input value is valid
    checkValid() { 
      // Check valid is called twice because the v-on:change doesn't detect if the field is emptied and the v-on:mousehover doesn't immediately update until moused off then over again
      // Basically, it tries to update as frequetly as possible for a better user experience

      let input = document.getElementById('matchRedirect');
      let button = document.getElementById('linkMatch');
      if(input == null || button == null) return; //DOM not loaded
      try {
        if(input.value != "" && parseInt(input.value) > 0) {
          button.className = "topLinks valid";
        } else {
          button.className = "topLinks";
        }
      } catch(err) {
        alert("Error in match redirect input field: " + err.message);
      }
    },

    // Direct user to correct match page upon clicking button
    redirect() {
      let input = document.getElementById('matchRedirect');
      let button = document.getElementById('linkMatch');
      if(input == null || button == null) return; //DOM not loaded
      try {
        if(button.className == "topLinks valid") {
          this.$router.push({name: 'match', params: { competition: this.comp._id, match: parseInt(input.value) }});
        }
      } catch(err) {
        alert("Error in redirecting to match: " + err.message);
      }
    }
  }
}
</script>