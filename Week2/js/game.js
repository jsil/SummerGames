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

	Game.prototype.resizeGame = function() {

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
	}

	Game.prototype.updateEquipment = function() {
		$("#inventoryBox").html(this.hero.printInventory());
	}

	Game.prototype.updateQuests = function () {
		$("#questBox").html(this.hero.printActiveQuests());
	}
}

function Hero() {
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;


	this.inventory = [];
	this.quests = [];

	Hero.prototype.addToInventory = function(item) {
		this.inventory.push(item);
	}

	Hero.prototype.printInventory = function() {
		var listText = "";
		for(var i=0;i<this.inventory.length;i++) {
			if(i===0)
				listText = listText + this.inventory[i].name;
			else
				listText = listText + "<br>" + this.inventory[i].name;
		}
		return listText;
	}

	Hero.prototype.addQuest = function(quest) {
		this.quests.push(quest);
	}

	Hero.prototype.printActiveQuests = function() {
		var listText = "";
		for(var i=0;i<this.quests.length;i++) {
			if(i===0) {
				listText = listText + this.quests[i].printInfo();
			}
			else {
				listText = listText + "<br><br>" + this.quests[i].printInfo();
			}
		}
		return listText;
	}
}

$(document).ready(function() { 


	var me = new Hero();	
	var myGame = new Game(me);
	myGame.startGame();
	myGame.resizeGame();

	var exampleItem = new Item("Sword");
	var examplePotion = new Consumable("Health Pot");

	exampleItem.takeItem();
	examplePotion.takeItem();
	console.log(examplePotion.price);

	me.addToInventory(exampleItem);
	me.addToInventory(examplePotion);

	console.log(me.printInventory());

	myGame.updateEquipment();

	var exampleQuest = new Quest();
	exampleQuest.name = "Example Quest";
	exampleQuest.description = "Example Description!";

	me.addQuest(exampleQuest);
	me.addQuest(questDB[0]);
	myGame.updateQuests();

	$("#nameSubmit").click(function(event) {
	    event.preventDefault();
	    closeModal("#nameModal");
	    myGame.addText("Name: " + $("#nameInput").val());
	});

	$("#saveButton").click(function(event) {
		event.preventDefault();
		openModal("#saveModal");
	});

	$("#loadButton").click(function(event) {
		event.preventDefault();
		alert("Loading not yet implemented");
	});

	$("#eraseButton").click(function(event) {
		event.preventDefault();
		eraseCookie();
		console.log(jQuery.parseJSON(getCookie()));
	});

	$(window).resize(function(){
		myGame.resizeGame();
	});

});

