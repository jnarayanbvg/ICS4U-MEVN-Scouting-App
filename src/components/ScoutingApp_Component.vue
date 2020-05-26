<template>
  <div class="container_app">
    <div id="headerRow">
      <div id="leftInputs">
        <p class="topLabels">Competition: </p><br>
        <p class="topLabels">Match: </p><input type="number" id="input_matchNumber">
      </div>
      <div class="flexBox">
        <button class="topButtons" id="red" v-on:click="js.setFieldColor('red');">Red Alliance</button>
        <button class="topButtons" id="flip" v-on:click="js.flipSides();">Flip<br>Field</button>
        <button class="topButtons" id="blue" v-on:click="js.setFieldColor('blue');">Blue Alliance</button>
      </div>
      <div id="rightInputs">
        <p class="topLabels">Scout: </p><input type="text" id="input_scoutName"><br>
        <p class="topLabels">Team: </p><input type="number" id="input_teamNumber">
      </div>
    </div>
    <div id="appTable">
      <div class="row">
        <div class="tab left">
          <div class="flexTab preload">
            <p class="tabTitle">HAB Preload</p>
            <button class="tabButtons habStart" id="habStart1" v-on:click="js.setHAB(1);">
              Started Level 1
            </button>
            <button class="tabButtons habStart" id="habStart2" v-on:click="js.setHAB(2);">
              Started Level 2
            </button>
            <button class="tabButtons cancel" id="habStartCancel" v-on:click="js.setHAB(-1);">
              Cancel
            </button>
          </div>
          <div class="flexTab sandstorm">
            <p class="tabTitle">HAB Activity</p>
            <button class="tabButtons habLeave" id="habLeave0" v-on:click="js.setHAB(0);">
              On HAB<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons habLeave" id="habLeave1" v-on:click="js.setHAB(1);">
              Left Level 1<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons habLeave" id="habLeave2" v-on:click="js.setHAB(2);">
              Left Level 2<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons cancel" id="habLeaveCancel" v-on:click="js.setHAB(-1);">
              Cancel
            </button>
          </div>
          <div class="flexTab teleop">
            <p class="tabTitle">HAB Activity</p>
            <button class="tabButtons habClimb" id="habClimb0" v-on:click="js.setHAB(0);">
              On Field<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons habClimb" id="habClimb1" v-on:click="js.setHAB(1);">
              Climbed Level 1<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons habClimb" id="habClimb2" v-on:click="js.setHAB(2);">
              Climbed Level 2<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons habClimb" id="habClimb3" v-on:click="js.setHAB(3);">
              Climbed Level 3<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons cancel" id="habClimbCancel" v-on:click="js.setHAB(-1);">
              Cancel
            </button>
          </div>
        </div>
        <div class="tab mid" id="field">
          <div id="miscTab">
            <span class="miscTabLabels">Time Defending</span><br>
            <div id="timeDefending">
              <button class="miscButtons timeDefending first" id="timeDefending0" v-on:click="js.switchScale('timeDefending', 0);">None</button>
              <button class="miscButtons timeDefending" id="timeDefending1" v-on:click="js.switchScale('timeDefending', 1);">Little</button>
              <button class="miscButtons timeDefending" id="timeDefending2" v-on:click="js.switchScale('timeDefending', 2);">Some</button>
              <button class="miscButtons timeDefending last" id="timeDefending3" v-on:click="js.switchScale('timeDefending', 3);">Most</button>
            </div>
            <span class="miscTabLabels">Defense Strength</span><br>
            <div id="defenseStrength">
              <button class="miscButtons defenseStrength first" id="defenseStrength0" v-on:click="js.switchScale('defenseStrength', 0);">None</button>
              <button class="miscButtons defenseStrength" id="defenseStrength1" v-on:click="js.switchScale('defenseStrength', 1);">Weak</button>
              <button class="miscButtons defenseStrength" id="defenseStrength2" v-on:click="js.switchScale('defenseStrength', 2);">Moderate</button>
              <button class="miscButtons defenseStrength last" id="defenseStrength3" v-on:click="js.switchScale('defenseStrength', 3);">Strong</button>
            </div>
            <span class="miscTabLabels">Comments</span><br>
            <textarea id="input_comments"></textarea>
            <input type="submit" value="Submit">
          </div>
          <div id="playfield"></div>
          <div id="spaceSet">

            <!-- Top Rocket -->
            <button class="spaces" id="space0" v-on:click="js.score(0);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space1" v-on:click="js.score(1);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space2" v-on:click="js.score(2);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space3" v-on:click="js.score(3);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space4" v-on:click="js.score(4);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space5" v-on:click="js.score(5);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces rocketDisplay" id="rocketDisplay0" v-on:click="js.switchRocketLevel();">Low<div class="emptySpace"></div>Level</button>

            <!-- Bottom Rocket -->
            <button class="spaces" id="space6" v-on:click="js.score(6);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space7" v-on:click="js.score(7);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space8" v-on:click="js.score(8);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space9" v-on:click="js.score(9);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space10" v-on:click="js.score(10);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space11" v-on:click="js.score(11);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces rocketDisplay" id="rocketDisplay1" v-on:click="js.switchRocketLevel();">Low<div class="emptySpace"></div>Level</button>

            <!-- Cargo Ship -->
            <button class="spaces" id="space12" v-on:click="js.score(12);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space13" v-on:click="js.score(13);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space14" v-on:click="js.score(14);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space15" v-on:click="js.score(15);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space16" v-on:click="js.score(16);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space17" v-on:click="js.score(17);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space18" v-on:click="js.score(18);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>
            <button class="spaces" id="space19" v-on:click="js.score(19);">Cargo: ✖<div class="emptySpace"></div>Panel: ✖</button>

            <!-- Map Team Number -->
            <button id="mapTeamNumber">0</button>

          </div>
        </div>
        <div class="tab right">
          <div class="flexTab preload">
            <p class="tabTitle">Item Preload</p>
            <button class="tabButtons itemPreload" id="itemPreloadCargo" v-on:click="js.setItem('Cargo');">
              Cargo
            </button>
            <button class="tabButtons itemPreload" id="itemPreloadPanel" v-on:click="js.setItem('Panel');">
              Panel
            </button>
            <button class="tabButtons cancel" id="itemPreloadCancel" v-on:click="js.setItem('');">
              Drop Item
            </button>
          </div>
          <div class="flexTab sandstorm teleop">
            <p class="tabTitle">Item Pickup</p>
            <button class="tabButtons itemMain" id="itemMainCargoFloor" v-on:click="js.setItem('CargoFloor');">
              Cargo<br>
              <span class="tabButtonsLabels">(From Floor)</span>
            </button>
            <button class="tabButtons itemMain" id="itemMainCargoHuman" v-on:click="js.setItem('CargoHuman');">
              Cargo<br>
              <span class="tabButtonsLabels">(Human Load)</span>
            </button>
            <button class="tabButtons itemMain" id="itemMainPanelFloor" v-on:click="js.setItem('PanelFloor');">
              Panel<br>
              <span class="tabButtonsLabels">(From Floor)</span>
            </button>
            <button class="tabButtons itemMain" id="itemMainPanelHuman" v-on:click="js.setItem('PanelHuman');">
              Panel<br>
              <span class="tabButtonsLabels">(Human Load)</span>
            </button>
            <button class="tabButtons cancel" id="itemMainCancel" v-on:click="js.setItem('');">
              Drop Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flexBox">
      <button class="bottomButtons" id="preload" v-on:click="js.switchMode('preload');">Preload</button>
      <button class="bottomButtons" id="sandstorm" v-on:click="js.switchMode('sandstorm');">Sandstorm</button>
      <button class="bottomButtons" id="teleop" v-on:click="js.switchMode('teleop');">Teleop</button>
      <button class="bottomButtons" id="miscellaneous" v-on:click="js.switchMode('miscellaneous');">Miscellaneous</button>
    </div>
  </div>
</template>

<script>
import js from '../js/scoutingapp.js';

export default {
  name: 'ScoutingApp',
  data() {
    return {
      js //Object with all js functions
    }
  }
}
</script>