	//*********************Display*********************

	Game.prototype.resizeGame = function() {
		this.gameDiv.width("99.5%");
		this.gameDiv.height("97%")

		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		// console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		this.sideContent.css("width", this.gameDiv.width()*.35-2);
		this.sideContent.css("height", this.gameDiv.height()-2);
		
		this.sidePanel.width('100%');
		this.sidePanel.css("height", this.gameDiv.height()*.65+3);

		this.bottomPanel.css("width", this.gameDiv.width()*.65);
		this.bottomPanel.css("height", this.gameDiv.height()*.35-6);
		
		this.optionsPanel.width('100%');
		this.optionsPanel.css("height", this.gameDiv.height()*.35-8);

		this.battleCanvas2.width = window.innerWidth;
		this.battleCanvas2.height = window.innerHeight;
		this.resizeBattle();
	}

	Game.prototype.resizeBattle = function() {
	   // only change the size of the canvas if the size it's being displayed
	   // has changed.
	   var width = this.battleCanvas.clientWidth;
	   var height = this.battleCanvas.clientHeight;
	   if (this.battleCanvas.width != width ||
	       this.battleCanvas.height != height) {
	     // Change the size of the canvas to match the size it's being displayed
	     // this.battleCanvas.width = width;
	     // this.battleCanvas.height = height;
	     this.battleCanvas.clientWidth = this.battleCanvas.width;
	     this.battleCanvas.clientHeight = this.battleCanvas.height;
	   }
	   //console.log("resized battle");
	}


	Game.prototype.showBattle = function() {
			this.battleCanvas.show();
			this.battleHUD.show();
			this.battleMenu.show();
			//this.toastHolder.show();
			//this.resizeBattle();
			this.gameDiv.hide();
			//webGLStart();
			//drawScene();
			console.log("show battle");
	}

	Game.prototype.hideBattle = function() {
		this.battleCanvas.hide();
		this.battleHUD.hide();
		this.battleMenu.hide();
		this.showHUD();
		this.toastHolder.hide();
		this.toastHolder2.hide();
		this.gameDiv.show();

	    this.scrollBox.animate({ scrollTop: this.scrollBox.prop('scrollHeight') }, "fast");
	    console.log("hide battle");
	}


	Game.prototype.showHUD = function() {
		var that = this;
		this.battleMenu.animate({
		    opacity: "0.9"
		  },250, "linear", function() {
 		 });
	}

	Game.prototype.hideHUD = function() {
		this.battleMenu.animate({
		    opacity: "0.0"
		  },250, "linear", function() {
 		 });
	}

	// Game.prototype.toast = function(string) {//may need to be moved to battle
	// 	var that = this;
	// 	this.battleToast.html(string);
	// 	this.toastHolder.show();
	// 	setTimeout(function() {
	// 		that.toastHolder.hide();
	// 	}, 1000);
	// }

	Game.prototype.toast = function(string, time) {//may need to be moved to battle
		var that = this;
		this.battleToast.html(string);
		this.toastHolder.show();
		setTimeout(function() {
			that.toastHolder.hide();
		}, time);
	}

	Game.prototype.toast2 = function(string, time) {//may need to be moved to battle
		var that = this;
		this.battleToast2.html(string);
		this.toastHolder2.css("opacity","0.0");
		this.toastHolder2.show();
		this.toastHolder2.animate({
		    opacity: "1.0"
		  },250, "linear", function() {
 		 });

		setTimeout(function() {
			that.toastHolder2.hide();
		}, time);
	}


	Game.prototype.toggleBattle = function() {
		var btlCanvas = document.getElementById("battleCanvas");
		var isVisible = btlCanvas.offsetWidth > 0 || btlCanvas.offsetHeight > 0;
		if(!isVisible) {
			this.battleCanvas.show();
			this.battleHUD.show();
			this.battleMenu.show();
			//this.toastHolder.show();
			//this.resizeBattle();
			this.gameDiv.hide();
			//console.log("Display battle");
		}
		else {
			this.battleCanvas.hide();
			this.battleHUD.hide();
			this.battleMenu.hide();
			this.toastHolder.hide();
			this.toastHolder2.hide();
			//this.resizeBattle();
			this.gameDiv.show();
			this.showHUD();
			this.scrollBox.animate({ scrollTop: this.scrollBox.prop('scrollHeight') }, "fast");
			//console.log("Hide battle");
		}
		console.log("toggle battle");
	}

	Game.prototype.drawBattle = function(enemy) {
		//this.showBattle();
		//drawScene();
		//console.log("Got here");
		var that = this;

		this.battleHUD.find("#innerHUD").find("#healthHUD").html(this.hero.health + "/" + this.hero.maxHealth);
		//this.battleHUD.find("#innerHUD").find("#xpHUD").html(this.hero.experience);
		this.battleHUD.find("#innerHUD").find("#enemyHealth").html(this.currentEnemy.health + "/" + this.currentEnemy.maxHealth);

	}