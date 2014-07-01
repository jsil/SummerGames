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
	this.toastHolder2 = $("#toastHolder2");//may be problematic & moved to battle
	this.battleToast2 = $("#battleToast2");//may be problematic & moved to battle

	this.sideContent = $("#sideContent");
	this.sidePanel = $("#sidePanel");
	this.bottomPanel = $("#bottomPanel");
	this.scrollBox = $("#scrollBox");
	this.optionsPanel = $("#optionsPanel");


	//Battle

	this.waitingForInput = false;
	this.whosTurn = true;

	this.canQT = false;
	this.landedQT = false;


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
		$("#levelStat").html(this.hero.level);
		$("#xpStat").html(this.hero.experience);
	}

	Game.prototype.updateInventory = function() {
		var that = this;
		$("#inventoryBox").html(this.hero.printInventory());
		var viewButtons = document.getElementsByClassName("itemViewButton");
		for(var i=0;i<viewButtons.length;i++) {
			viewButtons[i].onclick = function() {
				event.preventDefault();
				that.addText(that.hero.inventory[this.getAttribute("data-num")].printView());
			}
		}
		var equipButtons = document.getElementsByClassName("itemEquipButton");
		for(var i=0;i<equipButtons.length;i++) {
			equipButtons[i].onclick = function() {
				event.preventDefault();
				//*******Check quest stuff*******
				if(that.hero.inventory[this.getAttribute("data-num")].id === 000) {
					that.completeQuest(1);
					that.drawDialog(characterDB[1], "Excellent, now fight me, unless you're scaaaaaaared!!!");
					that.addQuest(2);
				}
				//********************************

				if(that.hero.inventory[this.getAttribute("data-num")].isWeapon())
						that.hero.equipWeapon(that.hero.inventory[this.getAttribute("data-num")]);
				else if(that.hero.inventory[this.getAttribute("data-num")].isArmor())
					that.hero.equipArmor(that.hero.inventory[this.getAttribute("data-num")]);
				that.updateEverything();
			}
		}
		var consumeButtons = document.getElementsByClassName("itemConsumeButton");
		for(var i=0;i<consumeButtons.length;i++) {
			consumeButtons[i].onclick = function() {
				event.preventDefault();
				//consumeButton(this.getAttribute("data-num"));
				//*******Check quest stuff*******
				if(that.hero.inventory[this.getAttribute("data-num")].id === 200) {
					that.completeQuest(3);
					that.drawDialog(characterDB[1], "I hope that left a good taste in your mouth, because this is the abrupt end of the demo. For making it through the demo, you have earned this dumb trinket. Wear it proudly, " + that.hero.name + ".");
				}
				//********************************
				that.hero.consume(that.hero.inventory[this.getAttribute("data-num")]);
				that.updateEverything();
			}
		}
	}

	Game.prototype.updateEquipment = function() {
		var that = this;
		$("#equipmentBox").html(this.hero.printEquipment());
		var viewButtons = document.getElementsByClassName("equipmentViewButton");
		for(var i=0;i<viewButtons.length;i++) {
			viewButtons[i].onclick = function() {//TODO: Descriptions are now part of item objects, so this isn't needed. Rewrite it!
				event.preventDefault();
				var type = parseInt(this.getAttribute("data-num"));
				if(type===-1) {
					console.log(that.hero.getWeaponName());
					that.addText("You are holding " + that.hero.getWeaponName() + ".");
				}
				else if(type===0) {
					console.log(that.hero.getChestName());
					that.addText("You are wearing " + that.hero.getChestName() + ".");
				}
				else if(type===1) {
					console.log(that.hero.getLegsName());
					that.addText("You are wearing " + that.hero.getLegsName() + ".");
				}
				if(type===2) {
					console.log(that.hero.getHeadName());
					that.addText("You are wearing " + that.hero.getHeadName() + ".");
				}
				if(type===3) {
					console.log(that.hero.getFeetName());
					that.addText("You are wearing " + that.hero.getFeetName() + ".");
				}
				if(type===4) {
					console.log(that.hero.getNeckName());
					that.addText("You are wearing " + that.hero.getNeckName() + ".");
				}
			}
		}
		var unequipButtons = document.getElementsByClassName("equipmentUnequipButton");
		for(var i=0;i<unequipButtons.length;i++) {
			unequipButtons[i].onclick = function() {
				event.preventDefault();
				var type = parseInt(this.getAttribute("data-num"));
				if(type===-1)
					that.hero.unequipWeapon();
				else
					that.hero.unequipArmor(type);
				that.updateEverything();
			}
		}
	}

	Game.prototype.updateQuests = function () {
		$("#questBox").html(this.hero.printActiveQuests());
		$("#completedQuestBox").html(this.hero.printCompletedQuests());
	}

	Game.prototype.updateSaves = function() {
		var that = this;
		var saveNames = document.getElementsByClassName("saveName");
		for(var i=0;i<saveNames.length;i++) {
			if(gameSaves[i].save != "[]")
				saveNames[i].innerHTML = JSON.parse(gameSaves[i].save).date;
			else
				saveNames[i].innerHTML = "(No save data)";
		}
		var saveModalButtons = document.getElementsByClassName("saveModalButton");
		for(var i=0;i<saveModalButtons.length;i++) {
			saveModalButtons[i].onclick = function() {
				console.log("Saving in Slot " + (parseInt(this.getAttribute("data-num")) + 1));
				gameSaves[this.getAttribute("data-num")].writeSave(that,that.hero);
				that.updateSaves();
			}
		}
	}

	Game.prototype.updateLoads = function() {
		var that = this;
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
		var loadModalButtons = document.getElementsByClassName("loadModalButton");
		for(var i=0;i<loadModalButtons.length;i++) {
			loadModalButtons[i].onclick = function() {
				console.log("Loading in Slot " + (parseInt(this.getAttribute("data-num")) + 1));
				that.loadJSON(gameSaves[this.getAttribute("data-num")].getGameJSON());
				that.hero.loadJSON(gameSaves[this.getAttribute("data-num")].getHeroJSON());
				that.clearText();
				that.updateEverything();
				closeModal("#loadModal");
			}
		}
	}

	Game.prototype.updateDebug = function() {
		var that = this;
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
				that.hero.addToInventory(armoryDB[this.getAttribute("data-num")]);
				that.updateInventory();
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
				that.hero.addQuest(questDB[this.getAttribute("data-num")]);
				that.updateQuests();
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