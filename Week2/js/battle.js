	//*********************Battle*********************

	Game.prototype.advanceTurn = function() {
		this.whosTurn = !this.whosTurn;
		this.landedQT = false;
	}

	Game.prototype.doAttack = function() {
		var that = this;

		this.waitingForInput = false;
		this.hideHUD();
		this.zoomOut();
		console.log("attacking");
		setTimeout(function() {
			that.animateAttack();
		},800);
		// setTimeout(function() {
		// 	console.log("attacked");
		// 	that.toast("You hit " + that.currentEnemy.name + " for " + that.hero.attack(that.currentEnemy) + " damage!", 1000);
		// 	setTimeout(function() {
		// 		that.waitingForInput = false;
		// 		that.advanceTurn();
		// 	}, 1000);
		// }, 1000);

	}

	Game.prototype.startBattle = function(enemy) {
		webGLStart();
		this.currentEnemy = enemy;
		this.drawBattle(this.currentEnemy);

		if(this.hero.speed >= this.currentEnemy.speed) {
			this.whosTurn = true;
		}
		else {
			this.whosTurn = false;
		}
		this.showBattle();
		this.waitingForInput = true;
		console.log("Started Battle");
		jQuery.proxy(this.doBattle(), this);
		//this.doBattle(this);
	} 

	Game.prototype.doBattle = function() {
		// console.log("Doing Battle!");

		var that = this;
		
		//this.battleLoop();
		//this.waitingForInput = false;

		this.drawBattle(this.currentEnemy);
		if(this.hero.isAlive() && this.currentEnemy.isAlive()) {
				if(!this.whosTurn) {
					this.advanceTurn();
					console.log("Enemy is attacking!");
					setTimeout(function(){
						that.toast(that.currentEnemy.name + " hit you for " + that.currentEnemy.attack(that.hero) + " damage!", 1000);
						console.log("Enemy attacked!")
						that.drawBattle(that.currentEnemy);
						setTimeout(function(){
							that.zoomIn();
						}, 1000);
						setTimeout(function(){
							that.showHUD();
						}, 1250);
						setTimeout(function() {
							that.waitingForInput = true;
						}, 1250);
					}, 1000);
				}
				setTimeout(function(){that.doBattle()}, 100);
		}
		else {
			this.waitingForInput = false;
			if(this.hero.isAlive()) {
				//*****check quest completion*****
				if(this.currentEnemy.name === "The Master" && this.completeQuest(2)) {
					this.addText("The Master: \"Dude! You beat me! Radical! Now take this Health Potion and heal up!\"<br>");

					this.addQuest(3);
				}
				//********************************
				var leveledUp = this.hero.giveXP(this.currentEnemy.xpReward);
				var rewardList = this.currentEnemy.giveRewards();
				if(rewardList.length > 0) {
					this.hero.addToInventory(rewardList);
					var toastString = "Acquired: ";
					for(var i=0;i<rewardList.length;i++) {
						if(i===0)
							toastString += rewardList[i].name;
						else
							toastString += ", " + rewardList[i].name;
					}
					toastString += "!";
					setTimeout(function(){
						that.toast2(toastString,4000);
					}, 2000);
				}
				if(!leveledUp) {
					setTimeout(function(){
						that.toast(that.currentEnemy.name + " defeated. " + that.currentEnemy.xpReward + " XP gained.",4000);
						that.drawBattle();
					}, 1000);
				}
				else {
					setTimeout(function(){
						that.toast(that.currentEnemy.name + " defeated. " + that.currentEnemy.xpReward + " XP gained. Level Up!",4000);
						that.drawBattle();
					}, 1000);
				}
				setTimeout(function(){
					that.hideBattle();
					that.zoomIn();	
				}, 5000);
				console.log(this.hero.experience + "XP");
				this.updateEverything();
				return true;
			}
			else {
				setTimeout(function(){that.toast("Con-sad-ulations! You Lost!",4000)}, 1000);
				setTimeout(function(){that.hideBattle()}, 5000);
				return false;
			}
		}

		this.drawBattle(this.currentEnemy);
		//callback();
	}


    Game.prototype.zoomOut = function() {
    	var that = this;
        if(zoom >= -2.0) {
            zoom -= 0.05;
            setTimeout(function(){that.zoomOut()}, 10);
        }
    }

    Game.prototype.zoomIn = function() {
    	var that = this;
        if(zoom <= 0.0) {
            zoom += 0.05;
            setTimeout(function(){that.zoomIn()}, 10);
        }
    }

    Game.prototype.getEnemyImage = function() {
    	return "./img/hero.png";
    }

    // Game.prototype.animateAttack = function() {
    // 	this.animateAttack(0);
    // 	console.log("started animating");
    // }
 
    Game.prototype.animateAttack = function(frame) {
    	var that = this;
    	if(null == frame) {
    		this.animateAttack(0);
    		this.toast2("Hit the space bar to be extra cool!", 1500);
    	}
    	else if(frame < 170) {
    		console.log(frame);
    		frame++;
    		if(frame <= 40) {
    			heroX += 0.1;
    		}
    		else if(frame > 60 && frame <= 120) {
    			heroX = ((frame-60)/14)+ 4;
    			if(frame <= 100) {
    				heroY = (-0.004*((frame-60)*(frame-60)))+(frame-60)*0.20;
    				// if(frame === 100)
    				// 	console.log("HERO Y: " + heroY);
    				if(frame === 90) {
    					this.canQT = true;
    					showIndicator = true;
    				}
    			}
    			else if(frame > 100 && frame <=119) {
    				if(frame === 105) {
    					this.canQT = false;
    					if(!this.landedQT) {
    						this.toast2("Hit " + this.currentEnemy.name + " for " + this.hero.jumpAttack(this.currentEnemy, this.landedQT) + " damage!", 1000);
    						showIndicator = false;
    					}
    				}
					heroY = (-0.006*((frame-100)*(frame-100)))+(frame-100)*0.03 + 1.6;
    			}
    			else if(frame === 119) {
    				heroY = 0;
    			}
    			if(frame >= 90 && frame <= 115 && this.landedQT && this.canQT) {
    				this.toast2("Hit " + this.currentEnemy.name + " for " + this.hero.jumpAttack(this.currentEnemy, this.landedQT) + " damage!", 1000);
    				this.canQT = false;
    				showIndicator = false;
    			}
    		}
    		else if(frame > 120 && frame <=130) {
    			//nothing
    		}
    		else if(frame > 130 && frame <170) {
    			heroX = heroX - (8/40);
    		}
    		setTimeout(function() {
    			that.animateAttack(frame);
    		},20);
    	}
    	else if(frame===170){
    		// setTimeout(function() {
    			heroX = 0;
    			heroY = 0;
				console.log("attacked");
				
				//that.toast("You hit " + that.currentEnemy.name + " for " + that.hero.attack(that.currentEnemy) + " damage!", 1000);
				setTimeout(function() {
					that.waitingForInput = false;
					that.advanceTurn();
				}, 1000);
			// }, 1000);
    	}
    }