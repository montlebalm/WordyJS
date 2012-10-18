var Board = function() {
	this.grid = {};
	this.modifiers = {};

	this.startCoord = getCoord(
		Math.floor(this.height / 2),
		Math.floor(this.width / 2)
	);

	this.modifiersInit();

	this.gridInit();
};

Board.prototype = {
	height : 15,
	width : 15,
	// Set up the modifier tiles for the NW quadrant
	// We'll take this and rotate it to find the other quadrants
	modifiersNW : {
		"0,3" : MODS.TW,
		"0,6" : MODS.TL,
		"1,2" : MODS.DL,
		"1,5" : MODS.DW,
		"2,1" : MODS.DL,
		"2,4" : MODS.DL,
		"3,0" : MODS.TW,
		"3,3" : MODS.TL,
		"3,7" : MODS.DW,
		"4,2" : MODS.DL,
		"4,6" : MODS.DL,
		"5,1" : MODS.DW,
		"5,5" : MODS.TL,
		"6,0" : MODS.TL,
		"6,4" : MODS.DL
	}
};


Board.prototype.modifiersInit = function() {
	var modifiersNE, modifiersSE, modifiersSW,
		stepY = Math.floor(this.height / 2),
		stepX = Math.floor(this.width / 2);

	// Find the NE, SE, and SW quadrant modifiers
	modifiersNE = this.modifiersRotate(this.modifiersNW, 0, stepY);
	modifiersSE = this.modifiersRotate(modifiersNE, 0, stepY);
	modifiersSW = this.modifiersRotate(this.modifiersNW, stepX, 0);

	// Combine all the modifiers
	$.extend(this.modifiers, this.modifiersNW, modifiersNE, modifiersSE, modifiersSW);
};

/*
	modifiersBase = { { x:0, y:0 } : MODS.TW }
	xOffset = 0
	yOffset = 3
*/
Board.prototype.modifiersRotate = function(modifiersBase, xOffset, yOffset) {
	var coord, pair, x, y, modifier, newX, newY;
		modifiers = {};

	for (coord in modifiersBase) {
		pair = coord.split(",");
		x = pair[0];
		y = pair[1];
		modifier = modifiersBase[coord];
		newX = Math.abs(x - xOffset) + xOffset;
		newY = Math.abs(y - yOffset) + yOffset;

		// Flip the x and y for the new coord
		modifiers[String([newY, newX])] = modifier;
	}

	return modifiers;
};

Board.prototype.gridInit = function() {
	var x, y, coord, tile;

	for (x = 0; x < this.height; x++) {
		for (y = 0; y < this.width; y++) {
			coord = getCoord(x, y);
			tile = {
				coord : coord,
				modifier : null,
				letter : null
			};

			if (this.modifiers[coord]) {
				tile.modifier = this.modifiers[coord];
			}

			this.grid[coord] = tile;
		}
	}
};

Board.prototype.addPlay = function(play) {
	console.log("Board: Adding", play);
};