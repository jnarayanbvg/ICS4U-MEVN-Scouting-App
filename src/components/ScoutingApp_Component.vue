<template>
  <div class="container_app">
    <div id="headerRow">
      <div id="leftInputs">
        <p class="topLabels">Competition: </p><br>
        <p class="topLabels">Match: </p><input type="number" id="input_matchNumber">
      </div>
      <div class="flexBox">
        <button class="topButtons" id="red">Red Alliance</button>
        <button class="topButtons" id="flip">Flip<br>Field</button>
        <button class="topButtons" id="blue">Blue Alliance</button>
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
            <button class="tabButtons">
              Started Level 1
            </button>
            <button class="tabButtons">
              Started Level 2
            </button>
            <button class="tabButtons cancel">
              Cancel
            </button>
          </div>
          <div class="flexTab sandstorm">
            <p class="tabTitle">HAB Activity</p>
            <button class="tabButtons">
              On HAB<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons">
              Left Level 1<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons">
              Left Level 2<br>
              <span class="tabButtonsLabels">(In Sandstorm)</span>
            </button>
            <button class="tabButtons cancel">
              Cancel
            </button>
          </div>
          <div class="flexTab teleop">
            <p class="tabTitle">HAB Activity</p>
            <button class="tabButtons">
              On Field<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons">
              Climbed Level 1<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons">
              Climbed Level 2<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons">
              Climbed Level 3<br>
              <span class="tabButtonsLabels">(In Engame)</span>
            </button>
            <button class="tabButtons cancel">
              Cancel
            </button>
          </div>
        </div>
        <div class="tab mid" id="field">
          <div id="miscTab">
            <span class="miscTabLabels">Time Defending</span><br>
            <span class="miscTabLabels">Defense Strength</span><br>
            <span class="miscTabLabels">Comments</span><br>
          </div>
          <div id="playfield"></div>
          <div id="spaceSet">

            <!-- Top Rocket -->
            <button class="spaces" id="space0">0</button>
            <button class="spaces" id="space1">1</button>
            <button class="spaces" id="space2">2</button>
            <button class="spaces" id="space3">3</button>
            <button class="spaces" id="space4">4</button>
            <button class="spaces" id="space5">5</button>
            <button class="spaces rocketDisplay" id="rocketDisplay0">00</button>

            <!-- Bottom Rocket -->
            <button class="spaces" id="space6">6</button>
            <button class="spaces" id="space7">7</button>
            <button class="spaces" id="space8">8</button>
            <button class="spaces" id="space9">9</button>
            <button class="spaces" id="space10">10</button>
            <button class="spaces" id="space11">11</button>
            <button class="spaces rocketDisplay" id="rocketDisplay1">01</button>

            <!-- Cargo Ship -->
            <button class="spaces" id="space12">12</button>
            <button class="spaces" id="space13">13</button>
            <button class="spaces" id="space14">14</button>
            <button class="spaces" id="space15">15</button>
            <button class="spaces" id="space16">16</button>
            <button class="spaces" id="space17">17</button>
            <button class="spaces" id="space18">18</button>
            <button class="spaces" id="space19">19</button>

            <!-- Robot Space -->
            <button class="spaces" id="robotSpace">Robot</button>

            <!-- Map Team Number -->
            <button id="mapTeamNumber">0</button>

          </div>
        </div>
        <div class="tab right">
          <div class="flexTab preload">
            <p class="tabTitle">Item Preload</p>
            <button class="tabButtons">
              Cargo
            </button>
            <button class="tabButtons">
              Panel
            </button>
            <button class="tabButtons cancel">
              Drop Item
            </button>
          </div>
          <div class="flexTab sandstorm teleop">
            <p class="tabTitle">Item Pickup</p>
            <button class="tabButtons">
              Cargo<br>
              <span class="tabButtonsLabels">(From Floor)</span>
            </button>
            <button class="tabButtons">
              Cargo<br>
              <span class="tabButtonsLabels">(Human Load)</span>
            </button>
            <button class="tabButtons">
              Panel<br>
              <span class="tabButtonsLabels">(From Floor)</span>
            </button>
            <button class="tabButtons">
              Panel<br>
              <span class="tabButtonsLabels">(Human Load)</span>
            </button>
            <button class="tabButtons cancel">
              Drop Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flexBox">
      <button class="bottomButtons" id="preload">Preload</button>
      <button class="bottomButtons" id="sandstorm">Sandstorm</button>
      <button class="bottomButtons" id="teleop">Teleop</button>
      <button class="bottomButtons" id="miscellaneous">Miscellaneous</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoutingApp',
  data() {
    return {
    }
  }
}
</script>