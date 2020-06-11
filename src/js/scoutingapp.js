/* eslint-disable */
function initApp() {
    Util.initSpaces();
    initVars();
}

//Inits Vars when scouting app is clicked from the home page, otherwise it uses var states from last time the page was opened
function initVars() {
    currentMode = "preload";
    rocketLevel = "low";
    habStart = -1;
    habLeave = -1;
    habClimb = -1;

    sandstormCargo = 0;
    sandstormPanel = 0;
    shipCargo = 0;
    shipPanel = 0;
    lowCargo = 0;
    lowPanel = 0;
    midCargo = 0;
    midPanel = 0;
    highCargo = 0;
    highPanel = 0;

    cargoFloor = 0;
    cargoHuman = 0;
    panelFloor = 0;
    panelHuman = 0;

    timeDefending = 0;
    defenseStrength = 0;

    allianceColor = "red";
    currentItem = "";
}

// Declare state variables
let currentMode = "preload", rocketLevel = "low";
let habStart = -1, habLeave = -1, habClimb = -1; //-1 means no selection, 0 means on field/no leave, 1+ means level
let sandstormCargo = 0, sandstormPanel = 0, shipCargo = 0, shipPanel = 0, lowCargo = 0, lowPanel = 0, midCargo = 0, midPanel = 0, highCargo = 0, highPanel = 0;
let cargoFloor = 0, cargoHuman = 0, panelFloor = 0, panelHuman = 0;
let timeDefending = 0, defenseStrength = 0;
let allianceColor = "red";
let currentItem = "";

// Declare utility class with general use properties and functions
class Util {
    static redColorLight = "#f53a3a";
    static blueColorLight = "#418ee7";
    static buttonGrayUnclicked = "#3b3b3b";
    static buttonGrayClicked = "#7c7c7c";
    static buttonText = "#ffffff";
    static cancelBlack = "#161616";
    static preloadColor = "#21c945";
    static sandstormColor = "#ce8416";
    static teleopColor = "#1a76cc";
    static miscellaneousColor = "#c91f1f";

    static notScored = Util.buttonGrayUnclicked;
    static scored = "#10b834";
    static spaces = [];
    
    static getVar(variable) {
        return eval(variable);
    }

    static getId(id) {
        return document.getElementById(id);
    }

    static getClass(className) {
        return document.getElementsByClassName(className);
    }

    static getCSS(elem, prop) {
        return window.getComputedStyle(elem)[prop];
    }

    static getItem() {
        return currentItem.slice(0,5);
    }

    static disableButton(button, type) {
        // Applicable for most buttons
        button.style.backgroundColor = this.buttonGrayUnclicked;

        if(type == "bottom") {
            button.style.fontSize = "15px";
        }

        if(type == "red" || type == "blue") {
            button.style.backgroundColor = this.cancelBlack;
            button.style.fontSize = "13px";
        }

        if(type == "full") {
            button.style.opacity = 0;
        }

        if(type == "tab") {
            button.style.fontSize = "14px";
        }

        if(type == "cancel") {
            button.style.fontSize = "12px";
            button.style.backgroundColor = this.cancelBlack;
        }
    }

    static enableButton(button, type) {
        if(type == "bottom") {
            button.style.backgroundColor = Util[button.id+"Color"];
            button.style.fontSize = "24px";
        }

        if(type == "red") {
            button.style.backgroundColor = this.redColorLight;
            button.style.fontSize = "18px";
        }

        if(type == "blue") {
            button.style.backgroundColor = this.blueColorLight;
            button.style.fontSize = "18px";
        }

        if(type == "full") {
            button.style.opacity = 1;
        }

        if(type == "tab") {
            button.style.backgroundColor = this.buttonGrayClicked;
            button.style.fontSize = "16px";
            button.style.opacity = 1;
        }

        if(type == "cancel") {
            button.style.fontSize = "16px";
            button.style.backgroundColor = this.buttonGrayUnclicked;
        }
    }

    static isEnabled(button, type) {
        if(type == "cancel") {
            return button.style.fontSize == "16px";
        }
    }

    // For the rocket
    static enableSpaces(arr) {
        arr.forEach(val => Util.getId("space"+val).style.display = "block");
    }

    // For the rocket
    static disableSpaces(arr) {
        arr.forEach(val => Util.getId("space"+val).style.display = "none");
    }
    
    // Generate space objects for each scorespace on the field
    static initSpaces() {
        for(let i = 0; i < 20; i++) {
            this.spaces[i] = new Space("space"+i);
        }
    }

    // Change spaces when an object is held
    static enableHolding() {
        this.spaces.forEach(space => space.enableHolding());
    }

    // Change spaces when an object is dropped
    static disableHolding() {
        this.spaces.forEach(space => space.disableHolding());
    }

    // Interpret scoring on a space
    static score(num) {
        this.spaces[num].score();
    }
}

// Write class to describe the state of each individual score space on the cargo ship and rocket
class Space {
    cargoScored = false;
    panelScored = false;
    item;
    num;

    constructor(id) {
        this.item = Util.getId(id);
        this.num = parseInt(id.slice(5));
    }

    // When an item is picked up, display a different message
    enableHolding() {
        if(currentMode == "preload") return;
        
        if((Util.getItem() == "Cargo" && this.cargoScored) || (Util.getItem() == "Panel" && this.panelScored)) {
            this.item.innerHTML = "Scored";
        } else {
            this.item.innerHTML = "Empty";
        }

        this.setColor();
    }

    // When an object is dropped, display a different message
    disableHolding() {
        let cargoMessage = "Cargo: ", panelMessage = "Panel: ";
        cargoMessage += this.cargoScored ? "✔" : "✖"; 
        panelMessage += this.panelScored ? "✔" : "✖"; 

        this.item.innerHTML = cargoMessage + '<div class="emptySpace"></div>' + panelMessage;
   
        this.setColor();
    }

    // Check if able to score on the current space and then act accordingly
    score() {
        if(this.item.innerHTML == "Empty") {
            if(Util.getItem() == "Cargo") {
                this.cargoScored = true;

                if(this.num == 0 || this.num == 1 || this.num == 6 || this.num == 7) lowCargo++;
                else if(this.num == 2 || this.num == 3 || this.num == 8 || this.num == 9) midCargo++;
                else if(this.num == 4 || this.num == 5 || this.num == 10 || this.num == 11) highCargo++;
                else shipCargo++;
                if(currentMode == "sandstorm") sandstormCargo++;
            } else {
                this.panelScored = true;

                if(this.num == 0 || this.num == 1 || this.num == 6 || this.num == 7) lowPanel++;
                else if(this.num == 2 || this.num == 3 || this.num == 8 || this.num == 9) midPanel++;
                else if(this.num == 4 || this.num == 5 || this.num == 10 || this.num == 11) highPanel++;
                else shipPanel++;
                if(currentMode == "sandstorm") sandstormPanel++;
            }
            setItem("");
        }
    }
    
    // Generate a color gradient depending on which items are scored on that space
    setColor() {
        if(this.item.innerHTML == "Empty") {
            this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.notScored+","+Util.notScored+" 50%,"+Util.notScored+" 50%,"+Util.notScored+" 100%)";
        } else if(this.item.innerHTML == "Scored") {
            this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.scored+","+Util.scored+" 50%,"+Util.scored+" 50%,"+Util.scored+" 100%)";
        } else {
            if(this.cargoScored && this.panelScored) {
                this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.scored+","+Util.scored+" 50%,"+Util.scored+" 50%,"+Util.scored+" 100%)";
            } else if(this.cargoScored) {
                this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.scored+","+Util.scored+" 50%,"+Util.notScored+" 50%,"+Util.notScored+" 100%)";
            } else if(this.panelScored) {
                this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.notScored+","+Util.notScored+" 50%,"+Util.scored+" 50%,"+Util.scored+" 100%)";
            } else {
                this.item.style.backgroundImage = "-webkit-linear-gradient(top,"+Util.notScored+","+Util.notScored+" 50%,"+Util.notScored+" 50%,"+Util.notScored+" 100%)";
            }
        }
    }
}


/// Declare general and user-/button-accessible functions

// Switching field color
function setFieldColor(color) {
    let alt = color == "red" ? "blue" : "red";
    Util.getId("playfield").style.backgroundColor = Util[color+"ColorLight"];
    Util.disableButton(Util.getId(alt), alt);
    Util.enableButton(Util.getId(color), color);
    allianceColor = color;
}

// Moving all field components to mirrored position
function flipSides() {
    let spaces = Util.getClass("spaces");
    spaces.forEach(space => flipItem(space));
    flipItem(Util.getId("mapTeamNumber"));

    function flipItem(button) {
        let defVal = 80;
        let maxVal = 680 - (Util.getCSS(button, "width").slice(0, -2) - defVal); //Account for offset for bigger fields
        let curr = Number((Util.getCSS(button, "left")).slice(0, -2));
        button.style.left = (maxVal-curr)+"px";
    }
}

// Make user-inputted team appear in the field display
function setMapTeamNumber() {
    Util.getId("mapTeamNumber").innerHTML = Util.getId("input_teamNumber").value;
}

// Set HAB state variables for preload, sandstorm, and teleop
function setHAB(level) {
    let lookFor = "";
    switch(currentMode) {
        case "preload":
            lookFor = "habStart";
            break;
        case "sandstorm":
            lookFor = "habLeave";
            break;
        default: 
            lookFor = "habClimb";
            break;
    }

    if(eval(lookFor + " == -1") && level > -1) {
        // Check for invalid click
        if(Util.getCSS(Util.getId(lookFor+level), "opacity") == 0) return;

        let buttons = Util.getClass(lookFor);
        buttons.forEach(button => Util.disableButton(button, "full"));
        console.log(buttons);
        Util.enableButton(Util.getId(lookFor+level), "tab");
        Util.enableButton(Util.getId(lookFor+"Cancel"), "cancel");
        eval(lookFor + " = " + level);

        // Check for preload to sandstorm logic
        if(lookFor == "habStart" && habLeave == -1) {
            if(habStart == 1) Util.disableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.disableButton(Util.getId("habLeave1"), "full");
        }
    }
    if(eval(lookFor + " > -1") && level == -1) {
        // Check for preload to sandstorm logic
        if(lookFor == "habStart" && habLeave == -1) {
            if(habStart == 1) Util.enableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.enableButton(Util.getId("habLeave1"), "full");
        }

        let buttons = Util.getClass(lookFor);
        buttons.forEach(button => Util.enableButton(button, "full"));
        Util.disableButton(Util.getId(lookFor+eval(lookFor)), "tab");
        Util.disableButton(Util.getId(lookFor+"Cancel"), "cancel");
        eval(lookFor + " = " + level);

        // Check again for preload to sandstorm logic
        if(lookFor == "habLeave" && habLeave == -1) {
            if(habStart == 1) Util.disableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.disableButton(Util.getId("habLeave1"), "full");
        }
    }
}

// Handle item preloading, picking up, and dropping
function setItem(item) {
    let lookFor = "";
    switch(currentMode) {
        case "preload":
            lookFor = "itemPreload";
            break;
        default: 
            lookFor = "itemMain";
            break;
    }

    if(currentItem == "" && item != "") {
        // Check for invalid click
        if(Util.getCSS(Util.getId(lookFor+item), "opacity") == 0) return;

        let buttons = Util.getClass(lookFor);
        buttons.forEach(button => Util.disableButton(button, "full"));
        Util.enableButton(Util.getId(lookFor+item), "tab");
        Util.enableButton(Util.getId(lookFor+"Cancel"), "cancel");
        currentItem = item;

        // Edit the appearance of the spaces
        Util.enableHolding();

        // Add to the appropriate pickup variable
        if(currentMode != "preload") {
            let pickup = item.slice(0,1).toLowerCase() + item.slice(1);
            eval(pickup + "++");
        }

        // Handle preload to main game logic
        if(currentMode == "preload") {
            let buttons = Util.getClass("itemMain");
            buttons.forEach(button => Util.disableButton(button, "full"));
            if(item == "Cargo") Util.enableButton(Util.getId("itemMainCargoFloor"), "tab");
            else Util.enableButton(Util.getId("itemMainPanelFloor"), "tab");
            Util.enableButton(Util.getId("itemMainCancel"), "cancel");
        }
    }
    if(currentItem != "" && item == "") {
        if(Util.isEnabled(Util.getId(lookFor+"Cancel"), "cancel")) {
            let buttons = Util.getClass("itemPreload");
            buttons.forEach(button => Util.disableButton(button, "tab"));
            buttons.forEach(button => Util.enableButton(button, "full"));
            Util.disableButton(Util.getId("itemPreloadCancel"), "cancel");
            buttons = Util.getClass("itemMain");
            buttons.forEach(button => Util.disableButton(button, "tab"));
            buttons.forEach(button => Util.enableButton(button, "full"));
            Util.disableButton(Util.getId("itemMainCancel"), "cancel");
            currentItem = "";

            // Edit the appearance of the spaces
            Util.disableHolding();
        }
    }
}

// Enable and disable correct rocket spaces for cycling displayed rocket level
function switchRocketLevel() {
    let len = rocketLevel.length;
    rocketLevel = rocketLevel == "low" ? "mid" : rocketLevel == "mid" ? "high" : "low";
    let str = rocketLevel.slice(0,1).toUpperCase() + rocketLevel.slice(1);

    let displays = Util.getClass("rocketDisplay");
    displays.forEach(display => display.innerHTML = str+display.innerHTML.slice(len));

    // Handle spaces
    switch(rocketLevel) {
        case "low": 
            Util.disableSpaces([2, 3, 4, 5, 8, 9, 10, 11]);
            Util.enableSpaces([0, 1, 6, 7]);
            break;
        case "mid":
            Util.disableSpaces([0, 1, 4, 5, 6, 7, 10, 11]);
            Util.enableSpaces([2, 3, 8, 9]);
            break;
        default:
            Util.disableSpaces([0, 1, 2, 3, 6, 7, 8, 9]);
            Util.enableSpaces([4, 5, 10, 11]);
            break;
    }
}

// Declare more easily accessible scoring method for implementing in component
function score(num) {
    Util.score(num);
}

// Change the state of semantic-differential scales on miscallenous screen
function switchScale(type, value) {
    let buttons = Util.getClass(type);
    buttons.forEach(button => Util.disableButton(button, "tab"));
    Util.enableButton(Util.getId(type+value), "tab");
    eval(type + " = " + value);
}

// Handle mode-switching functionality at bottom of the screen as match progresses
function switchMode(newMode) {
    currentMode = newMode;

    // Disable all buttons
    let buttons = Util.getClass("bottomButtons");
    buttons.forEach(button => Util.disableButton(button, "bottom"));

    // Enable specific button
    let target = buttons[newMode]; //Get an item with a particular ID
    Util.enableButton(target, "bottom");

    // Disable all screen items
    let preload = Util.getClass("preload");
    preload.forEach(item => item.style.display = "none");
    let sandstorm = Util.getClass("sandstorm");
    sandstorm.forEach(item => item.style.display = "none");
    let teleop = Util.getClass("teleop");
    teleop.forEach(item => item.style.display = "none");
    Util.getId("miscTab").style.display = "none";
    Util.getId("playfield").style.display = "none";
    Util.getId("spaceSet").style.display = "none";
    Util.getId("spaceSet").style.display = "none";


    // Enable certain screen items per mode
    if(currentMode == "preload") {
        preload.forEach(item => item.style.display = "block");
        Util.disableHolding();
    }
    if(currentMode == "sandstorm") {
        sandstorm.forEach(item => item.style.display = "block");
        if(currentItem != "") Util.enableHolding();
    }
    if(currentMode == "teleop") {
        teleop.forEach(item => item.style.display = "block");
        if(currentItem != "") Util.enableHolding();
    }
    if(currentMode == "miscellaneous") {
        Util.getId("miscTab").style.display = "block";
        Util.getId("home").style.display = "block";
    } else {
        Util.getId("playfield").style.display = "block";
        Util.getId("spaceSet").style.display = "table";
        Util.getId("home").style.display = "none";
    }
}



//Export the usable js functions as an easily accessible object
const js = {
    initApp,
    setFieldColor,
    flipSides,
    setMapTeamNumber,
    setHAB,
    setItem,
    switchRocketLevel,
    score,
    switchScale,
    switchMode,
    Util
}

export default js;