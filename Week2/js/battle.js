	//*********************Battle*********************

	Game.prototype.advanceTurn = function() {
		this.whosTurn = !this.whosTurn;
	}

	Game.prototype.doAttack = function() {
		var that = this;

		this.hideHUD();
		this.zoomOut();
		console.log("attacking");
		this.waitingForInput = false;
		setTimeout(function() {
			console.log("attacked");
			that.toast("You hit " + that.currentEnemy.name + " for " + that.hero.attack(that.currentEnemy) + " damage!", 1000);
			setTimeout(function() {
				that.waitingForInput = false;
				that.advanceTurn();
			}, 1000);
		}, 1000);

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
		this.waitingForInput = true;
		this.showBattle();
		console.log("Started Battle");
		jQuery.proxy(this.doBattle(), this);
		//this.doBattle(this);
	} 

	Game.prototype.doBattle = function(callback) {
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
					}, 1000);
					//callback(that);
				}
				setTimeout(function(){that.doBattle()}, 100);
		}
		else {
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
				setTimeout(function(){that.hideBattle()}, 5000);
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
        else {
        	this.waitingForInput = true;
        }
    }

    Game.prototype.getEnemyImage = function() {
    	return "./img/hero.png";
    }