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

	canvas.height = gameHeight;
	canvas.width = gameWidth;

	ctx.fillStyle='#FF0000';
	ctx.fillRect(0,0,gameWidth,gameHeight-10);

	var sideContent = $("#sideContent");
	sideContent.css("width", gameDiv.width()*.35-8);
	sideContent.css("height", gameDiv.height()-19);

	var sidePanel = $("#sidePanel");
	sidePanel.width('100%');
	sidePanel.css("height", gameDiv.height()*.65-5);

	var bottomPanel = $("#bottomPanel");
	bottomPanel.css("width", gameDiv.width()*.65);
	bottomPanel.css("height", gameDiv.height()*.35);

	var optionsPanel = $("#optionsPanel");
	optionsPanel.width('100%');
	optionsPanel.css("height", gameDiv.height()*.35-2);

	// bottomPanel.css("background-color", sidePanel.css("background-color"));

	var textArea = $("#text");
	textArea.text("test test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\ntest test test test\n");

});