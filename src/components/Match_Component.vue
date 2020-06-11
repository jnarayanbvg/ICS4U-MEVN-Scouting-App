<!-- Match Component - Show all match data for a specific match for a specific competition -->

<template>
  <div class="container_main">
    <!-- Handle strategy-side page navigation -->
    <p id="mainTitle">Match {{ this.match }}</p>
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
    <p id="mainSub">@ {{ comp.name }}</p>

    <!-- Matches Component displays all given match data -->
    <div class="container_match">
      <Matches
        v-bind:matches="matches"
        v-bind:exclude="'matchNumber'"
        v-bind:comp="comp"
      ></Matches>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import MatchService from '../MatchService.js'
import Matches from './Matches_Component.vue'

export default {
  name: 'Match',
  components: {
    Matches
  },
  data() {
    return {
      comp: {},
      matches: [],
      match: ""
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

    this.match = this.$route.params.match;

    // Load matches
    try {
      this.matches = await MatchService.getMatchesByMatch(this.comp._id, this.match);
    } catch(err) {
      alert("Error: " + err.message);
    }

    this.matches.sort((a,b) => b.allianceColor.localeCompare(a.allianceColor)); //Red teams then blue teams
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