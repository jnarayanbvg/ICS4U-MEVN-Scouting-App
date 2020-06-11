<!-- Scouting App Component - Gather all scouting data -->

<template>
  <div class="container_app">
    <form v-on:submit.prevent="checkForm()">
      <div id="headerRow">
        <!-- Handle top inputs and displays -->
        <div id="leftInputs">
          <p class="topLabels">Competition:</p>
          <span id="competitionId"></span><br />

          <p class="topLabels">Match:</p>
          <input
            type="number"
            id="input_matchNumber"
            name="matchNumber"
            v-model="vals.matchNumber"
          />
        </div>
        <div class="flexBox">
          <button
            class="topButtons preload"
            id="red"
            v-on:click="js.setFieldColor('red')"
            type="button"
          >
            Red Alliance
          </button>
          <button
            class="topButtons preload"
            id="flip"
            v-on:click="js.flipSides()"
            type="button"
          >
            Flip<br />Field
          </button>
          <button
            class="topButtons preload"
            v-on:click="goHome();"
            id="home"
            type="button"
            :to="{
              name: 'home'
            }"
          >
            Go<br />Home
          </button>
          <button
            class="topButtons preload"
            id="blue"
            v-on:click="js.setFieldColor('blue')"
            type="button"
          >
            Blue Alliance
          </button>
        </div>
        <div id="rightInputs">
          <p class="topLabels">Scout:</p>
          <input
            type="text"
            id="input_scoutName"
            name="scoutName"
            v-model="vals.scoutName"
          /><br />

          <p class="topLabels">Team:</p>
          <input
            type="number"
            id="input_teamNumber"
            name="teamNumber"
            v-model="vals.teamNumber"
            v-on:change="js.setMapTeamNumber()"
          />
        </div>
      </div>

      <div id="appTable">
        <div class="row">
          <div class="tab left">

            <!-- HAB Preload buttons -->
            <div class="flexTab preload">
              <p class="tabTitle">HAB Preload</p>
              <button
                class="tabButtons habStart"
                id="habStart1"
                v-on:click="js.setHAB(1)"
                type="button"
              >
                Started Level 1
              </button>
              <button
                class="tabButtons habStart"
                id="habStart2"
                v-on:click="js.setHAB(2)"
                type="button"
              >
                Started Level 2
              </button>
              <button
                class="tabButtons cancel"
                id="habStartCancel"
                v-on:click="js.setHAB(-1)"
                type="button"
              >
                Cancel
              </button>
            </div>

            <!-- HAB Sandstorm buttons -->
            <div class="flexTab sandstorm">
              <p class="tabTitle">HAB Activity</p>
              <button
                class="tabButtons habLeave"
                id="habLeave0"
                v-on:click="js.setHAB(0)"
                type="button"
              >
                On HAB<br />
                <span class="tabButtonsLabels">(In Sandstorm)</span>
              </button>
              <button
                class="tabButtons habLeave"
                id="habLeave1"
                v-on:click="js.setHAB(1)"
                type="button"
              >
                Left Level 1<br />
                <span class="tabButtonsLabels">(In Sandstorm)</span>
              </button>
              <button
                class="tabButtons habLeave"
                id="habLeave2"
                v-on:click="js.setHAB(2)"
                type="button"
              >
                Left Level 2<br />
                <span class="tabButtonsLabels">(In Sandstorm)</span>
              </button>
              <button
                class="tabButtons cancel"
                id="habLeaveCancel"
                v-on:click="js.setHAB(-1)"
                type="button"
              >
                Cancel
              </button>
            </div>

            <!-- HAB Teleop buttons -->
            <div class="flexTab teleop">
              <p class="tabTitle">HAB Activity</p>
              <button
                class="tabButtons habClimb"
                id="habClimb0"
                v-on:click="js.setHAB(0)"
                type="button"
              >
                On Field<br />
                <span class="tabButtonsLabels">(In Engame)</span>
              </button>
              <button
                class="tabButtons habClimb"
                id="habClimb1"
                v-on:click="js.setHAB(1)"
                type="button"
              >
                Climbed Level 1<br />
                <span class="tabButtonsLabels">(In Engame)</span>
              </button>
              <button
                class="tabButtons habClimb"
                id="habClimb2"
                v-on:click="js.setHAB(2)"
                type="button"
              >
                Climbed Level 2<br />
                <span class="tabButtonsLabels">(In Engame)</span>
              </button>
              <button
                class="tabButtons habClimb"
                id="habClimb3"
                v-on:click="js.setHAB(3)"
                type="button"
              >
                Climbed Level 3<br />
                <span class="tabButtonsLabels">(In Engame)</span>
              </button>
              <button
                class="tabButtons cancel"
                id="habClimbCancel"
                v-on:click="js.setHAB(-1)"
                type="button"
              >
                Cancel
              </button>
            </div>

          </div>

          <div class="tab mid" id="field">

            <!-- All Miscellaneous inputs -->
            <div id="miscTab">
              <span class="miscTabLabels">Time Defending</span><br />
              <div id="timeDefending">
                <button
                  class="miscButtons timeDefending first"
                  id="timeDefending0"
                  v-on:click="js.switchScale('timeDefending', 0)"
                  type="button"
                >
                  None
                </button>
                <button
                  class="miscButtons timeDefending"
                  id="timeDefending1"
                  v-on:click="js.switchScale('timeDefending', 1)"
                  type="button"
                >
                  Little
                </button>
                <button
                  class="miscButtons timeDefending"
                  id="timeDefending2"
                  v-on:click="js.switchScale('timeDefending', 2)"
                  type="button"
                >
                  Some
                </button>
                <button
                  class="miscButtons timeDefending last"
                  id="timeDefending3"
                  v-on:click="js.switchScale('timeDefending', 3)"
                  type="button"
                >
                  Most
                </button>
              </div>
              <span class="miscTabLabels">Defense Strength</span><br />
              <div id="defenseStrength">
                <button
                  class="miscButtons defenseStrength first"
                  id="defenseStrength0"
                  v-on:click="js.switchScale('defenseStrength', 0)"
                  type="button"
                >
                  None
                </button>
                <button
                  class="miscButtons defenseStrength"
                  id="defenseStrength1"
                  v-on:click="js.switchScale('defenseStrength', 1)"
                  type="button"
                >
                  Weak
                </button>
                <button
                  class="miscButtons defenseStrength"
                  id="defenseStrength2"
                  v-on:click="js.switchScale('defenseStrength', 2)"
                  type="button"
                >
                  Moderate
                </button>
                <button
                  class="miscButtons defenseStrength last"
                  id="defenseStrength3"
                  v-on:click="js.switchScale('defenseStrength', 3)"
                  type="button"
                >
                  Strong
                </button>
              </div>
              <span class="miscTabLabels">Comments</span><br />
              <textarea id="input_comments" v-model="vals.comments"></textarea>

              <!-- All hidden inputs to get submitted -->
              <input
                type="hidden"
                id="input_allianceColor"
                name="allianceColor"
                v-model="vals.allianceColor"
              />
              <input
                type="hidden"
                id="input_habLeave"
                name="habLeave"
                v-model="vals.habLeave"
              />
              <input
                type="hidden"
                id="input_habClimb"
                name="habClimb"
                v-model="vals.habClimb"
              />
              <input
                type="hidden"
                id="input_sandstormCargo"
                name="sandstormCargo"
                v-model="vals.sandstormCargo"
              />
              <input
                type="hidden"
                id="input_sandstormPanel"
                name="sandstormPanel"
                v-model="vals.sandstormPanel"
              />
              <input
                type="hidden"
                id="input_shipCargo"
                name="shipCargo"
                v-model="vals.shipCargo"
              />
              <input
                type="hidden"
                id="input_shipPanel"
                name="shipPanel"
                v-model="vals.shipPanel"
              />
              <input
                type="hidden"
                id="input_lowCargo"
                name="lowCargo"
                v-model="vals.lowCargo"
              />
              <input
                type="hidden"
                id="input_lowPanel"
                name="lowPanel"
                v-model="vals.lowPanel"
              />
              <input
                type="hidden"
                id="input_midCargo"
                name="midCargo"
                v-model="vals.midCargo"
              />
              <input
                type="hidden"
                id="input_midPanel"
                name="midPanel"
                v-model="vals.midPanel"
              />
              <input
                type="hidden"
                id="input_highCargo"
                name="highCargo"
                v-model="vals.highCargo"
              />
              <input
                type="hidden"
                id="input_highPanel"
                name="highPanel"
                v-model="vals.highPanel"
              />
              <input
                type="hidden"
                id="input_cargoFloor"
                name="cargoFloor"
                v-model="vals.cargoFloor"
              />
              <input
                type="hidden"
                id="input_cargoHuman"
                name="cargoHuman"
                v-model="vals.cargoHuman"
              />
              <input
                type="hidden"
                id="input_panelFloor"
                name="panelFloor"
                v-model="vals.panelFloor"
              />
              <input
                type="hidden"
                id="input_panelHuman"
                name="panelHuman"
                v-model="vals.panelHuman"
              />
              <input
                type="hidden"
                id="input_timeDefending"
                name="timeDefending"
                v-model="vals.timeDefending"
              />
              <input
                type="hidden"
                id="input_defenseStrength"
                name="defenseStrength"
                v-model="vals.defenseStrength"
              />

              <input type="submit" value="Submit" />
            </div>

            <!-- Coloured field backing -->
            <div id="playfield"></div>

            <!-- All usable score spaces and buttons -->
            <div id="spaceSet">

              <!-- Top Rocket -->
              <button
                class="spaces"
                id="space0"
                v-on:click="js.score(0)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space1"
                v-on:click="js.score(1)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space2"
                v-on:click="js.score(2)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space3"
                v-on:click="js.score(3)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space4"
                v-on:click="js.score(4)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space5"
                v-on:click="js.score(5)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces rocketDisplay"
                id="rocketDisplay0"
                v-on:click="js.switchRocketLevel()"
                type="button"
              >Low<div class="emptySpace"></div>Level</button> <!-- Must keep on one line for js formatting -->

              <!-- Bottom Rocket -->
              <button
                class="spaces"
                id="space6"
                v-on:click="js.score(6)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space7"
                v-on:click="js.score(7)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space8"
                v-on:click="js.score(8)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space9"
                v-on:click="js.score(9)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space10"
                v-on:click="js.score(10)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space11"
                v-on:click="js.score(11)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces rocketDisplay"
                id="rocketDisplay1"
                v-on:click="js.switchRocketLevel()"
                type="button"
              >Low<div class="emptySpace"></div>Level</button>  <!-- Must keep on one line for js formatting -->

              <!-- Cargo Ship -->
              <button
                class="spaces"
                id="space12"
                v-on:click="js.score(12)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space13"
                v-on:click="js.score(13)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space14"
                v-on:click="js.score(14)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space15"
                v-on:click="js.score(15)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space16"
                v-on:click="js.score(16)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space17"
                v-on:click="js.score(17)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space18"
                v-on:click="js.score(18)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>
              <button
                class="spaces"
                id="space19"
                v-on:click="js.score(19)"
                type="button"
              >
                Cargo: ✖
                <div class="emptySpace"></div>
                Panel: ✖
              </button>

              <!-- Map Team Number -->
              <button id="mapTeamNumber" disabled>0</button>
            </div>
          </div>
          <div class="tab right">

            <!-- Item Preload buttons -->
            <div class="flexTab preload">
              <p class="tabTitle">Item Preload</p>
              <button
                class="tabButtons itemPreload"
                id="itemPreloadCargo"
                v-on:click="js.setItem('Cargo')"
                type="button"
              >
                Cargo
              </button>
              <button
                class="tabButtons itemPreload"
                id="itemPreloadPanel"
                v-on:click="js.setItem('Panel')"
                type="button"
              >
                Panel
              </button>
              <button
                class="tabButtons cancel"
                id="itemPreloadCancel"
                v-on:click="js.setItem('')"
                type="button"
              >
                Drop Item
              </button>
            </div>

            <!-- Item Pickup buttons -->
            <div class="flexTab sandstorm teleop">
              <p class="tabTitle">Item Pickup</p>
              <button
                class="tabButtons itemMain"
                id="itemMainCargoFloor"
                v-on:click="js.setItem('CargoFloor')"
                type="button"
              >
                Cargo<br />
                <span class="tabButtonsLabels">(From Floor)</span>
              </button>
              <button
                class="tabButtons itemMain"
                id="itemMainCargoHuman"
                v-on:click="js.setItem('CargoHuman')"
                type="button"
              >
                Cargo<br />
                <span class="tabButtonsLabels">(Human Load)</span>
              </button>
              <button
                class="tabButtons itemMain"
                id="itemMainPanelFloor"
                v-on:click="js.setItem('PanelFloor')"
                type="button"
              >
                Panel<br />
                <span class="tabButtonsLabels">(From Floor)</span>
              </button>
              <button
                class="tabButtons itemMain"
                id="itemMainPanelHuman"
                v-on:click="js.setItem('PanelHuman')"
                type="button"
              >
                Panel<br />
                <span class="tabButtonsLabels">(Human Load)</span>
              </button>
              <button
                class="tabButtons cancel"
                id="itemMainCancel"
                v-on:click="js.setItem('')"
                type="button"
              >
                Drop Item
              </button>
            </div>

          </div>
        </div>
      </div>

      <div class="flexBox">

        <!-- Jandle mode switching buttons -->
        <button
          class="bottomButtons"
          id="preload"
          v-on:click="js.switchMode('preload')"
          type="button"
        >
          Preload
        </button>
        <button
          class="bottomButtons"
          id="sandstorm"
          v-on:click="js.switchMode('sandstorm')"
          type="button"
        >
          Sandstorm
        </button>
        <button
          class="bottomButtons"
          id="teleop"
          v-on:click="js.switchMode('teleop')"
          type="button"
        >
          Teleop
        </button>
        <button
          class="bottomButtons"
          id="miscellaneous"
          v-on:click="js.switchMode('miscellaneous')"
          type="button"
        >
          Miscellaneous
        </button>

      </div>
    </form>
  </div>
</template>

<script>
import js from '../js/scoutingapp.js';
import CompService from '../CompService.js'
import MatchService from '../MatchService.js'

export default {
  name: 'ScoutingApp',
  data() {
    return {
      comp: {},
      vals: {
        competition: 0,
        matchNumber: 0,
        teamNumber: 0,
        allianceColor: "red",
        habLeave: 0,
        habClimb: 0,
        sandstormCargo: 0,
        sandstormPanel: 0,
        shipCargo: 0,
        shipPanel: 0,
        lowCargo: 0,
        lowPanel: 0,
        midCargo: 0,
        midPanel: 0,
        highCargo: 0,
        highPanel: 0,
        cargoFloor: 0,
        cargoHuman: 0,
        panelFloor: 0,
        panelHuman: 0,
        timeDefending: 0,
        defenseStrength: 0,
        comments: '',
        scoutName: ''
      },
      js // Object with all js functions
    }
  },
  async created() {
    // Figure out the name of the current competition
    try {
      this.comp = await CompService.getOneComp(this.$route.params.competition);
      if(this.comp.name == undefined) throw "No competition with this id exists.";
      js.Util.getId('competitionId').innerHTML = this.comp.name;
      this.vals.competition = this.comp._id;
    } catch(err) {
      console.log(err);
      alert("Please click a valid scouting app link from the home page!");
      this.$router.push({name: 'home'});
    }
  },
  mounted() {
    // Run js function to init all necessary processes
    js.initApp();
  },
  methods: {

    // Gather, interpret, and submit the form values
    async checkForm() {
      if(!confirm("Are you sure you submit this scouting data? This action cannot be undone")) return false;

      let arr = ["allianceColor", 
        "habLeave", "habClimb", 
        "sandstormCargo", "sandstormPanel", 
        "shipCargo", "shipPanel", "lowCargo", "lowPanel", "midCargo", "midPanel", "highCargo", "highPanel",
        "cargoFloor", "cargoHuman", "panelFloor", "panelHuman", 
        "timeDefending", "defenseStrength"];
      arr.forEach(val => this.vals[val] = js.Util.getVar(val));

      //Input correction logic - a robot must have played defense at least a bit if their defense was rated
      if(this.vals.timeDefending > 0) this.vals.defenseStrength = Math.max(this.vals.defenseStrength, 1);
      if(this.vals.defenseStrength > 0) this.vals.timeDefending = Math.max(this.vals.timeDefending, 1);

      await MatchService.createMatch(
        this.vals.competition,
        Math.max(0, this.vals.matchNumber),
        Math.max(0, this.vals.teamNumber),
        this.vals.allianceColor,
        Math.max(0, this.vals.habLeave),
        Math.max(0, this.vals.habClimb),
        this.vals.sandstormCargo,
        this.vals.sandstormPanel,
        this.vals.shipCargo,
        this.vals.shipPanel,
        this.vals.lowCargo,
        this.vals.lowPanel,
        this.vals.midCargo,
        this.vals.midPanel,
        this.vals.highCargo,
        this.vals.highPanel,
        this.vals.cargoFloor,
        this.vals.cargoHuman,
        this.vals.panelFloor,
        this.vals.panelHuman,
        this.vals.timeDefending,
        this.vals.defenseStrength,
        this.vals.comments,
        this.vals.scoutName
      );
      
      // Redirect straight to the team's page so it can calculate an accurate average for the database
      this.$router.push({ name: 'team', params: { competition: this.vals.competition, team: Math.max(0, this.vals.teamNumber) }});
    },

    goHome() {
      if(confirm("Are you sure you want to leave this page?") && confirm("All scouting data will be lost if you leave without submitting")) {
        this.$router.push({ name: 'home' });
      }
    }
    
  }
}
</script>