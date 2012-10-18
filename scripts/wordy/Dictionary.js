/*
	filePath = "http://somesite.com/dictionary.txt"
*/
var Dictionary = function(filePath) {
	this.words = [];
	this.hashed = {};

	this.load(filePath);
};

/*
	filePath = "http://somesite.com/dictionary.txt"
*/
Dictionary.prototype.load = function(filePath) {
	if (filePath) {
		$.get(filePath, $.proxy(this.load_success, this));
	}
};

/*
	response = "
		aa
		aah
		aahed
	"
*/
Dictionary.prototype.load_success = function(response) {
	var i, word, letters, sortedLetters, sortedWord,
		lines = response.split("\n");

	for (i = 0, len = lines.length; i < len; i += 1) {
		word = $.trim(lines[i]).toLowerCase();
		letters = word.split("");
		sortedLetters = letters.sort();
		sortedWord = sortedLetters.join();

		if (!this.hashed[sortedWord]) {
			this.hashed[sortedWord] = [];
		}

		this.hashed[sortedWord].push(word);
		this.words.push(word);
	}
};

/*
	word = "aardvark"
	returns true
*/
Dictionary.prototype.isWord = function(word) {
	return word in this.words;
};

/*
	hash = "aaadkrrv" (aardvark sorted)
	returns true
*/
Dictionary.prototype.isHashKey = function(hash) {
	return hash in this.hashed;
};

/*
	hash = "aaadkrrv" (aardvark sorted)
	returns [aa, dark, rad, ...]
*/
Dictionary.prototype.getWords = function(hash) {
	return this.hashed[hash];
};