<template>
  <div class="container_main">
    <p id="mainTitle">Teams</p>
    <p id="mainSub">@ {{comp.name}}</p>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import MatchService from '../MatchService.js'

export default {
  name: 'Teams',
  components: {
  },
  data() {
    return {
      comp: {},
      matches: [],
      teams: []
    }
  },
  async created() {
    //Figure out the name of the current competition
    try {
      this.comp = await CompService.getOneComp(this.$route.params.competition);
      if(this.comp.name == undefined || this.comp.name == "") throw "No competition with this id exists.";
    } catch(err) {
      console.log(err);
      alert("Please click a valid teams link from the home page!");
      this.$router.push({name: 'home'});
    }

    try {
      this.matches = await MatchService.getMatchesByComp(this.comp._id);
    } catch(err) {
      alert("Error: " + err.message);
    }

    //Removes duplicates to get just a list of all teams who have played at this comp
    let matchesTeams = this.matches.map(obs => obs.match.teamNumber); //An observer object adds an extra layer between the array and the team, so I have to get around that
    matchesTeams.forEach(elem => {
      if(!this.teams.includes(elem)) this.teams.push(elem);
    });
    console.log(this.teams);
  }
}
</script>