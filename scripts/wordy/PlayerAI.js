var PlayerAI = function(name) {
	this.name = name || "AI Player";
	this.letters = [];
	this.crawler = new Crawler();
};
PlayerAI.prototype = new Player;

/*
	returns { word : "bike", axis : "x" }
*/
PlayerAI.prototype.getFirstPlay = function() {
	return {
		word : "bike",
		axis : "x"
	};
};

/*
	grid = { "0,0" : { coord : "0,0", modifier : MODS.DL, letter : "a" }, ... }
	returns { word : "bike", coord : "0,1", axis : "x" }
*/
PlayerAI.prototype.getPlay = function() {
	return {
		word : "bike",
		coord : "0,0",
		axis : "y"
	};
};