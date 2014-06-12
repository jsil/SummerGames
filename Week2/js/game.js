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
	this.optionsPanel = $("#optionsPanel");

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		this.addText("Welcome! This game is just getting started!");
		this.updateStats();
	}

	Game.prototype.resizeGame = function() {


		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		this.ctx.fillStyle='#FF0000';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

		this.sideContent.css("width", this.gameDiv.width()*.35-2);
		this.sideContent.css("height", this.gameDiv.height()+12);
		//sideContent.height('100%');

		
		this.sidePanel.width('100%');
		this.sidePanel.css("height", this.gameDiv.height()*.65+3);

		this.bottomPanel.css("width", this.gameDiv.width()*.65);
		this.bottomPanel.css("height", this.gameDiv.height()*.35+2);

		
		this.optionsPanel.width('100%');
		this.optionsPanel.css("height", this.gameDiv.height()*.35);


	}

	Game.prototype.addText = function(text) {
		if(this.bottomPanel.html() != "") {
			this.bottomPanel.html(this.bottomPanel.html() + "<br>" + text);
	    }
	    else {
	    	this.bottomPanel.html(this.bottomPanel.html() + text);
	    }
	    this.bottomPanel.animate({ scrollTop: this.bottomPanel.height() }, "fast");

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
			if(i===0)
				listText = listText + this.quests[i].printInfo();
			else
				listText = listText + "<br>" + this.inventory[i].printInfo();
		}
		return listText;
	}
}

function Item(name) {
	this.name = name;
	this.price = 40;

	Item.prototype.takeItem = function() {
		console.log("took item");
	}
}

function Consumable(name) {
	this.name = name;
	this.price = 40;

	Consumable.prototype.consume = function() {
		console.log("consumed");
	}
}
Consumable.prototype = Item.prototype;
Consumable.prototype.constructor = Consumable;

function Equipable(name) {
	this.name = name;
	this.price = 40;

	Equipable.prototype.equip = function() {
		console.log("equiped");
	}

	Equipable.prototype.unequip = function() {
		console.log("unequiped");
	}

}
Equipable.prototype = Item.prototype;
Equipable.prototype.constructor = Consumable;


function Quest() {
	this.name = "";
	this.description = "";
	this.reward = [];

	Quest.prototype.printInfo = function() {
		var questText = this.name + " - <br>" + this.description + "<br>Reward: none.";
		//print rewards
		return questText;
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
	myGame.updateQuests();

	$("#nameSubmit").click(function(event){
	    event.preventDefault();
	    closeModal("#nameModal");
	    myGame.addText("Name: " + $("#nameInput").val());
	});

	// $(window).resize(function(){
	// 	myGame.resizeGame();
	// });

});

