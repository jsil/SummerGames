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



	$("#flexButton1").click(function(event) {
		if(myGame.completeQuest(0)) {
			myGame.drawDialog(characterDB[1], "Hello " + me.name + ". I've been expecting you. For your first task, take this sword and equip it.");
			myGame.addQuest(1);
		}
		else
			myGame.drawDialog(characterDB[1], "Now is not the time for words.");
	});

	$("#flexButton2").click(function(event) {
		if(myGame.checkQuest(2)) {
			myGame.startBattle(jQuery.extend(true, {}, characterDB[1]));
		}
		else
			myGame.drawDialog(characterDB[1], "Now is not the time for fighting.");
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


	$(function(){//handling/disabling backspace
	    /*
	     * this swallows backspace keys on any non-input element.
	     * stops backspace -> back
	     */
	    var rx = /INPUT|SELECT|TEXTAREA/i;

	    $(document).bind("keydown keypress", function(e){
	        if( e.which == 8 ){ // 8 == backspace
	            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
	                e.preventDefault();
	                if($("#saveModal").is(':visible')) {
	                	closeModal("#saveModal");
	                }
	                else if($("#loadModal").is(':visible')) {
	                	closeModal("#loadModal");
	                }
	                else if($("#debugModal").is(':visible')) {
	                	closeModal("#debugModal");
	                }
	                else if($("#armoryModal").is(':visible')) {
	                	closeModal("#armoryModal");
	                	openModal("#debugModal");
	                }
	                else if($("#questModal").is(':visible')) {
	                	closeModal("#questModal");
	                	openModal("#debugModal");
	                }
	                else if($("#useModal").is(':visible')) {
	                	closeModal("#useModal");
	                	$("#useDiv").html("You currently have no consumable items.");
	                }
	            }
	        }
	    });
	});

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
		    if (e.keyCode === 13 || e.keyCode === 32) {
			  	if($("#battleOption1").hasClass("selectedOption")) {
		  			myGame.doAttack();
			  	}
			  	if($("#battleOption2").hasClass("selectedOption")) {
	  				myGame.openUseMenu();
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
		  		myGame.openUseMenu();
		    }
		    else if(e.keyCode === 51) {
		  		console.log("3");
		    }
		    else if(e.keyCode === 52) {
		 	 	console.log("run");
		    }
		}
		else if($("#saveModal").is(':visible')) {
			if(e.keyCode >= 48 && e.keyCode <= 57) {//if 1-9 is selected
				if(e.keyCode != 48)
					gameSaves[e.keyCode - 49].writeSave(myGame,me);
				else//if 0 (10) is selected
					gameSaves[9].writeSave(myGame,me);
				myGame.updateSaves();
			}
		}
		else if($("#loadModal").is(':visible')) {
			if(e.keyCode >= 48 && e.keyCode <= 57) {//if 1-9 is selected
				if(e.keyCode != 48) {
					myGame.loadJSON(gameSaves[e.keyCode - 49].getGameJSON());
					me.loadJSON(gameSaves[e.keyCode - 49].getHeroJSON());
				}
				else {//if 0 (10) is selected
					myGame.loadJSON(gameSaves[9].getGameJSON());
					me.loadJSON(gameSaves[9].getHeroJSON());
				}
				myGame.clearText();
				myGame.updateEverything();
				closeModal("#loadModal");
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
		if(myGame.waitingForInput) {
	  			myGame.openUseMenu();
	  		}
	});

	$("#battleOption3").click(function(event) {
		event.preventDefault();
	});

	$("#battleOption4").click(function(event) {
		event.preventDefault();
	});
});