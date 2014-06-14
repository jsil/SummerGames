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

armoryDB[0] = new Weapon("Sword");
armoryDB[1] = new Consumable("Health Pot");
armoryDB[2] = new Armor("Chestplate", 0);
armoryDB[3] = new Armor("Armored Leggings", 1);
armoryDB[4] = new Armor("Cheeky Hat", 2);
armoryDB[5] = new Armor("Dumb Boots", 3);
armoryDB[6] = new Armor("Stupid Necklace", 4);