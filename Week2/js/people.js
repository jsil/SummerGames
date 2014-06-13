function Character(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.gold = 100;
	this.speed = 20;

	this.weapon = null;
	this.chest = null;
	this.legs = null;
	this.head = null;
	this.feet = null;
	this.neck = null;
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

	equipArmor:function(armor) {
		if(armor.slot === 0) {
			this.chest = armor;
			armor.augmentStats(this);
		}
		else if(armor.slot === 1) {
			this.legs = armor;
			armor.augmentStats(this);
		}
		else if(armor.slot === 2) {
			this.head = armor;
			armor.augmentStats(this);
		}
		else if(armor.slot === 3) {
			this.feet = armor;
			armor.augmentStats(this);
		}
		else if(armor.slot === 4) {
			this.neck = armor;
			armor.augmentStats(this);
		}
	},

	unequipArmor:function(slot) {
		if(slot === 0) {
			this.chest.unaugmentStats(this);
			this.chest = null;
		}
		else if(slot === 1) {
			this.legs.unaugmentStats(this);
			this.legs = null;
		}
		else if(slot === 2) {
			this.head.unaugmentStats(this);
			this.head = null;
		}
		else if(slot === 3) {
			this.feet.unaugmentStats(this);
			this.feet = null;
		}
		else if(slot === 4) {
			this.neck.unaugmentStats(this);
			this.neck = null;
		}
	},

	getChestName:function() {
		if(this.chest != null) {
			return this.chest.name;
		}
		else {
			return "Shirt";
		}
	},

	getLegsName:function() {
		console.log("got here");
		if(this.legs != null) {
			return this.legs.name;
		}
		else {
			return "Pants";
		}
	},

	getHeadName:function() {
		if(this.head != null) {
			return this.head.name;
		}
		else {
			return "";
		}
	},

	getFeetName:function() {
		if(this.feet != null) {
			return this.feet.name;
		}
		else {
			return "Boots";
		}
	},

	getNeckName:function() {
		if(this.neck != null) {
			return this.neck.name;
		}
		else {
			return "";
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

	equipArmor:function(armor) {
		if(armor.slot === 0) {
			this.chest = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 1) {
			this.legs = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 2) {
			this.head = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 3) {
			this.feet = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 4) {
			this.neck = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
	},

	unequipArmor:function(slot) {
		if(slot === 0) {
			this.chest.unaugmentStats(this);
			this.chest = null;
		}
		else if(slot === 1) {
			this.legs.unaugmentStats(this);
			this.legs = null;
		}
		else if(slot === 2) {
			this.head.unaugmentStats(this);
			this.head = null;
		}
		else if(slot === 3) {
			this.feet.unaugmentStats(this);
			this.feet = null;
		}
		else if(slot === 4) {
			this.neck.unaugmentStats(this);
			this.neck = null;
		}
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