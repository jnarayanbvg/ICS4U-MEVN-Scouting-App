<!-- Team Component - Show all match data for a specific team for a specific competition -->

<template>
  <div class="container_main">
    <!-- Handle strategy-side page navigation -->
    <p id="mainTitle">Team {{ this.team }}</p>
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
      :to="{ name: 'teams', params: { competition: comp._id } }"
      id="linkTeams"
      class="topLinks valid"
      >Teams</router-link
    >
    <div id="subFlex">
      <p id="mainSub">@ {{ comp.name }}</p>
      <div id="loading">
        Calculating Average <img src="../assets/images/loading.gif" />
        <!-- Visual indicator for when the average has been calculated -->
      </div>
    </div>

    <!-- Matches Component displays all given match data -->
    <div class="container_match">
      <Matches
        v-bind:matches="matches"
        v-bind:exclude="'allianceColor teamNumber'"
        v-bind:comp="comp"
      ></Matches>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import MatchService from '../MatchService.js'
import AverageService from '../AverageService.js'
import Matches from './Matches_Component.vue'

export default {
  name: 'Team',
  components: {
    Matches
  },
  data() {
    return {
      comp: {},
      matches: [],
      team: ""
    }
  },
  async created() {
    // Figure out the name of the current competition
    try {
      this.comp = await CompService.getOneComp(this.$route.params.competition);
      if(this.comp.name == undefined) throw "No competition with this id exists.";
    } catch(err) {
      console.log(err);
      alert("Please click a valid team link from the teams page!");
      this.$router.push({name: 'home'});
    }

    this.team = this.$route.params.team;

    // Load matches
    try {
      this.matches = await MatchService.getMatchesByTeam(this.comp._id, this.team);
    } catch(err) {
      alert("Error: " + err.message);
    }

    this.matches.sort((a,b) => a.matchNumber - b.matchNumber); //Ascending order of matches

    // With matches, calculate an up-to-date set of averages for the team, accounting for general scoring capabilities
    // as well as specific defense properties
    let habLeave = this.matches.reduce((acc, match) => acc += match.habLeave, 0);
    let habClimb = this.matches.reduce((acc, match) => acc += match.habClimb, 0);
    let sandstormCargo = this.matches.reduce((acc, match) => acc += match.sandstormCargo, 0);
    let sandstormPanel = this.matches.reduce((acc, match) => acc += match.sandstormPanel, 0);
    let shipCargo = this.matches.reduce((acc, match) => acc += match.shipCargo, 0);
    let shipPanel = this.matches.reduce((acc, match) => acc += match.shipPanel, 0);
    let lowCargo = this.matches.reduce((acc, match) => acc += match.lowCargo, 0);
    let lowPanel = this.matches.reduce((acc, match) => acc += match.lowPanel, 0);
    let midCargo = this.matches.reduce((acc, match) => acc += match.midCargo, 0);
    let midPanel = this.matches.reduce((acc, match) => acc += match.midPanel, 0);
    let highCargo = this.matches.reduce((acc, match) => acc += match.highCargo, 0);
    let highPanel = this.matches.reduce((acc, match) => acc += match.highPanel, 0);
    let cargoFloor = this.matches.reduce((acc, match) => acc += match.cargoFloor, 0);
    let cargoHuman = this.matches.reduce((acc, match) => acc += match.cargoHuman, 0);
    let panelFloor = this.matches.reduce((acc, match) => acc += match.panelFloor, 0);
    let panelHuman = this.matches.reduce((acc, match) => acc += match.panelHuman, 0);
    let timeDefending = this.matches.reduce((acc, match) => acc += match.timeDefending, 0);
    let defenseStrength = this.matches.reduce((acc, match) => acc += match.defenseStrength, 0);
    let matchCount = this.matches.length;
    let defenseCount = this.matches.reduce((acc, match) => acc += (match.timeDefending>0) ? 1 : 0, 0);

    // Upsert this average to the database
    try {
      await AverageService.upsertAverage(this.comp._id, 
        parseInt(this.team),
        habLeave,
        habClimb,
        sandstormCargo,
        sandstormPanel,
        shipCargo,
        shipPanel,
        lowCargo,
        lowPanel,
        midCargo,
        midPanel,
        highCargo,
        highPanel,
        cargoFloor,
        cargoHuman,
        panelFloor,
        panelHuman,
        timeDefending,
        defenseStrength,
        matchCount,
        defenseCount);

      // Display to the user that average has been calculated
      let message = document.getElementById("loading");
      if(message !== null) message.innerHTML = "Average Calculated <div id='padCheck'>✓</div>"; //In case they redirected off the page -- this command will still be run because of the async property
    } catch(err) {
      alert("Error: " + err.message);
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