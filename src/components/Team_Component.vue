<template>
  <div class="container_main">
    <p id="mainTitle">Team {{this.team}}</p>
    <p id="mainSub">@ {{comp.name}}</p>
    
    <div class="container_match">
      <table id="matchTable">
        <thead>
          <th class="matchHead">Match<div class="matchSpace"></div>Number</th>
          <th class="matchHead">HAB<div class="matchSpace"></div>Leave</th>
          <th class="matchHead">Sandstorm</th>
          <th class="matchHead">Floor<div class="matchSpace"></div>Pickup</th>
          <th class="matchHead">Human<div class="matchSpace"></div>Pickup</th>
          <th class="matchHead">Ship<div class="matchSpace"></div>Cargo</th>
          <th class="matchHead">Ship<div class="matchSpace"></div>Panel</th>
          <th class="matchHead">Rocket<div class="matchSpace"></div>Cargo</th>
          <th class="matchHead">Rocket<div class="matchSpace"></div>Panel</th>
          <th class="matchHead">Time<div class="matchSpace"></div>Defending</th>
          <th class="matchHead">Defense<div class="matchSpace"></div>Strength</th>
          <th class="matchHead">HAB<div class="matchSpace"></div>Climb</th>
          <th class="matchHead matchComments">Comments</th>
          <th class="matchHead matchScout">Scout</th>
        </thead>
        <tbody>
          <tr class="matchRow" v-for="match in matches" :key="match._id + keyRender">
            <Match v-bind:match="match" v-bind:exclude="'allianceColor teamNumber'"></Match>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CompService from '../CompService.js'
import MatchService from '../MatchService.js'
import Match from './Match_Component.vue'

export default {
  name: 'Team',
  components: {
    Match
  },
  data() {
    return {
      comp: {},
      matches: [],
      team: "",
      keyRender: 0
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

    this.team = this.$route.params.team;

    try {
      this.matches = await MatchService.getMatchesByTeam(this.comp._id, this.team);
    } catch(err) {
      alert("Error: " + err.message);
    }

    console.log(this.matches);
  }
}
</script>