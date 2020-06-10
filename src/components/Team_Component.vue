<template>
  <div class="container_main">
    <p id="mainTitle">Team {{this.team}}</p>
    <p id="mainSub">@ {{comp.name}}</p>
    
    <div class="container_match">
      <Matches v-bind:matches="matches" v-bind:exclude="'allianceColor teamNumber'" v-bind:comp="comp"></Matches>
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

    //With matches, calculate averages
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
    } catch(err) {
      alert("Error: " + err.message);
    }
  }
}
</script>