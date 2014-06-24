jQuery(function() {
jQuery("#sidePanel").tabs();
});

function Game(hero) {

	//General
	this.hero = hero;
	this.canvas = document.getElementById("myCanvas");//display & dialog
	this.ctx = this.canvas.getContext('2d');//only used in dialog currently

	this.currentEnemy = [];//battle & display

	//Display
	this.gameDiv = $("#gameDiv");
	this.battleCanvas = $("#battleCanvas");
	this.battleCanvas2 = document.getElementById("battleCanvas");
	this.battleHUD = $("#battleHUD");
	this.battleMenu = $("#battleMenu");
	this.toastHolder = $("#toastHolder");//may be problematic & moved to battle
	this.battleToast = $("#battleToast");//may be problematic & moved to battle

	this.sideContent = $("#sideContent");
	this.sidePanel = $("#sidePanel");
	this.bottomPanel = $("#bottomPanel");
	this.scrollBox = $("#scrollBox");
	this.optionsPanel = $("#optionsPanel");


	//Battle

	this.waitingForInput = false;
	this.whosTurn = true;


	//Dialog

	this.sprites = document.getElementById("sprites");
	

	//*********************General*********************

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		this.addText("Welcome to the Demo! Have fun!<br><br>The novice adventurer " + this.hero.name + " has finally arrived at The Grand Dojo, home of the best adventurer-trainer known to man: The Master.<br>");
		this.updateStats();
		//this.drawBattle();
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