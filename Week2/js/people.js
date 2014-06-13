function Character(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;
	this.speed = 20;
}

Character.prototype = {
	isAlive:function() {
		if (this.health <= 0)
			return false;
		else
			return true;
	},
	attack:function(enemy) {
		enemy.health -= 3;
	}
}




function Hero(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;
	this.speed = 20;


	this.inventory = [];
	this.quests = [];
}

Hero.prototype = {
	addToInventory:function(item) {
		this.inventory.push(item);
	},

	printInventory:function() {
		var listText = "";
		for(var i=0;i<this.inventory.length;i++) {
			if(i===0)
				listText = listText + this.inventory[i].name;
			else
				listText = listText + "<br>" + this.inventory[i].name;
		}
		return listText;
	},

	addQuest:function(quest) {
		this.quests.push(quest);
	},

	printActiveQuests:function() {
		var listText = "";
		for(var i=0;i<this.quests.length;i++) {
			if(i===0) {
				listText = listText + this.quests[i].printInfo();
			}
			else {
				listText = listText + "<br><br>" + this.quests[i].printInfo();
			}
		}
		return listText;
	}
}

Hero.prototype = $.extend(
            {},
            Character.prototype,
            Hero.prototype
        );