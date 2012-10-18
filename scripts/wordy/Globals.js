// Word and letter modifiers
var MODS = {
	DL : { value : 2, scope : "letter" },
	TL : { value : 3, scope : "letter" },
	DW : { value : 2, scope : "word" },
	TW : { value : 3, scope : "word" }
};

/*
	x = 0
	y = 1
	returns "0,1"
*/
function getCoord(x, y) {
	return String([x, y]);
}

function randomSort() {
	return (Math.round(Math.random()) - 0.5);
}