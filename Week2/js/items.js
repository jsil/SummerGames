function Item(name) {
	this.name = name;
	this.price = 40;
}

Item.prototype = {

	takeItem:function() {
		console.log("took item");
	}
}

function Consumable(name) {
	this.name = name;
	this.price = 40;
}

Consumable.prototype = {
	consume:function() {
		console.log("consumed");
	}
}

function Equipable(name) {
	this.name = name;
	this.price = 40;
}

Equipable.prototype = {
	takeItem:function() {
		console.log("took item2");
	},

	equip:function() {
		console.log("equiped");
	},

	unequip:function() {
		console.log("unequiped");
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