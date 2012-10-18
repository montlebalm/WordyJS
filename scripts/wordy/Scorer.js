var Scorer = function() {};

Scorer.prototype = {
	letters : {
		"a" : { value : 1 },
		"b" : { value : 3 },
		"c" : { value : 3 },
		"d" : { value : 2 },
		"e" : { value : 1 },
		"f" : { value : 4 },
		"g" : { value : 2 },
		"h" : { value : 4 },
		"i" : { value : 1 },
		"j" : { value : 8 },
		"k" : { value : 5 },
		"l" : { value : 1 },
		"m" : { value : 3 },
		"n" : { value : 1 },
		"o" : { value : 1 },
		"p" : { value : 3 },
		"q" : { value : 10 },
		"r" : { value : 1 },
		"s" : { value : 1 },
		"t" : { value : 1 },
		"u" : { value : 1 },
		"v" : { value : 4 },
		"w" : { value : 4 },
		"x" : { value : 8 },
		"y" : { value : 4 },
		"z" : { value : 10 }
	}
};

Scorer.prototype.getLetterValue = function(letter) {
	return this.letters[letter].value;
};

/*
	word = "aardvark"
	modifiers : [{ index : 3 (letter 'd'), modifier : MODS.DL (double letter) }]
	returns 10
*/
Scorer.prototype.getWordValue = function(word, modifiers) {
	modifiers = modifiers || [];

	var i, letters, letterValue, modifier, modifierObj,
		value = 0,
		wordModifiers = [],
		letterModifiers = [],
		letters = word.split("");

	// Separate out the word and letter modifiers
	for (i = 0; i < modifiers.length; i++) {
		modifierObj = modifiers[i];
		modifier = modifierObj.modifier;

		if (modifier == MODS.DL || modifier == MODS.TL) {
			letterModifiers.push(modifierObj);
		}
		else if (modifier == MODS.DW || modifier == MODS.TW) {
			wordModifiers.push(modifierObj);
		}
	}

	// Add up all the letters
	for (i = 0, len = letters.length; i < len; i++) {
		letter = letters[i];
		letterValue = this.getLetterValue(letter);

		// Add the letter multiplier
		if (letterModifiers.length && letterModifiers[0].index === i) {
			letterValue *= letterModifiers.shift().modifier.value;
		}

		value += letterValue;
	}

	// Add the full word multipliers
	while (wordModifiers.length) {
		value *= wordModifiers.shift().modifier.value;
	}

	return value;
};