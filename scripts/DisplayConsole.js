var DisplayConsole = function() {};

DisplayConsole.prototype.showBoard = function(board) {
	var x, y, row, coord, tile, output;

	for (x = 0; x < board.height; x++) {
		row = "";

		for (y = 0; y < board.width; y++) {
			coord = getCoord(x, y);
			tile = board.grid[coord];
			output = "[ ]";

			// Show a letter
			if (tile.letter) {
				output = "[" + tile.letter + "]";
			}
			// Show a modifier
			else if (tile.modifier) {
				if (tile.modifier == MODS.DL) {
					output = "D_L";
				}
				else if (tile.modifier == MODS.TL) {
					output = "T_L";
				}
				else if (tile.modifier == MODS.DW) {
					output = "D_W";
				}
				else if (tile.modifier == MODS.TW) {
					output = "T_W";
				}
			}
			// Show the start position
			else if (coord == board.startCoord) {
				output = "[*]";
			}

			row += output;
		}

		console.log(row);
	}
};

DisplayConsole.prototype.showTurn = function(turnNum) {
	console.log("========== Turn " + turnNum + " ==========");
};

DisplayConsole.prototype.showPlay = function(player, play, value) {
	console.log(player.name, "played", play.word, "for", value, "points");
};

DisplayConsole.prototype.showPlayerLetters = function(player) {
	console.log(player.name, "has the letters", player.letters);
};