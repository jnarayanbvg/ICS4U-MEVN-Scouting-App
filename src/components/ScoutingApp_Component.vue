<template>
  <div class="container_app">
    <div id="appTable">
      <div class="row">
        <div class="tab left">
          <div class="flexTab" id="preload">
            <button class="tabButtons">
              Level 1
            </button>
            <button class="tabButtons">
              Level 2
            </button>
            <button class="tabButtons cancel">
              Cancel
            </button>
          </div>
        </div>
        <div class="tab mid" id="field">
          <div id="playfield"></div>
          <div id="spaceTable">
            <div id="spaceTableRow">
              <div id="spaceTableCell">
                <button class="spaces" id="space0">0</button>
                <button class="spaces" id="space1">1</button>

                <button class="spaces" id="space6">6</button>
                <button class="spaces" id="space7">7</button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab right">
          <div class="flexTab" id="preload">
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
        </div>
      </div>
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