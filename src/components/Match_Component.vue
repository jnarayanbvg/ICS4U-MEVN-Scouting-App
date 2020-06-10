<template>
  <div class="container_main">
    <p id="mainTitle">Match {{this.match}}</p>
    <p id="mainSub">@ {{comp.name}}</p>
    
    <div class="container_match">
      <Matches v-bind:matches="matches" v-bind:exclude="'matchNumber'" v-bind:sortable="false"></Matches>
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
    //Figure out the name of the current competition
    try {
      this.comp = await CompService.getOneComp(this.$route.params.competition);
      if(this.comp.name == undefined) throw "No competition with this id exists.";
    } catch(err) {
      console.log(err);
      alert("Please click a valid team link from the teams page!");
      this.$router.push({name: 'home'});
    }

    this.match = this.$route.params.match;

    try {
      this.matches = await MatchService.getMatchesByMatch(this.comp._id, this.match);
    } catch(err) {
      alert("Error: " + err.message);
    }
  }
}
</script>