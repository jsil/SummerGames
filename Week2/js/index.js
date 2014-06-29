$(document).ready(function() { 

	var canvas = document.getElementById("battleCanvas");

	$("#battleOption1").addClass("selectedOption");


	function resizeCanvas() {
	   // only change the size of the canvas if the size it's being displayed
	   // has changed.
	   var width = canvas.clientWidth;
	   var height = canvas.clientHeight;
	   if (canvas.width != width ||
	       canvas.height != height) {
	     // Change the size of the canvas to match the size it's being displayed
	     canvas.width = width;
	     canvas.height = height;
	   }
	}
	resizeCanvas();

	//$("#battleCanvas").hide();
	// $("#gameDiv").hide();
	var me = new Hero("Bob");	
	var myGame = new Game(me);
	//openModal("#nameModal");
	myGame.resizeGame();
	myGame.toggleBattle();
	myGame.startGame();

	//*********Code for Demo************
	myGame.addQuest(0);
	myGame.updateEverything();

	var exampleEnemy = new Character("The Master");


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
			myGame.startBattle(jQuery.extend(true, {}, exampleEnemy));
		}
		else
			myGame.drawDialog(exampleEnemy, "Now is not the time for fighting.");
	});

	$("#flexButton3").click(function(event) {
		myGame.showBattle();
	});

	$("#flexButton4").click(function(event) {
		myGame.hideBattle();	
	});

	$("#flexButton5").click(function(event) {
		myGame.startBattle(jQuery.extend(true, {}, characterDB[0]));
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
		//console.log(me.inventory[i].name);//TODO: open item detail modal
		myGame.addText(me.inventory[i].printView());
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
		if(i===-1) {
			console.log(me.getWeaponName());
			myGame.addText("You are holding " + me.getWeaponName() + ".");
		}
		else if(i===0) {
			console.log(me.getChestName());
			myGame.addText("You are wearing " + me.getChestName() + ".");
		}
		else if(i===1) {
			console.log(me.getLegsName());
			myGame.addText("You are wearing " + me.getLegsName() + ".");
		}
		if(i===2) {
			console.log(me.getHeadName());
			myGame.addText("You are wearing " + me.getHeadName() + ".");
		}
		if(i===3) {
			console.log(me.getFeetName());
			myGame.addText("You are wearing " + me.getFeetName() + ".");
		}
		if(i===4) {
			console.log(me.getNeckName());
			myGame.addText("You are wearing " + me.getNeckName() + ".");
		}
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
	    if($("#nameInput").val() != "") {

		    closeModal("#nameModal");
		    myGame.addText("Name: " + $("#nameInput").val());
		    me.name = $("#nameInput").val();
		}
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
			myGame.clearText();
			myGame.updateEverything();
			closeModal("#loadModal");
		}
	}

	$(window).resize(function(){
		myGame.resizeGame();
	});

	$(window).keypress(function(e) {
	  if (e.keyCode === 32 && myGame.canQT) {
	    myGame.landedQT = true;
	  }
	});

	$(window).keydown(function(e) {
	  if (e.keyCode === 37) {
	    selectOption(0);
	  }
	});

	$(window).keydown(function(e) {
	  if (e.keyCode === 39) {
	     selectOption(1);
	  }
	});

	$(window).keydown(function(e) {
	  if (e.keyCode === 38) {
	     selectOption(2);
	  }
	});

	$(window).keydown(function(e) {
	  if (e.keyCode === 40) {
	     selectOption(3);
	  }
	});

	selectOption = function(direction) {
		//0 - left
		//1 - right
		//2 - up
		//3 - down
		if($("#battleOption1").hasClass("selectedOption")) {
			if(direction === 1) {
				$("#battleOption1").removeClass("selectedOption");
				$("#battleOption2").addClass("selectedOption");
			}
			else if(direction === 3) {
				$("#battleOption1").removeClass("selectedOption");
				$("#battleOption3").addClass("selectedOption");
			}
		}
		else if($("#battleOption2").hasClass("selectedOption")) {
			if(direction === 0) {
				$("#battleOption2").removeClass("selectedOption");
				$("#battleOption1").addClass("selectedOption");
			}
			else if(direction === 3) {
				$("#battleOption2").removeClass("selectedOption");
				$("#battleOption4").addClass("selectedOption");
			}
		}
		else if($("#battleOption3").hasClass("selectedOption")) {
			if(direction === 2) {
				$("#battleOption3").removeClass("selectedOption");
				$("#battleOption1").addClass("selectedOption");
			}
			else if(direction === 1) {
				$("#battleOption3").removeClass("selectedOption");
				$("#battleOption4").addClass("selectedOption");
			}
		}
		else if($("#battleOption4").hasClass("selectedOption")) {
			if(direction === 0) {
				$("#battleOption4").removeClass("selectedOption");
				$("#battleOption3").addClass("selectedOption");
			}
			else if(direction === 2) {
				$("#battleOption4").removeClass("selectedOption");
				$("#battleOption2").addClass("selectedOption");
			}
		}
	}

	$(window).keypress(function(e) {
		if(myGame.waitingForInput) {
			console.log("got an input");
		    if (e.keyCode === 13) {
			  	if($("#battleOption1").hasClass("selectedOption")) {
		  			myGame.doAttack();
			  	}
			  	if($("#battleOption2").hasClass("selectedOption")) {
			  		console.log("2");
			  	}
			  	if($("#battleOption3").hasClass("selectedOption")) {
			  		console.log("3");
			  	}
			  	if($("#battleOption4").hasClass("selectedOption")) {
			  		console.log("run");
			  	}
		    }
		    else if(e.keyCode === 49) {
  				myGame.doAttack();
		    }
		    else if(e.keyCode === 50) {
		  		console.log("2");
		    }
		    else if(e.keyCode === 51) {
		  		console.log("3");
		    }
		    else if(e.keyCode === 52) {
		 	 	console.log("run");
		    }
		}
		else if(e.keyCode === 83 || e.keyCode === 115) {//save
			myGame.updateSaves();
			openModal("#saveModal");
		}
		else if(e.keyCode === 76 || e.keyCode === 108) {//load
			myGame.updateLoads();
			openModal("#loadModal");
		}
		else if(e.keyCode === 68 || e.keyCode === 100) {//debug
			myGame.updateDebug();
			openModal("#debugModal");
		}
		else if(e.keyCode === 69 || e.keyCode === 101) {//equipment
			$("#sidePanel").tabs({active: 1});
		}
		else if(e.keyCode === 73 || e.keyCode === 105) {//inventory
			$("#sidePanel").tabs({active: 2});
		}
		else if(e.keyCode === 81 || e.keyCode === 113) {//quests
			$("#sidePanel").tabs({active: 3});
		}
	});

	$("#battleOption1").click(function(event) {
		event.preventDefault();
		if(myGame.waitingForInput) {
	  			myGame.doAttack();
	  		}
	});

	$("#battleOption2").click(function(event) {
		event.preventDefault();
	});

	$("#battleOption3").click(function(event) {
		event.preventDefault();
	});

	$("#battleOption4").click(function(event) {
		event.preventDefault();
	});
});