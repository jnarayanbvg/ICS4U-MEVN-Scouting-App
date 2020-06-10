<template>
  <div class="container_main">
    <p id="mainTitle">Teams</p>
    <p id="mainSub">@ {{comp.name}}</p>

    <div class="container_match">
      <Matches v-bind:matches="averages" v-bind:exclude="'allianceColor matchNumber comments scout'" v-bind:comp="comp"></Matches>
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
      this.averages = await AverageService.getAveragesByComp(this.comp._id);
    } catch(err) {
      alert("Error: " + err.message);
    }

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

    function toInt(val) {
      return parseFloat(val.toFixed(2));
    }
  }
}
</script>