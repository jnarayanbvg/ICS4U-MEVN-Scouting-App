/* eslint-disable */
//Declare state variables
let currentMode = "preload", rocketLevel = "low";
let habStart = -1, habLeave = -1, habClimb = -1;

//Declare utility class with general use properties and functions
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

    static getId(id) {
        return document.getElementById(id);
    }

    static getClass(className) {
        return document.getElementsByClassName(className);
    }

    static getCSS(elem, prop) {
        return window.getComputedStyle(elem)[prop];
    }

    static disableButton(button, type) {
        //Applicable for most buttons
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

    static enableSpaces(arr) {
        arr.forEach(val => Util.getId("space"+val).style.display = "block");
    }

    static disableSpaces(arr) {
        arr.forEach(val => Util.getId("space"+val).style.display = "none");
    }
}


//Declare general and user-/button-accessible functions
function setFieldColor(color) {
    let alt = color == "red" ? "blue" : "red";
    Util.getId("playfield").style.backgroundColor = Util[color+"ColorLight"];
    Util.disableButton(Util.getId(alt), alt);
    Util.enableButton(Util.getId(color), color);
}

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
        //Check for invalid click
        if(Util.getCSS(Util.getId(lookFor+level), "opacity") == 0) return;

        let buttons = Util.getClass(lookFor);
        buttons.forEach(button => Util.disableButton(button, "full"));
        Util.enableButton(Util.getId(lookFor+level), "tab");
        Util.enableButton(Util.getId(lookFor+"Cancel"), "cancel");
        eval(lookFor + " = " + level);

        //Check for preload to sandstorm logic
        if(lookFor == "habStart" && habLeave == -1) {
            if(habStart == 1) Util.disableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.disableButton(Util.getId("habLeave1"), "full");
        }
    }
    if(eval(lookFor + " > -1") && level == -1) {
        //Check for preload to sandstorm logic
        if(lookFor == "habStart" && habLeave == -1) {
            if(habStart == 1) Util.enableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.enableButton(Util.getId("habLeave1"), "full");
        }

        let buttons = Util.getClass(lookFor);
        buttons.forEach(button => Util.enableButton(button, "full"));
        Util.disableButton(Util.getId(lookFor+eval(lookFor)), "tab");
        Util.disableButton(Util.getId(lookFor+"Cancel"), "cancel");
        eval(lookFor + " = " + level);

        //Check again for preload to sandstorm logic
        if(lookFor == "habLeave" && habLeave == -1) {
            if(habStart == 1) Util.disableButton(Util.getId("habLeave2"), "full");
            if(habStart == 2) Util.disableButton(Util.getId("habLeave1"), "full");
        }
    }

    console.log("s" + habStart);
    console.log("l" + habLeave);
    console.log("c" + habClimb);
}

function switchRocketLevel() {
    let len = rocketLevel.length;
    rocketLevel = rocketLevel == "low" ? "mid" : rocketLevel == "mid" ? "high" : "low";
    let str = rocketLevel.slice(0,1).toUpperCase() + rocketLevel.slice(1);

    let displays = Util.getClass("rocketDisplay");
    displays.forEach(display => display.innerHTML = str+display.innerHTML.slice(len));

    //Handle spaces
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

function switchMode(newMode) {
    currentMode = newMode;

    //Disable all buttons
    let buttons = Util.getClass("bottomButtons");
    buttons.forEach(button => Util.disableButton(button, "bottom"));

    //Enable specific button
    let target = buttons[newMode]; //Get an item with a particular ID
    Util.enableButton(target, "bottom");

    //Disable all screen items
    let preload = Util.getClass("preload");
    preload.forEach(item => item.style.display = "none");
    let sandstorm = Util.getClass("sandstorm");
    sandstorm.forEach(item => item.style.display = "none");
    let teleop = Util.getClass("teleop");
    teleop.forEach(item => item.style.display = "none");
    Util.getId("miscTab").style.display = "none";
    Util.getId("playfield").style.display = "none";
    Util.getId("spaceSet").style.display = "none";

    //Enable certain screen items per mode
    if(currentMode == "preload") {
        preload.forEach(item => item.style.display = "block");
    }
    if(currentMode == "sandstorm") {
        sandstorm.forEach(item => item.style.display = "block");
    }
    if(currentMode == "teleop") {
        teleop.forEach(item => item.style.display = "block");
    }
    if(currentMode == "miscellaneous") {
        Util.getId("miscTab").style.display = "block";
    } else {
        Util.getId("playfield").style.display = "block";
        Util.getId("spaceSet").style.display = "table";
    }
}





//Export the usable js functions
const js = {
    setFieldColor,
    flipSides,
    setHAB,
    switchRocketLevel,
    switchMode
}

export default js;