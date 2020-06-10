<template>
  <table id="matchTable">
    <thead>
      <th class="matchHead" v-if="include('teamNumber')">Team<div class="matchSpace"></div>Number</th>
      <th class="matchHead" v-if="include('matchNumber')">Match<div class="matchSpace"></div>Number</th>
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
      <th class="matchHead matchComments" v-if="include('comments')">Comments</th>
      <th class="matchHead matchScout" v-if="include('scout')">Scout</th>
    </thead>
    <tbody>
      <tr class="matchRow" v-for="match in matches" :key="match._id + keyRender">
        <router-link tag="td" :to="{ name: 'team', params: { competition: comp._id, team: match.teamNumber }}" class="matchCell" v-bind:class="{ red: onRed(match), blue: onBlue(match), matchTeam: !include('allianceColor') }" v-if="include('teamNumber')">{{ match.teamNumber }}</router-link>
        <router-link tag="td" :to="{ name: 'match', params: { competition: comp._id, match: match.matchNumber }}" class="matchCell matchMatch" v-if="include('matchNumber')">{{ match.matchNumber }}</router-link>
        <td class="matchCell">{{ match.habLeave }}</td>
        <td class="matchCell">{{ match.sandstormCargo }} C<div class="matchSpace"></div>{{ match.sandstormPanel }} P</td>
        <td class="matchCell">{{ match.cargoFloor }} C<div class="matchSpace"></div>{{ match.panelFloor }} P</td>
        <td class="matchCell">{{ match.cargoHuman }} C<div class="matchSpace"></div>{{ match.panelHuman }} P</td>
        <td class="matchCell">{{ match.shipCargo }}</td>
        <td class="matchCell">{{ match.shipPanel }}</td>
        <td class="matchCell">{{ match.highCargo }}<div class="matchSpace"></div>{{ match.midCargo }}<div class="matchSpace"></div>{{ match.lowCargo }}</td>
        <td class="matchCell">{{ match.highPanel }}<div class="matchSpace"></div>{{ match.midPanel }}<div class="matchSpace"></div>{{ match.lowPanel }}</td>
        <td class="matchCell">{{ match.timeDefending }}<div class="matchSpace"></div>{{ getTimeDefending(match.timeDefending) }}</td>
        <td class="matchCell">{{ match.defenseStrength }}<div class="matchSpace"></div>{{ getDefenseStrength(match.defenseStrength) }}</td>
        <td class="matchCell">{{ match.habClimb }}</td>
        <td class="matchCell matchComments" v-if="include('comments')">{{ match.comments }}</td>
        <td class="matchCell matchScout" v-if="include('scout')">{{ match.scoutName }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'Match',
  props: ['matches', 'exclude', 'comp'],
  data() {
    return {
      keyRender: 0 //Variable that will force the match table row to rerender upon a change
    }
  },
  methods: {
    include(arg) {
      return !this.exclude.includes(arg);
    },
    onRed(match) {
      return this.include('allianceColor') && match.allianceColor == 'red';
    },
    onBlue(match) {
      return this.include('allianceColor') && match.allianceColor == 'blue';
    },
    getTimeDefending(val) {
      switch(Math.floor(val+0.5)) {
        case 0: return "None";
        case 1: return "Little";
        case 2: return "Some";
        default: return "Most";
      }
    },
    getDefenseStrength(val) {
      switch(Math.floor(val+0.5)) {
        case 0: return "None";
        case 1: return "Weak";
        case 2: return "Moderate";
        default: return "Strong";
      }
    }
  }
};
</script>