function Item(name, id) {
	this.name = name;
	this.description = "";
	this.price = 40;
	this.id = id;
}

Item.prototype = {
	isEquipable:function() {
		return false;
	},
	isWeapon:function() {
		return false;
	},
	isArmor:function() {
		return false;
	},
	isConsumable:function() {
		return false;
	},
	printView:function() {
		var viewString = "" + this.name;
		if(this.description != "") {
			viewString = viewString + " - " + this.description;
		}
		viewString = viewString + "<br>Price: " + this.price;
		viewString = viewString + "<br>";
		return viewString;
	},
	printDescription:function() {
		var viewString = "" + this.name;
		if(this.description != "") {
			viewString = viewString + " - " + this.description;
		}
		return viewString;
	}
}

function Consumable(name, id) {
	this.name = name;
	this.description = "";
	this.price = 40;
	this.healValue = 5;
	this.id = id;
}

Consumable.prototype = {
	doEffect:function(consumer) {
		console.log(consumer.name + " consumed " + this.name);
		consumer.heal(this.healValue);
	},
	isConsumable:function() {
		return true;
	},
	printView:function() {
		var viewString = "" + this.name;
		if(this.description != "") {
			viewString = viewString + " - " + this.description;
		}
		viewString = viewString + "<br>Health Restored: " + this.healValue;
		viewString = viewString + "<br>Price: " + this.price;
		viewString = viewString + "<br>";
		return viewString;
	}
}

function Equipable(name, id) {
	this.name = name;
	this.description = "";
	this.price = 40;
	this.id = id;
	this.isEquiped = false;
}

Equipable.prototype = {
	equip:function() {//don't know if i'll need these
		this.isEquiped = true;
	},

	unequip:function() {
		this.isEquiped = false;
	},
	isEquipable:function() {
		return true;
	},
	printView:function() {
	var viewString = "" + this.name;
	if(this.description != "") {
		viewString = viewString + " - " + this.description;
	}
	viewString = viewString + "<br>Armor: " + "3";
	viewString = viewString + "<br>Price: " + this.price;
	viewString = viewString + "<br>";
	return viewString;
}
}

function Weapon(name, id) {
	this.name = name;
	this.description = "";
	this.price = 40;
	this.id = id;
	this.damage = 4;
}

Weapon.prototype = {
	calculateDamage:function() {
		return this.damage;
	},
	isWeapon:function() {
		return true;
	},
	printView:function() {
		var viewString = "" + this.name;
		if(this.description != "") {
			viewString = viewString + " - " + this.description;
		}
		viewString = viewString + "<br>Damage: " + this.damage;
		viewString = viewString + "<br>Price: " + this.price;
		viewString = viewString + "<br>";
		return viewString;
	}
}

function Armor(name, id, slot) {
	this.name = name;
	this.description = "";
	this.price = 40;
	this.id = id;
	this.defence = 3;
	this.slot = slot;
}

Armor.prototype = {
	getSlotString:function() {
		if(this.slot === 0) {
			return "Chest";
		}
		else if(this.slot === 1) {
			return "Legs";
		}
		else if(this.slot === 2) {
			return "Head";
		}
		else if(this.slot === 3) {
			return "Feet";
		}
		else if(this.slot === 4) {
			return "Neck";
		}
	},
	augmentStats:function(wearer) {
		wearer.maxHealth += this.defence;
		wearer.health += this.defence;
	},
	unaugmentStats:function(wearer) {
		wearer.health -= this.defence;
		wearer.maxHealth -= this.defence;
	},
	isArmor:function() {
		return true;
	}


}

Consumable.prototype = $.extend(
            {},
            Item.prototype,
            Consumable.prototype
        );

Equipable.prototype = $.extend(
            {},
            Item.prototype,
            Equipable.prototype
        );

Weapon.prototype = $.extend(
            {},
            Item.prototype,
            Equipable.prototype,
            Weapon.prototype
        );

Armor.prototype = $.extend(
            {},
            Item.prototype,
            Equipable.prototype,
            Armor.prototype
        );


//Armory
var armoryDB = [];
for(var i=0;i<300;i++) {
	armoryDB[i] = "";
}

//****************Weapons****************

armoryDB[000] = new Weapon("Sword",000);
armoryDB[000].description = "This is the sword that The Master gave you for some reason.";
armoryDB[000].damage = 20;


//****************Armor******************

//Chest
armoryDB[100] = new Armor("Leather Chest",100, 0);
armoryDB[101] = new Armor("Chainmail",101, 0);
armoryDB[102] = new Armor("Bronze Chestplate",102, 0);
armoryDB[103] = new Armor("Iron Chestplate",103, 0);
armoryDB[104] = new Armor("Steel Chestplate",104, 0);

//Legs
armoryDB[110] = new Armor("Leather Pants",110, 1);
armoryDB[111] = new Armor("Bronze Leggings",111, 1);
armoryDB[112] = new Armor("Iron Leggings",112, 1);
armoryDB[113] = new Armor("Steel Leggings",113, 1);
armoryDB[114] = new Armor("Short Shorts",114, 1);

//Hats
armoryDB[120] = new Armor("Cheeky Hat",120, 2);
armoryDB[121] = new Armor("Party Hat",121, 2);
armoryDB[122] = new Armor("Bronze Helmet",122, 2);
armoryDB[123] = new Armor("Iron Helmet",123, 2);
armoryDB[124] = new Armor("Steel Helmet",124, 2);


//Shoes
armoryDB[130] = new Armor("Dumb Boots",130, 3);
armoryDB[131] = new Armor("Smart Shoes",131, 3);
armoryDB[132] = new Armor("Bronze Boots",132, 3);
armoryDB[133] = new Armor("Iron Boots",133, 3);
armoryDB[134] = new Armor("Steel Boots",134, 3);


//Neckware
armoryDB[140] = new Armor("Stupid Necklace",140, 4);
armoryDB[141] = new Armor("Helpful Necklace",141, 4);


//***************Consumables****************

armoryDB[200] = new Consumable("Health Potion",200);
armoryDB[200].description = "Heals 5 HP";
