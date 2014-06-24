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
			that.toast("You hit " + that.currentEnemy.name + " for " + that.hero.attack(that.currentEnemy) + " damage!");
			setTimeout(function() {
				that.waitingForInput = false;
				that.advanceTurn();
			}, 1000);
		}, 1000);

	}

	Game.prototype.startBattle = function(enemy) {
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
						that.toast(that.currentEnemy.name + " hit you for " + that.currentEnemy.attack(that.hero) + " damage!");
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
				alert("Congradulations! You won!");
				this.hideBattle();
				return true;
			}
			else {
				alert("Con-sad-ulations. You lost D:");
				this.hideBattle();
				return false;
			}
		}

		this.drawBattle(this.currentEnemy);
		//callback();
	}


    Game.prototype.zoomOut = function() {
    	var that = this;
        if(zoom >= -3.375) {
            zoom -= 0.075;
            setTimeout(function(){that.zoomOut()}, 10);
        }
    }

    Game.prototype.zoomIn = function() {
    	var that = this;
        if(zoom <= 0.0) {
            zoom += 0.075;
            setTimeout(function(){that.zoomIn()}, 10);
        }
        else {
        	this.waitingForInput = true;
        }
    }