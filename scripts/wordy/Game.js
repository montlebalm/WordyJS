var Game = function(dictionaryPath, display, player1, player2) {
	this.dictionary = new Dictionary(dictionaryPath);
	this.board = new Board();
	this.scorer = new Scorer();
	this.crawler = new Crawler();

	this.disp = display;

	this.letters = this.lettersInit();
	this.lettersMax = this.letters.length;

	this.playersInit(player1, player2);

	this.disp.showBoard(this.board);
};

Game.prototype = {
	handSize : 7,
	maxTurns : 100,
	lettersConfig : {
		"a" : { count : 9 },
		"b" : { count : 2 },
		"c" : { count : 2 },
		"d" : { count : 4 },
		"e" : { count : 12 },
		"f" : { count : 2 },
		"g" : { count : 3 },
		"h" : { count : 2 },
		"i" : { count : 9 },
		"j" : { count : 1 },
		"k" : { count : 1 },
		"l" : { count : 4 },
		"m" : { count : 2 },
		"n" : { count : 6 },
		"o" : { count : 8 },
		"p" : { count : 2 },
		"q" : { count : 1 },
		"r" : { count : 6 },
		"s" : { count : 4 },
		"t" : { count : 6 },
		"u" : { count : 4 },
		"v" : { count : 2 },
		"w" : { count : 2 },
		"x" : { count : 1 },
		"y" : { count : 2 },
		"z" : { count : 1 }
	}
};

Game.prototype.playersInit = function(player1, player2) {
	this.players = [
		{ player : player1, score : 0, turns : [] },
		{ player : player2, score : 0, turns : [] }
	];

	// Randomize the order
	this.players = this.players.sort(randomSort);

	// Give each player their starting letters
	for (var i = 0; i < this.players.length; i++) {
		var player = this.players[i].player;
		var letters = this.letters.splice(0, this.handSize);

		player.receiveLetters(letters);

		this.disp.showPlayerLetters(player);
	}
};

/*
	returns ["l", "a", "d", ...]
*/
Game.prototype.lettersInit = function() {
	var allLetters = [];

	// Get an array of all the letters we'll use for a game
	for (var letter in this.lettersConfig) {
		var letterArray = [];
		var count = this.lettersConfig[letter].count;

		for (var i = 0; i < count; i++) {
			letterArray.push(letter);
		}

		allLetters = allLetters.concat(letterArray);
	}

	// Randomize the letters
	var randomLetters = allLetters.sort(randomSort);

	return randomLetters;
};

Game.prototype.start = function() {
	var turn = 0;

	// Get the first play
	var firstPlay = this.players[0].player.getFirstPlay();
	this.applyPlay(0, firstPlay);

	// Play until we run out of letters or hit the turn limit
	while (this.letters.length && turn < this.lettersMax && false) {
		this.disp.showTurn(turn);

		// Track whether at least one of the players can play
		var someoneCanPlay = false;

		for (var i = 0; i < this.players.length; i++) {
			var player = this.players[i].player;
			var play = player.getPlay(this.board.grid);

			if (play) {
				someoneCanPlay = true;
				this.applyPlay(i, play);

				this.disp.showPlay(player, play, playValue);
			}
		}

		if (!someoneCanPlay) {
			console.warn("Game: neither player can play");
			break;
		}

		turn += 1;
	}
};

/*
	playerNum = 0
	play = { word : "bike", coord : "0,0", axis : "x" }
*/
Game.prototype.applyPlay = function(playerNum, play) {
	var playerObj = this.players[playerNum];

	// Record the new play
	playerObj.turns.push(play);

	// Figure out exactly how this works on the board
	var playObj = this.crawler.getPlayObj(play);

	// Update the player's score
	var playValue = this.scorer.getWordValue(
		playObj.word,
		playObj.wordModifiers,
		playObj.letterModifiers
	);
	playerObj.score += playValue;

	// Add the play to the board
	this.board.addPlay(play);
};