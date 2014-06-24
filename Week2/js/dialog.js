
	//*********************Dialog*********************
	

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
