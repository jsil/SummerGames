jQuery(function() {
jQuery("#sidePanel").tabs();
});

function Game(hero) {
	this.hero = hero;
	this.gameDiv = $("#gameDiv");
	this.canvas = document.getElementById("myCanvas");
	this.ctx = this.canvas.getContext('2d');
	this.sideContent = $("#sideContent");
	this.sidePanel = $("#sidePanel");
	this.bottomPanel = $("#bottomPanel");
	this.scrollBox = $("#scrollBox");
	this.optionsPanel = $("#optionsPanel");

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		this.addText("Welcome! This game is just getting started!");
		this.updateStats();
	}

	Game.prototype.resizeGame = function() {//TODO: resize statbox,questbox,inventorybox

		this.gameDiv.width("99%");
		this.gameDiv.height("97%")


		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		this.ctx.fillStyle='#FF0000';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

		this.sideContent.css("width", this.gameDiv.width()*.35-2);
		this.sideContent.css("height", this.gameDiv.height()-2);
		//sideContent.height('100%');

		
		this.sidePanel.width('100%');
		this.sidePanel.css("height", this.gameDiv.height()*.65+3);

		this.bottomPanel.css("width", this.gameDiv.width()*.65);
		this.bottomPanel.css("height", this.gameDiv.height()*.35-6);

		
		this.optionsPanel.width('100%');
		this.optionsPanel.css("height", this.gameDiv.height()*.35-8);


	}

	Game.prototype.addText = function(text) {
		if(this.scrollBox.html() != "") {
			this.scrollBox.html(this.scrollBox.html() + "<br>" + text);
	    }
	    else {
	    	this.scrollBox.html(this.scrollBox.html() + text);
	    }
	    this.scrollBox.animate({ scrollTop: this.scrollBox.height() }, "fast");

	}

	Game.prototype.clearText = function() {
		this.bottomPanel.html("");
	}

	Game.prototype.updateStats = function() {
		$("#healthStat").html(this.hero.health + "/" + this.hero.maxHealth);
		$("#goldStat").html(this.hero.gold + " G");
		$("#weaponName").html(this.hero.getWeaponName());
		$("#chestName").html(this.hero.getChestName());
		$("#legsName").html(this.hero.getLegsName());
		$("#headName").html(this.hero.getHeadName());
		$("#feetName").html(this.hero.getFeetName());
		$("#neckName").html(this.hero.getNeckName());
	}

	Game.prototype.updateEquipment = function() {
		$("#inventoryBox").html(this.hero.printInventory());
	}

	Game.prototype.updateQuests = function () {
		$("#questBox").html(this.hero.printActiveQuests());
	}

	Game.prototype.updateSaves = function() {
		var saveNames = document.getElementsByClassName("saveName");
		for(var i=0;i<saveNames.length;i++) {
			var date = JSON.parse(gameSaves[i].save).date;
			if(date != null)
				saveNames[i].innerHTML = date;
			else
				saveNames[i].innerHTML = "(No save data)";
		}
	}

	Game.prototype.doBattle = function(enemy) {
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

		if(this.hero.isAlive()) {
			alert("Congradulations! You won!");
		}
		else {
			alert("Con-sad-ulations. You lost D:");
		}

	},

	Game.prototype.getJSON = function() {
		var jsonString = ""
		return jsonString;
	},

	Game.prototype.loadJSON = function(jsonString) {
		var loadObject = jQuery.parseJSON(jsonString);
		console.log(loadObject);
	}
}

$(document).ready(function() { 


	var me = new Hero("Bob");	
	var myGame = new Game(me);
	myGame.startGame();
	myGame.resizeGame();

	var exampleItem = new Weapon("Sword");
	var examplePotion = new Consumable("Health Pot");
	var exampleArmor1 = new Armor("Chestplate", 0);
	var exampleArmor2 = new Armor("Armored Leggings", 1);
	var exampleArmor3 = new Armor("Cheeky Hat", 2);
	var exampleArmor4 = new Armor("Dumb Boots", 3);
	var exampleArmor5 = new Armor("Stupid Necklace", 4);

	exampleItem.takeItem();
	examplePotion.takeItem();

	me.addToInventory(exampleItem);
	me.addToInventory(examplePotion);
	me.addToInventory(exampleArmor1);
	me.addToInventory(exampleArmor2);
	me.addToInventory(exampleArmor3);
	me.addToInventory(exampleArmor4);
	me.addToInventory(exampleArmor5);

	me.equipArmor(me.inventory[6]);
	me.equipArmor(me.inventory[5]);
	me.equipArmor(me.inventory[4]);
	me.equipArmor(me.inventory[3]);
	me.equipArmor(me.inventory[2]);
	me.consume(me.inventory[1]);
	me.equipWeapon(me.inventory[0]);

	me.unequipArmor(0);
	me.unequipArmor(1);
	me.unequipArmor(2);
	me.unequipArmor(3);
	me.unequipArmor(4);
	myGame.updateStats();

	//console.log(me.printInventory());

	myGame.updateEquipment();

	var exampleQuest = new Quest();
	exampleQuest.name = "Example Quest";
	exampleQuest.description = "Example Description!";

	me.addQuest(exampleQuest);
	me.addQuest(questDB[0]);
	myGame.updateQuests();

	//console.log(me.getJSON());

	var exampleEnemy = new Character();


	gameSaves[1].writeSave(myGame,me);
	//console.log(getCookie());
	//myGame.doBattle(exampleEnemy);

	$("#nameSubmit").click(function(event) {
	    event.preventDefault();
	    closeModal("#nameModal");
	    myGame.addText("Name: " + $("#nameInput").val());
	});

	$("#saveButton").click(function(event) {
		event.preventDefault();
		myGame.updateSaves();
		openModal("#saveModal");
	});

	$("#loadButton").click(function(event) {
		event.preventDefault();
		openModal("#loadModal");
	});

	$("#eraseButton").click(function(event) {
		event.preventDefault();
		eraseCookie();
		console.log("Cookie data erased");
		console.log(jQuery.parseJSON(getCookie()));
	});

	$(window).resize(function(){
		myGame.resizeGame();
	});

});

