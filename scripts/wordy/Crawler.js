var Crawler = function() {};

Crawler.prototype = {};

/*
	play = { word : "bike", coord : "0,1", axis : "x" }
	returns {
		word : "aardvark"
		modifiers : [{ index : 3 (letter 'd'), modifier : MODS.DL (double letter) }]
	}
*/
Crawler.prototype.getPlayObj = function(play) {
	return {
		word : "aardvark",
		modifiers : [{ index : 3, modifier : MODS.DL }]
	}
};