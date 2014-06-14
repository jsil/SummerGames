function setCookie() {
    var d = new Date();
    d.setDate(d.getDate() + (20*365));
    var expires = "expires="+d.toGMTString();
    var saveData = "";
    for(var i=0;i<gameSaves.length;i++) {
        if(i === 0) {
            saveData = saveData + "\"save" + i + "\":" + gameSaves[i].save + "";
        }
        else {
            saveData = saveData + ", \"save" + i + "\":" + gameSaves[i].save + "";
        }
    }
    document.cookie = "gamesave= {" + saveData + "} ; " + expires;
}

function getCookie() {
    var name = "gamesave=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) 
            return c.substring(name.length, c.length);
    }
    return "";
}

function eraseCookie() {
    gameSaves = [new GameSave(0), new GameSave(1), new GameSave(2), new GameSave(3), new GameSave(4), new GameSave(5), new GameSave(6), new GameSave(7), new GameSave(8), new GameSave(9)];

    setCookie();

}

function GameSave(number) {
    this.number = number;
    this.save = "[]";

}
GameSave.prototype = {
    // getFormatted:function() {
    //     return "\"save" + this.number + "\":[{\"firstname\":\"jordan\"}]";
    // },
    writeSave:function(game, hero) {
        var date = getCurrentTimeAndDate();
        this.save = "{\"game\":{" + game.getJSON() + "}, \"hero\":{" + hero.getJSON() + "}, \"date\":\"" + date.date + " " + date.time + "\"}";
        setCookie();
    },
    loadSave:function(json) {
        this.save = JSON.stringify(json);
    },

    getGameJSON:function() {
        return JSON.stringify(JSON.parse(this.save).game);
    },

    getHeroJSON:function() {
        return JSON.stringify(JSON.parse(this.save).hero);
    }
}

var gameSaves = [new GameSave(0), new GameSave(1), new GameSave(2), new GameSave(3), new GameSave(4), new GameSave(5), new GameSave(6), new GameSave(7), new GameSave(8), new GameSave(9)];

function loadData() {
    console.log(getCookie());
    var data = JSON.parse(getCookie());
    console.log(data);
    if(data === "") {//new cookie
        setCookie();
    }
    else {
        gameSaves[0].loadSave(data.save0);
        gameSaves[1].loadSave(data.save1);
        gameSaves[2].loadSave(data.save2);
        gameSaves[3].loadSave(data.save3);
        gameSaves[4].loadSave(data.save4);
        gameSaves[5].loadSave(data.save5);
        gameSaves[6].loadSave(data.save6);
        gameSaves[7].loadSave(data.save7);
        gameSaves[8].loadSave(data.save8);
        gameSaves[9].loadSave(data.save9);
    }
}

var getCurrentTimeAndDate = function(){

    var info = {};

    var currentTime = new Date();

    var hours = currentTime.getHours();
    var mins = currentTime.getMinutes();

    var year = currentTime.getFullYear();
    var month = parseInt(currentTime.getMonth(), 10) + 1;
    var day = parseInt(currentTime.getDate(), 10);

    if(month < 10)
        month = "0" + month;

    if(day < 10)
        day = "0" + day;

    info.date = month + "-" + day + "-" + year;

    if(hours < 10)
        hours = "0" + hours.toString();
    else
        hours = hours.toString();

    if(mins < 10)
        mins = "0" + mins.toString();
    else
        mins = mins.toString();

    info.time = hours + ":" + mins;

    return info;

}
//eraseCookie();
loadData();