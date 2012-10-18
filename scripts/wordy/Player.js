var Player = function() {
	this.name = name || "Base player";
	this.letters = [];
};

Player.prototype = {

	/*
		returns { word : "bike", axis : "x" }
	*/
	getFirstPlay : function(grid, startCoord) {},

	/*
		grid = { "0,0" : { coord : "0,0", modifier : MODS.DL, letter : "a" }, ... }
		returns { word : "bike", coord : "0,1", axis : "x" }
	*/
	getPlay : function(grid) {},

	/*
		letters = ["a", "r", "c"]
	*/
	receiveLetters : function(letters) {
		this.letters = this.letters.concat(letters);
	}
};