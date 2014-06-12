jQuery(function() {
jQuery("#sidePanel").tabs();
});

$(document).ready(function() { 

	var gameDiv = $("#gameDiv");

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');

	var gameWidth = gameDiv.width()*.65;
	var gameHeight = gameDiv.height()*.65;

	console.log("x: " + gameWidth + " y: " + gameHeight);

	canvas.width = gameWidth-12;
	canvas.height = gameHeight;

	ctx.fillStyle='#FF0000';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	var sideContent = $("#sideContent");
	sideContent.css("width", gameDiv.width()*.35-2);
	sideContent.css("height", gameDiv.height()+12);
	//sideContent.height('100%');

	var sidePanel = $("#sidePanel");
	sidePanel.width('100%');
	sidePanel.css("height", gameDiv.height()*.65+3);

	var bottomPanel = $("#bottomPanel");
	bottomPanel.css("width", gameDiv.width()*.65);
	bottomPanel.css("height", gameDiv.height()*.35+2);

	var optionsPanel = $("#optionsPanel");
	optionsPanel.width('100%');
	optionsPanel.css("height", gameDiv.height()*.35);

	// bottomPanel.css("background-color", sidePanel.css("background-color"));

	var textArea = $("#text");
	bottomPanel.html("Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>Test!<br>")
});