jQuery(function() {
jQuery("#sidePanel").tabs();
});

function Game() {
	this.gameDiv = $("#gameDiv");
	this.canvas = document.getElementById("myCanvas");
	this.ctx = this.canvas.getContext('2d');
	this.sideContent = $("#sideContent");
	this.sidePanel = $("#sidePanel");
	this.bottomPanel = $("#bottomPanel");
	this.optionsPanel = $("#optionsPanel");

	Game.prototype.startGame = function() {
		//openModal("#nameModal");
		//console.log("bitch");
	}

	Game.prototype.resizeGame = function() {


		var gameWidth = this.gameDiv.width()*.65;
		var gameHeight = this.gameDiv.height()*.65;

		console.log("x: " + gameWidth + " y: " + gameHeight);

		this.canvas.width = gameWidth-12;
		this.canvas.height = gameHeight;

		this.ctx.fillStyle='#FF0000';
		//this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

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
}

$(document).ready(function() { 

	// bottomPanel.css("background-color", sidePanel.css("background-color"));

	
	var myGame = new Game();
	myGame.startGame();
	myGame.resizeGame();


	var textArea = $("#text");
	myGame.addText("Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!")

	$("#nameSubmit").click(function(event){
	    event.preventDefault();
	    closeModal("#nameModal");
	    myGame.addText("Name: " + $("#nameInput").val());
	});

	// $(window).resize(function(){
	// 	myGame.resizeGame();
	// });

});

