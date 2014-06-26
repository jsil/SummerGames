function Character(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.level = 1;
	this.gold = 100;
	this.speed = 20;
	this.xpReward = 15;

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
		var damage = Math.floor(Math.random() * 4) + 1
		enemy.damage(damage);
		return damage;
	},

	heal:function(recoveredHealth) {
		this.health += recoveredHealth;
		if(this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
	},

	consume:function(consumable) {
		consumable.doEffect(this);
	},

	damage:function(damage) {
		this.health -= damage;
		if(this.health <= 0)
			this.health = 0;
	}
}




function Hero(name) {
	this.name = name;
	this.health = 20;
	this.maxHealth = 20;
	this.level = 1;
	this.gold = 100;
	this.speed = 20;
	this.experience = 0;

	this.weapon = null;
	this.inventory = [];
	this.quests = [];
	this.completedQuests = [];
}

Hero.prototype = {
	giveXP:function(xpReward) {
		this.experience += xpReward;
		if(this.experience >= 100) {
			this.levelUp();
			return true;
		}
		else
			return false;
	},

	levelUp:function() {
		this.experience -= 100;
		this.level++;
		console.log("Level Up");
	},

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
			listText = listText + "<div>" + this.inventory[i].name;
			if(this.inventory[i].isEquipable())
				listText = listText + "<button type=button class=\"itemEquipButton\" data-num=" + i + ">Equip</button>";
			if(this.inventory[i].isConsumable())
				listText = listText + "<button type=button class=\"itemConsumeButton\" data-num=" + i + ">Consume</button>";
			listText = listText + "<button type=button class=\"itemViewButton\" data-num=" + i + ">View</button>";
			listText = listText + "</div>";
		}
		return listText;
	},

	equipWeapon:function(weapon) {
		if(this.weapon != null)
				this.unequipWeapon();
		this.weapon = weapon;
		this.removeFromInventory(weapon);
	},

	unequipWeapon:function() {
		this.addToInventory(this.weapon);
		this.weapon = null;
	},

	equipArmor:function(armor) {
		if(armor.slot === 0) {
			if(this.chest != null)
				this.unequipArmor(0);
			this.chest = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 1) {
			if(this.legs != null)
				this.unequipArmor(1);
			this.legs = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 2) {
			if(this.head != null)
				this.unequipArmor(2);
			this.head = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 3) {
			if(this.feet != null)
				this.unequipArmor(3);
			this.feet = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
		else if(armor.slot === 4) {
			if(this.neck != null)
				this.unequipArmor(4);
			this.neck = armor;
			armor.augmentStats(this);
			this.removeFromInventory(armor);
		}
	},

	unequipArmor:function(slot) {
		if(slot === 0) {
			this.chest.unaugmentStats(this);
			this.addToInventory(this.chest);
			this.chest = null;
		}
		else if(slot === 1) {
			this.legs.unaugmentStats(this);
			this.addToInventory(this.legs);
			this.legs = null;
		}
		else if(slot === 2) {
			this.head.unaugmentStats(this);
			this.addToInventory(this.head);
			this.head = null;
		}
		else if(slot === 3) {
			this.feet.unaugmentStats(this);
			this.addToInventory(this.feet);
			this.feet = null;
		}
		else if(slot === 4) {
			this.neck.unaugmentStats(this);
			this.addToInventory(this.neck);
			this.neck = null;
		}
	},

	printEquipment:function() {
		var listText = "";

		listText = listText + "<div>Weapon: " + this.getWeaponName();
		if(this.weapon != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + -1 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + -1 + ">View</button>";
		}
		listText = listText + "</div>";

		listText = listText + "<div>Chest: " + this.getChestName();
		if(this.chest != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + 0 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + 0 + ">View</button>";
		}
		listText = listText + "</div>";

		listText = listText + "<div>Legs: " + this.getLegsName();
		if(this.legs != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + 1 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + 1 + ">View</button>";
		}
		listText = listText + "</div>";

		listText = listText + "<div>Head: " + this.getHeadName();
		if(this.head != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + 2 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + 2 + ">View</button>";
		}
		listText = listText + "</div>";

		listText = listText + "<div>Feet: " + this.getFeetName();
		if(this.feet != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + 3 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + 3 + ">View</button>";
		}
		listText = listText + "</div>";

		listText = listText + "<div>Neck: " + this.getNeckName();
		if(this.neck != null) {
			listText = listText + "<button type=button class=\"equipmentUnequipButton\" data-num=" + 4 + ">Unequip</button>";
			listText = listText + "<button type=button class=\"equipmentViewButton\" data-num=" + 4 + ">View</button>";
		}
		listText = listText + "</div>";

		return listText;
	},

	addQuest:function(quest) {
		this.quests.push(quest);
	},

	checkQuest:function(id) {
		if(this.quests.indexOf(questDB[id]) != -1 && this.completedQuests.indexOf(questDB[id]))
			return true;
		else
			return false;
	},

	completeQuest:function(id) {
		if(this.quests.indexOf(questDB[id]) != -1) {
			var completedQuest = this.quests[this.quests.indexOf(questDB[id])];
			for(var i=0;i<completedQuest.reward.length;i++) {
				this.addToInventory(completedQuest.reward[i]);
			}
			this.completedQuests.push(completedQuest);
			this.quests.pop(completedQuest);
			return true;
		}
		else
			return false;
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

	printCompletedQuests:function() {
		var listText = "";
		for(var i=0;i<this.completedQuests.length;i++) {
			if(i===0) {
				listText = listText + this.completedQuests[i].printInfo();
			}
			else {
				listText = listText + "<br><br>" + this.completedQuests[i].printInfo();
			}
		}
		return listText;
	},

	attack:function(enemy) {
		if(this.weapon != null) {
			enemy.damage(this.weapon.calculateDamage());
			return this.weapon.calculateDamage();
		}
		else {
			var damage = Math.floor(Math.random() * 4) + 1;
			enemy.damage(damage);
			return damage;
		}
	},

	consume:function(consumable) {
		consumable.doEffect(this);
		if(this.inventory.indexOf(consumable) != -1)
			this.inventory.splice(this.inventory.indexOf(consumable), 1);
	},

	getJSON:function() {
		var jsonString = "\"name\":\"" + this.name + "\", ";
		jsonString += "\"health\":\"" + this.health.toString() + "\", ";
		jsonString += "\"maxHealth\":\"" + this.maxHealth.toString() + "\", ";
		jsonString += "\"gold\":\"" + this.gold.toString() + "\", ";
		jsonString += "\"speed\":\"" + this.speed.toString() + "\", ";

		if(this.weapon != null)
			jsonString += "\"weapon\":\"" + this.weapon.id + "\", ";
		else
			jsonString += "\"weapon\":" + "[]" + ", ";

		if(this.chest != null)
			jsonString += "\"chest\":\"" + this.chest.id + "\", ";
		else
			jsonString += "\"chest\":" + "[]" + ", ";

		if(this.legs != null)
			jsonString += "\"legs\":\"" + this.legs.id + "\", ";
		else
			jsonString += "\"legs\":" + "[]" + ", ";

		if(this.head != null)
			jsonString += "\"head\":\"" + this.head.id + "\", ";
		else
			jsonString += "\"head\":" + "[]" + ", ";

		if(this.feet != null)
			jsonString += "\"feet\":\"" + this.feet.id + "\", ";
		else
			jsonString += "\"feet\":" + "[]" + ", ";

		if(this.neck != null)
			jsonString += "\"neck\":\"" + this.neck.id + "\", ";
		else
			jsonString += "\"neck\":" + "[]" + ", ";

		jsonString += "\"inventory\":[";
		for(var i=0;i<this.inventory.length;i++) {
			if(i===0)
				jsonString +=  this.inventory[i].id;
			else
				jsonString += ", " + this.inventory[i].id;
		}
		jsonString += "], ";

		jsonString += "\"quests\":[";
		for(var i=0;i<this.quests.length;i++) {
			if(i===0)
				jsonString +=  this.quests[i].id;
			else
				jsonString += ", " + this.quests[i].id;
		}
		jsonString += "], ";

		jsonString += "\"completedQuests\":[";
		for(var i=0;i<this.completedQuests.length;i++) {
			if(i===0)
				jsonString +=  this.completedQuests[i].id;
			else
				jsonString += ", " + this.completedQuests[i].id;
		}
		jsonString += "]";

		return jsonString;
	},

	loadJSON:function(jsonString) {
		var loadObject = jQuery.parseJSON(jsonString);
		this.name = loadObject.name;
		this.health = parseInt(loadObject.health);
		this.maxHealth = parseInt(loadObject.maxHealth);
		this.gold = parseInt(loadObject.gold);
		this.speed = parseInt(loadObject.speed);

		if(loadObject.weapon != [])
			this.weapon = armoryDB[parseInt(loadObject.weapon)];

		if(loadObject.chest != [])
			this.chest = armoryDB[parseInt(loadObject.chest)];

		if(loadObject.legs != [])
			this.legs = armoryDB[parseInt(loadObject.legs)];

		if(loadObject.head != [])
			this.head = armoryDB[parseInt(loadObject.head)];

		if(loadObject.feet != [])
			this.feet = armoryDB[parseInt(loadObject.feet)];

		if(loadObject.neck != [])
			this.neck = armoryDB[parseInt(loadObject.neck)];

		this.inventory = [];

		console.log(loadObject);
		var inventoryObject = loadObject.inventory;
		for(var i=0;i<inventoryObject.length;i++) {
			this.addToInventory(armoryDB[inventoryObject[i]]);
			//console.log(inventoryObject[i]);
		}

		this.quests = [];

		var questsObject = loadObject.quests;
		for(var i=0;i<questsObject.length;i++) {
			this.addQuest(questDB[questsObject[i]]);
			//console.log(questsObject[i]);
		}

		this.completedQuests = [];

		var completedQuestsObject = loadObject.completedQuests;
		for(var i=0;i<completedQuestsObject.length;i++) {
			this.completedQuests.push(questDB[completedQuestsObject[i]]);
		}
	}
}

Hero.prototype = $.extend(
            {},
            Character.prototype,
            Hero.prototype
        );


var characterDB = [];

characterDB[0] = new Character("Generic Dude");