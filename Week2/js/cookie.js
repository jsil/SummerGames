function setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (20*365));
    var expires = "expires="+d.toGMTString();
    var saveData = "";
    for(var i=0;i<gameSaves.length;i++) {
        if(i === 0) {
            saveData = saveData + gameSaves[i].getFormatted();
        }
        else {
            saveData = saveData + ", " + gameSaves[i].getFormatted();
        }
    }
    document.cookie = "gamesave= {" + saveData + "} ; " + expires;
}

function getCookie() {
    var name = "gamesave=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function eraseCookie() {
    gameSaves = [new GameSave(0), new GameSave(1), new GameSave(2), new GameSave(3), new GameSave(4), new GameSave(5), new GameSave(6), new GameSave(7), new GameSave(8), new GameSave(9)];

    setCookie();

}

function GameSave(number) {
    this.number = number;

}
GameSave.prototype = {
    getFormatted:function() {
        return "\"" + this.number + "\":[{\"firstname\":\"jordan\"}]";
    },
    override:function() {
        alert("not yet implemented");
    }
}

var gameSaves = [new GameSave(0), new GameSave(1), new GameSave(2), new GameSave(3), new GameSave(4), new GameSave(5), new GameSave(6), new GameSave(7), new GameSave(8), new GameSave(9)];

setCookie();

function loadData() {
    var data = jQuery.parseJSON(getCookie());
    if(data === "") {//new cookie
        setCookie();
    }
    else {

    }
}
eraseCookie();
loadData();
console.log(jQuery.parseJSON(getCookie()));