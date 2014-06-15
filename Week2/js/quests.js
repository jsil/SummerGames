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

questDB[0] = new Quest("[insert quest name]", "Talk to the Master.", 0);
questDB[0].addRewards([armoryDB[000]]);

questDB[1] = new Quest("[insert quest name #2]","Equip your sword.", 1);
questDB[1].addRewards([armoryDB[100], armoryDB[110]]);

questDB[2] = new Quest("Fight! Fight! Fight", "Defeat the tutorial guy with your new equipment.", 2);
questDB[2].addRewards([armoryDB[200]]);

questDB[3] = new Quest("Drink up!", "Heal yourself with the Health Potion.", 3);
questDB[3].addRewards([armoryDB[140]]);

// questDB[0] = new Quest("Quest #1", "Die", 0);
// questDB[0].addRewards([new Equipable("Sword"), new Consumable("Health Pot"), new Item("Mysterious Idol")]);

// questDB[1] = new Quest("Quest #2 - Revenge of the Quest", "Don't Die", 0);
// questDB[1].addRewards([new Equipable("Sword"), new Consumable("Health Pot"), new Item("Mysterious Idol")]);
