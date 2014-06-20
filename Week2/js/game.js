jQuery(function() {
jQuery("#sidePanel").tabs();
});

function Game(hero) {
	this.hero = hero;
	this.gameDiv = $("#gameDiv");
	this.canvas = document.getElementById("myCanvas");
	this.ctx = this.canvas.getContext('2d');
	this.battleDiv = $("#battleDiv");
	this.battleCanvas = $("#battleCanvas");
	this.battleCanvas2 = document.getElementById("battleCanvas");
	this.battleHUD = $("#battleHUD");
	this.battleMenu = $("#battleMenu");
	//this.battleG = gl;
	this.gameDiv = $("#gameDiv");
	this.sideContent = $("#sideContent");
	this.sidePanel = $("#sidePanel");
	this.bottomPanel = $("#bottomPanel");
	this.scrollBox = $("#scrollBox");
	this.optionsPanel = $("#optionsPanel");
	this.sprites = document.getElementById("sprites");

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		this.addText("Welcome to the Demo! Have fun!<br><br>The novice adventurer " + this.hero.name + " has finally arrived at The Grand Dojo, home of the best adventurer-trainer known to man: The Master.<br>");
		this.updateStats();
		//this.drawBattle();
	}

	Game.prototype.resizeGame = function() {
		this.gameDiv.width("99.5%");
		this.gameDiv.height("97%")

		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		// console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		this.sideContent.css("width", this.gameDiv.width()*.35-2);
		this.sideContent.css("height", this.gameDiv.height()-2);
		
		this.sidePanel.width('100%');
		this.sidePanel.css("height", this.gameDiv.height()*.65+3);

		this.bottomPanel.css("width", this.gameDiv.width()*.65);
		this.bottomPanel.css("height", this.gameDiv.height()*.35-6);
		
		this.optionsPanel.width('100%');
		this.optionsPanel.css("height", this.gameDiv.height()*.35-8);

		this.battleCanvas2.width = window.innerWidth;
		this.battleCanvas2.height = window.innerHeight;
		this.resizeBattle();
	}

	Game.prototype.resizeBattle = function() {
	   // only change the size of the canvas if the size it's being displayed
	   // has changed.
	   var width = this.battleCanvas.clientWidth;
	   var height = this.battleCanvas.clientHeight;
	   if (this.battleCanvas.width != width ||
	       this.battleCanvas.height != height) {
	     // Change the size of the canvas to match the size it's being displayed
	     // this.battleCanvas.width = width;
	     // this.battleCanvas.height = height;
	     this.battleCanvas.clientWidth = this.battleCanvas.width;
	     this.battleCanvas.clientHeight = this.battleCanvas.height;
	   }
	   //console.log("resized battle");
	}

	Game.prototype.showBattle = function() {
			this.battleDiv.show();
			this.battleHUD.show();
			this.battleMenu.show();
			this.resizeBattle();
			this.gameDiv.hide();
			webGLStart();
			drawScene();
	}

	Game.prototype.hideBattle = function() {
		this.battleDiv.hide();
		this.battleHUD.hide();
		this.battleMenu.hide();
		this.gameDiv.show();
	}

	Game.prototype.toggleBattle = function() {
		var btlCanvas = document.getElementById("battleCanvas");
		var isVisible = btlCanvas.offsetWidth > 0 || btlCanvas.offsetHeight > 0;
		if(!isVisible) {
			this.battleCanvas.show();
			this.battleHUD.show();
			this.battleMenu.show();
			//this.resizeBattle();
			this.gameDiv.hide();
			//console.log("Display battle");
		}
		else {
			this.battleCanvas.hide();
			this.battleHUD.hide();
			this.battleMenu.hide();
			//this.resizeBattle();
			this.gameDiv.show();
			//console.log("Hide battle");
		}
	}

	Game.prototype.addText = function(text) {
		if(this.scrollBox.html() != "") {
			this.scrollBox.html(this.scrollBox.html() + "<br>" + text);
	    }
	    else {
	    	this.scrollBox.html(this.scrollBox.html() + text);
	    }
	    this.scrollBox.animate({ scrollTop: this.scrollBox.prop('scrollHeight') }, "fast");
	}

	Game.prototype.clearText = function() {
		this.scrollBox.html("");
	}

	Game.prototype.updateStats = function() {
		$("#nameStat").html(this.hero.name);
		$("#healthStat").html(this.hero.health + "/" + this.hero.maxHealth);
		$("#goldStat").html(this.hero.gold + " G");
	}

	Game.prototype.updateInventory = function() {
		$("#inventoryBox").html(this.hero.printInventory());
		var viewButtons = document.getElementsByClassName("itemViewButton");
		for(var i=0;i<viewButtons.length;i++) {
			viewButtons[i].onclick = function() {
				event.preventDefault();
				viewButtonItem(this.getAttribute("data-num"));
			}
		}
		var equipButtons = document.getElementsByClassName("itemEquipButton");
		for(var i=0;i<equipButtons.length;i++) {
			equipButtons[i].onclick = function() {
				event.preventDefault();
				equipButton(this.getAttribute("data-num"));
			}
		}
		var consumeButtons = document.getElementsByClassName("itemConsumeButton");
		for(var i=0;i<consumeButtons.length;i++) {
			consumeButtons[i].onclick = function() {
				event.preventDefault();
				consumeButton(this.getAttribute("data-num"));
			}
		}
	}

	Game.prototype.updateEquipment = function() {
		$("#equipmentBox").html(this.hero.printEquipment());
		var viewButtons = document.getElementsByClassName("equipmentViewButton");
		for(var i=0;i<viewButtons.length;i++) {
			viewButtons[i].onclick = function() {
				event.preventDefault();
				viewButtonEquipment(this.getAttribute("data-num"));
			}
		}
		var unequipButtons = document.getElementsByClassName("equipmentUnequipButton");
		for(var i=0;i<unequipButtons.length;i++) {
			unequipButtons[i].onclick = function() {
				event.preventDefault();
				unequipButton(this.getAttribute("data-num"));
			}
		}
	}

	Game.prototype.updateQuests = function () {
		$("#questBox").html(this.hero.printActiveQuests());
	}

	Game.prototype.updateSaves = function() {
		var saveNames = document.getElementsByClassName("saveName");
		for(var i=0;i<saveNames.length;i++) {
			if(gameSaves[i].save != "[]")
				saveNames[i].innerHTML = JSON.parse(gameSaves[i].save).date;
			else
				saveNames[i].innerHTML = "(No save data)";
		}
	}

	Game.prototype.updateLoads = function() {
		var loadNames = document.getElementsByClassName("loadName");
		var loadModalButtons = document.getElementsByClassName("loadModalButton");
		for(var i=0;i<loadNames.length;i++) {
			var date = JSON.parse(gameSaves[i].save).date;
			if(date != null) {
				loadNames[i].innerHTML = date;
				loadModalButtons[i].style.display = "inline";
			}
			else {
				loadNames[i].innerHTML = "(No save data)";
				loadModalButtons[i].style.display = "none";
			}
		}
	}

	Game.prototype.updateDebug = function() {
		var armoryHTML = "";

		for(var i=0;i<armoryDB.length;i++) {
			if(armoryDB[i].name != null)
				armoryHTML += "<div>" + armoryDB[i].name + "<button type=button class=\"armoryUnlockButton\" data-num=" + i + ">Unlock</button></div>";
		}
		$("#armoryChooser").html(armoryHTML);
		var unlockArmoryButtons = document.getElementsByClassName("armoryUnlockButton");
		for(var i=0;i<unlockArmoryButtons.length;i++) {
			unlockArmoryButtons[i].onclick = function() {
				event.preventDefault();
				debugAddItem(this.getAttribute("data-num"));
			}
		}

		var questHTML = "";

		for(var i=0;i<questDB.length;i++) {
			questHTML += "<div>" + questDB[i].name + "<button type=button class=\"questUnlockButton\" data-num=" + i + ">Unlock</button></div>";
		}
		$("#questChooser").html(questHTML);
		var unlockQuestButtons = document.getElementsByClassName("questUnlockButton");
		for(var i=0;i<unlockQuestButtons.length;i++) {
			unlockQuestButtons[i].onclick = function() {
				event.preventDefault();
				debugAddQuest(this.getAttribute("data-num"));
			}
		}
	}

	Game.prototype.updateEverything = function() {
		this.updateStats();
		this.updateInventory();
		this.updateEquipment();
		this.updateQuests();
		this.updateDebug()
		this.updateSaves();
		this.updateLoads();
	}

	Game.prototype.doBattle = function(enemy) {
		this.drawBattle(enemy);

		var whosTurn;
		if(this.hero.speed >= enemy.speed) {
			whosTurn = true;
		}
		else {
			whosTurn = false;
		}
		while(this.hero.isAlive() && enemy.isAlive()) {
			if(whosTurn) {
				this.hero.attack(enemy);
			}
			else {
				enemy.attack(this.hero);
			}
			whosTurn = !whosTurn;
		}
		this.drawBattle(enemy);
		if(this.hero.isAlive()) {
			//*****check quest completion*****
			if(enemy.name === "The Master" && this.completeQuest(2)) {
				this.addText("The Master: \"Dude! You beat me! Radical! Now take this Health Potion and heal up!\"<br>");

				this.addQuest(3);
			}
			//********************************
			alert("Congradulations! You won!");
			//this.hideBattle();
			return true;
		}
		else {
			alert("Con-sad-ulations. You lost D:");
			this.hideBattle();
			return false;
		}
		this.drawBattle(enemy);
	}

	Game.prototype.drawBattle = function(enemy) {
		this.showBattle();
		//drawScene();
		console.log("Got here");



		// this.ctx.fillStyle='#000000';
		// this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		// this.ctx.strokeStyle='#FFFFFF';
		// this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);

		// var grd=this.ctx.createLinearGradient(0,this.canvas.height/2,0,this.canvas.height-15);
		// grd.addColorStop(0,"black");
		// grd.addColorStop(1,"#505050");

		// this.ctx.fillStyle=grd;
		// this.ctx.fillRect(1,this.canvas.height/2,this.canvas.width-2,this.canvas.height/2-1);

		// this.ctx.strokeStyle='#FFFFFF';
		// this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height/8);

		// this.ctx.fillStyle='#FFFFFF';
		// this.ctx.font="16px Verdana,Arial,sans-serif";
		// this.ctx.fillText("HP: " + this.hero.health + "/" + this.hero.maxHealth,15, this.canvas.height/13);

		// this.ctx.drawImage(this.sprites,0,0,75,100,25,this.canvas.height/2,75,100);
		// this.ctx.fillText(this.hero.name,50, this.canvas.height/2-20);
		// this.ctx.drawImage(this.sprites,75,0,75,100,this.canvas.width-100,this.canvas.height/2,75,100);
		// this.ctx.fillText(enemy.name,this.canvas.width-115, this.canvas.height/2-20);

	}

	Game.prototype.drawDialog = function(character, text) {
		this.ctx.fillStyle='#000000';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.strokeStyle='#FFFFFF';
		this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);

		this.addText(character.name + ": \"" + text + "\"<br>");

		this.ctx.strokeStyle='#FFFFFF';
		this.ctx.fillStyle='#FFFFFF';
		this.ctx.font="20px Verdana,Arial,sans-serif";

		this.ctx.strokeRect(50,100,this.canvas.width/2-100,this.canvas.height-150);
		this.ctx.drawImage(this.sprites,0,0,75,50,50,150,this.canvas.width/2-100,this.canvas.height-200);
		this.ctx.fillText(this.hero.name,this.canvas.width/4-10, this.canvas.height/5);

		this.ctx.strokeRect(this.canvas.width/2 + 50,100,this.canvas.width/2-100,this.canvas.height-150);
		this.ctx.drawImage(this.sprites,75,0,75,50,this.canvas.width/2+50,150,this.canvas.width/2-100,this.canvas.height-200);
		this.ctx.fillText(character.name,this.canvas.width/4*3-45, this.canvas.height/5);
	}

	Game.prototype.addQuest = function(id) {
		//this.addText("Quest Added: " + questDB[id].name + "<br>");//Currently makes scroll box very word-y
		this.hero.addQuest(questDB[id]);
		this.updateQuests();
	}

	Game.prototype.checkQuest = function(id) {
		if(this.hero.checkQuest(id)) {
			return true;
		}
		else
			return false;
	}

	Game.prototype.completeQuest = function(id) {
		if(this.hero.completeQuest(id)) {
			this.addText("Quest Complete: " + questDB[id].name + "<br>");
			this.updateEverything();
			return true;
		}
		else
			return false;
	}

	Game.prototype.getJSON = function() {
		var jsonString = ""
		return jsonString;
	}

	Game.prototype.loadJSON = function(jsonString) {
		var loadObject = jQuery.parseJSON(jsonString);
	}
}