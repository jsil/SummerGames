function Character(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;
	this.speed = 20;

	this.weapon = null;
}

Character.prototype = {

	equipWeapon:function(weapon) {
		this.weapon = weapon;
		
	},

	unequipWeapon:function() {
		this.weapon = null;
	},

	getWeaponName:function() {
		if(this.weapon != null) {
			return this.weapon.name;
		}
		else {
			return "Fists";
		}
	},

	isAlive:function() {
		if (this.health <= 0)
			return false;
		else
			return true;
	},

	attack:function(enemy) {
		enemy.health -= 3;
	},

	heal:function(recoveredHealth) {
		this.health += recoveredHealth;
		if(this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
	},

	consume:function(consumable) {
		consumable.doEffect(this);
	}
}




function Hero(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;
	this.speed = 20;

	this.weapon = null;
	this.inventory = [];
	this.quests = [];
}

Hero.prototype = {
	addToInventory:function(item) {
		this.inventory.push(item);
	},

	removeFromInventory:function(item) {
		if(this.inventory.indexOf(item) != -1)
			this.inventory.splice(this.inventory.indexOf(item), 1);
		else
			alert("Failed to remove item from inventory!!");
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

	equipWeapon:function(weapon) {
		this.weapon = weapon;
		this.removeFromInventory(weapon);
		
	},

	unequipWeapon:function() {
		this.addToInventory(this.weapon);
		this.weapon = null;
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
	},

	attack:function(enemy) {
		if(this.weapon != null) {
			enemy.health -= this.weapon.calculateDamage();
		}
		else {
			enemy.health -= 3;
		}
	},

	consume:function(consumable) {
		consumable.doEffect(this);
		if(this.inventory.indexOf(consumable) != -1)
			this.inventory.splice(this.inventory.indexOf(consumable), 1);
	}
}

Hero.prototype = $.extend(
            {},
            Character.prototype,
            Hero.prototype
        );