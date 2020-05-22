// const colors = {
//     redColorLight: "#f53a3a",
//     blueColorLight: "#418ee7",
//     buttonGrayUnclicked: "#3b3b3b",
//     buttonGrayClicked: "#7c7c7c",
//     buttonText: "#ffffff",
//     cancelBlack: "#161616",
//     preloadColor: "#12a532",
//     sandstormColor: "#ce8416",
//     teleopColor: "#1a76cc",
//     miscellaneousColor: "#c91f1f"
// }
// const doc = {
//     getId: function(id) { return document.getElementById(id) },
//     getClass: function(className) { return document.getElementsByClassName(className) }
// }

class Util {
    static redColorLight = "#f53a3a";
    static blueColorLight = "#418ee7";
    static buttonGrayUnclicked = "#3b3b3b";
    static buttonGrayClicked = "#7c7c7c";
    static buttonText = "#ffffff";
    static cancelBlack = "#161616";
    static preloadColor = "#12a532";
    static sandstormColor = "#ce8416";
    static teleopColor = "#1a76cc";
    static miscellaneousColor = "#c91f1f";

    static getId(id) {
        return document.getElementById(id);
    }

    static getClass(className) {
        return document.getElementsByClassName(className);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log(Util.getId('preload'));
});