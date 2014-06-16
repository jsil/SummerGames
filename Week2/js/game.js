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
	this.sprites = document.getElementById("sprites");

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		this.addText("Welcome to the Demo! Have fun!<br><br>The novice adventurer " + this.hero.name + " has finally arrived at The Grand Dojo, home of the best adventurer-trainer known to man: The Master.<br>");
		this.updateStats();
		//this.drawBattle();
	}

	Game.prototype.resizeGame = function() {//TODO: resize statbox,questbox,inventorybox

		this.gameDiv.width("99%");
		this.gameDiv.height("97%")


		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		// this.ctx.fillStyle='#000000';
		// this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);


		//dialog
		// this.ctx.strokeStyle='#FFFFFF';
		// this.ctx.strokeRect(0,5,this.canvas.width/4,this.canvas.height/3*2-15);

		// this.ctx.strokeStyle='#FFFFFF';
		// this.ctx.strokeRect(this.canvas.width/4*3,5,this.canvas.width/4,this.canvas.height/3*2-15);

		// this.ctx.strokeStyle='#FFFFFF';
		// this.ctx.strokeRect(0,(this.canvas.height/3)*2-5,this.canvas.width,this.canvas.height/3-5);




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
	    this.scrollBox.animate({ scrollTop: this.scrollBox.prop('scrollHeight') }, "fast");

	}

	Game.prototype.clearText = function() {
		this.scrollBox.html("");
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
			//console.log("" + JSON.stringify(gameSaves[i].save));
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

		if(this.hero.isAlive()) {
			//*****check quest completion*****
			if(enemy.name === "The Master" && this.completeQuest(2)) {
				this.addText("Dude! You beat me! Radical! Now take this Health Potion and heal up!");

				this.addQuest(3);
			}
			//********************************
			alert("Congradulations! You won!");
			return true;
		}
		else {
			alert("Con-sad-ulations. You lost D:");
			return false;
		}
		this.drawBattle(enemy);
	}

	Game.prototype.drawBattle = function(enemy) {
		//battle

		this.ctx.fillStyle='#000000';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.strokeStyle='#FFFFFF';
		this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);

		var grd=this.ctx.createLinearGradient(0,this.canvas.height/2,0,this.canvas.height-15);
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"#505050");

		this.ctx.fillStyle=grd;
		this.ctx.fillRect(1,this.canvas.height/2,this.canvas.width-2,this.canvas.height/2-1);

		this.ctx.strokeStyle='#FFFFFF';
		this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height/8);

		this.ctx.fillStyle='#FFFFFF';
		this.ctx.font="16px Verdana,Arial,sans-serif";
		this.ctx.fillText("HP: " + this.hero.health + "/" + this.hero.maxHealth,15, this.canvas.height/13);


		this.ctx.drawImage(this.sprites,0,0,75,100,25,this.canvas.height/2,75,100);
		this.ctx.fillText(this.hero.name,50, this.canvas.height/2-20);
		this.ctx.drawImage(this.sprites,75,0,75,100,this.canvas.width-100,this.canvas.height/2,75,100);
		this.ctx.fillText(enemy.name,this.canvas.width-115, this.canvas.height/2-20);

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
			this.addText("Quest Completed: " + questDB[id].name + "<br>");
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
		//console.log(loadObject);
	}
}

$(document).ready(function() { 


	//openModal("#nameModal");//TODO:select name
	var me = new Hero("Bob");	
	var myGame = new Game(me);
	myGame.resizeGame();
	myGame.startGame();

	//*********Code for Demo************

	myGame.addQuest(0);

	var exampleEnemy = new Character("The Master");

	myGame.updateEverything();



	$("#flexButton1").click(function(event) {
		if(myGame.completeQuest(0)) {
			myGame.drawDialog(exampleEnemy, "Hello " + me.name + ". I've been expecting you. For your first task, take this sword and equip it.");
			myGame.addQuest(1);
		}
		else
			myGame.drawDialog(exampleEnemy, "Now is not the time for words.");

	});

	$("#flexButton2").click(function(event) {
		if(myGame.checkQuest(2)) {
			myGame.doBattle(exampleEnemy);
		}
		else
			myGame.drawDialog(exampleEnemy, "Now is not the time for fighting.");

	});

	$("#flexButton3").click(function(event) {


	});

	$("#flexButton4").click(function(event) {


	});


	//*********************************

	debugAddItem = function(itemNum) {
		myGame.hero.addToInventory(armoryDB[itemNum]);
		myGame.updateInventory();
	}

	debugAddQuest = function(questNum) {
		myGame.hero.addQuest(questDB[questNum]);
		myGame.updateQuests();
	}

	viewButtonItem = function(i) {
		console.log(me.inventory[i].name);//TODO: open item detail modal
	}

	equipButton = function(i) {
		//*******Check quest stuff*******
		if(me.inventory[i].id === 000) {
			myGame.completeQuest(1);
			myGame.drawDialog(exampleEnemy, "Excellent, now fight me, unless you're scaaaaaaared!!!");
			myGame.addQuest(2);
		}
		//********************************

		if(me.inventory[i].isWeapon())
				me.equipWeapon(me.inventory[i]);
		else if(me.inventory[i].isArmor())
			me.equipArmor(me.inventory[i]);
		myGame.updateEverything();
	}

	consumeButton = function(i) {
		//*******Check quest stuff*******
		if(me.inventory[i].id === 200) {
			myGame.completeQuest(3);
			myGame.drawDialog(exampleEnemy, "I hope that left a good taste in your mouth, because this is the abrupt end of the demo. For making it through the demo, you have earned this dumb trinket. Wear it proudly, " + me.name + ".");
		}
		//********************************
		me.consume(me.inventory[i]);
		myGame.updateEverything();
	}

	viewButtonEquipment = function(i) {//TODO: open item detail modal
		i = parseInt(i);
		if(i===-1)
			console.log(me.getWeaponName());
		else if(i===0)
			console.log(me.getChestName());
		else if(i===1)
			console.log(me.getLegsName());
		if(i===2)
			console.log(me.getHeadName());
		if(i===3)
			console.log(me.getFeetName());
		if(i===4)
			console.log(me.getNeckName());
	}

	unequipButton = function(i) {
		i = parseInt(i);
		if(i===-1)
			me.unequipWeapon();
		else
			me.unequipArmor(i);
		myGame.updateEverything();
	}

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
		myGame.updateLoads();
		openModal("#loadModal");
	});

	$("#eraseButton").click(function(event) {
		event.preventDefault();
		eraseCookie();
		console.log("Cookie data erased");
		console.log(jQuery.parseJSON(getCookie()));
	});

	$("#debugButton").click(function(event) {
		event.preventDefault();
		myGame.updateDebug();
		openModal("#debugModal");
	});

	$("#armoryButton").click(function(event) {
		event.preventDefault();
		closeModal("#debugModal");
		openModal("#armoryModal");
	});

	$("#questButton").click(function(event) {
		event.preventDefault();
		closeModal("#debugModal");
		openModal("#questModal");
	});

	$("#clearButton").click(function(event) {
		event.preventDefault();
		myGame.clearText();
	});

	var saveModalButtons = document.getElementsByClassName("saveModalButton");
	for(var i=0;i<saveModalButtons.length;i++) {
		saveModalButtons[i].onclick = function() {
			console.log("Saving in Slot " + (parseInt(this.getAttribute("data-num")) + 1));
			gameSaves[this.getAttribute("data-num")].writeSave(myGame,me);
			myGame.updateSaves();
		}
	}

	var loadModalButtons = document.getElementsByClassName("loadModalButton");
	for(var i=0;i<loadModalButtons.length;i++) {
		loadModalButtons[i].onclick = function() {
			console.log("Loading in Slot " + (parseInt(this.getAttribute("data-num")) + 1));
			myGame.loadJSON(gameSaves[this.getAttribute("data-num")].getGameJSON());
			me.loadJSON(gameSaves[this.getAttribute("data-num")].getHeroJSON());
			myGame.updateEverything();
			closeModal("#loadModal");
		}
	}

	// function hidestatus() {//hide status bar
	// 	window.status='';
	// 	return true;
	// }
	// if (document.layers) {
	// 	document.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
	// 	document.onmouseover=hidestatus;
	// 	document.onmouseout=hidestatus;
	// }


	$(window).resize(function(){
		myGame.resizeGame();
	});

});

