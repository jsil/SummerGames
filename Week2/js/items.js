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