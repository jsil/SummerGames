function Quest(name, description, id) {
	this.name = name;
	this.description = description;
	this.id = id;
	this.reward = [];
}

Quest.prototype = {
	printInfo:function() {
		var questText = this.name + " - <br>" + this.description + "<br>Reward: ";
		if(this.reward[0] != null) {
			for(var i=0;i<this.reward.length;i++) {
				if(i === 0) {
					var questText = questText + this.reward[i].name;
				}
				else  {
					var questText = questText +  ", " + this.reward[i].name;
				}
			}
		}
		else {
			var questText = questText + "none.";
		}
		return questText;
	},

	addRewards:function(reward) {
		this.reward = reward.slice(0);
	}
}

var questDB = [];

questDB[0] = new Quest("Quest #1", "Die", 0);
questDB[0].addRewards([new Equipable("Sword"), new Consumable("Health Pot"), new Item("Mysterious Idol")]);
