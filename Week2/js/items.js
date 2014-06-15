function Item(name) {
	this.name = name;
	this.price = 40;
}

Item.prototype = {

	takeItem:function() {
		console.log("took item");
	},
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
	}
}

function Consumable(name) {
	this.name = name;
	this.price = 40;
}

Consumable.prototype = {
	doEffect:function(consumer) {
		console.log(consumer.name + " consumed " + this.name);
		consumer.heal(5);
	},
	isConsumable:function() {
		return true;
	}
}

function Equipable(name) {
	this.name = name;
	this.price = 40;
	this.isEquiped = false;
}

Equipable.prototype = {
	takeItem:function() {
		console.log("took item2");
	},

	equip:function() {//don't know if i'll need these
		this.isEquiped = true;
	},

	unequip:function() {
		this.isEquiped = false;
	},
	isEquipable:function() {
		return true;
	}
}

function Weapon(name) {
	this.name = name;
	this.price = 40;
	this.damage = 3;
}

Weapon.prototype = {
	calculateDamage:function() {
		return this.damage;
	},
	isWeapon:function() {
		return true;
	}
}

function Armor(name,slot) {
	this.name = name;
	this.price = 40;
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



var armoryDB = [];
for(var i=0;i<300;i++) {
	armoryDB[i] = "";
}

armoryDB[000] = new Weapon("Sword");

armoryDB[100] = new Armor("Leather Chest", 0);
armoryDB[101] = new Armor("Chainmail", 0);
armoryDB[102] = new Armor("Bronze Chestplate", 0);
armoryDB[103] = new Armor("Iron Chestplate", 0);
armoryDB[104] = new Armor("Steel Chestplate", 0);

armoryDB[110] = new Armor("Leather Pants", 1);
armoryDB[111] = new Armor("Bronze Leggings", 1);
armoryDB[112] = new Armor("Iron Leggings", 1);
armoryDB[113] = new Armor("Steel Leggings", 1);
armoryDB[114] = new Armor("Short Shorts", 1);

armoryDB[120] = new Armor("Cheeky Hat", 2);
armoryDB[121] = new Armor("Party Hat", 2);
armoryDB[122] = new Armor("Bronze Helmet", 2);
armoryDB[123] = new Armor("Iron Helmet", 2);
armoryDB[124] = new Armor("Steel Helmet", 2);

armoryDB[130] = new Armor("Dumb Boots", 3);
armoryDB[131] = new Armor("Smart Shoes", 3);
armoryDB[132] = new Armor("Bronze Boots", 3);
armoryDB[133] = new Armor("Iron Boots", 3);
armoryDB[134] = new Armor("Steel Boots", 3);

armoryDB[140] = new Armor("Stupid Necklace", 4);
armoryDB[141] = new Armor("Helpful Necklace", 4);

armoryDB[200] = new Consumable("Health Pot");
