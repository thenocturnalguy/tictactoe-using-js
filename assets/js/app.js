"use strict";

let tictactoe = (function(dimension) {

	/**
	* Board class defines the Game Board.
	* @params dimension: Dimension of the full board.
	* @params moves: Two-dimensional matrix, stores the moves made by the players. 	
	* @params _init(): Initializes the board.
	* @params _move(): Inserts each move to moves[][].
	*/

	const Board = function(dimension) {
		this.dimension = dimension;
		this.moves = new Array(dimension);
	} 

	Board.prototype._init = function() {
		let i, j;
		for (i = 0; i < this.dimension; ++i) {
			this.moves[i] = new Array(this.dimension);
			for (j = 0; j < this.dimension; ++j) 
				this.moves[i].push(null);
		}
	}

	Board.prototype._move = function(position, symbol) {
		this.moves[position.x][position.y] = symbol; 
	}
	
	const Player = function(id, name, symbol) {
		this.id = id
		this.name = name;
		this.lastMove = {
			x: null,
			y: null
		};
		this.score = 0;
		this.symbol = symbol;
	}

	Player.prototype._move = function(board, position) {

		if (!board.moves[position.x][position.y]) {
			board.moves[position.x][position.y] = this.symbol;
			this.lastMove.x = position.x;
			this.lastMove.y = position.y;
		} else {
			alert("Wrong Move! Please check.");
		}
	}

	Player.prototype._incrementScore = function() {
		this.score += 50;
	}

	Player.prototype._setSymbol = function(symbol) {
		this.symbol = symbol;
	}

	Player.prototype._setName = function(name) {
		this.name = name;
	}

	var board, player = {
		A: null,
		B: null
	}, symbol = {
		cross: "X",
		zero: "0"
	};

	const _genrateRandomHash = () => Math.random().toString(36).substring(2);

	const init = function() {
		
		player.A = new Player(_genrateRandomHash(), "Rahul", symbol.cross);
		player.B = new Player(_genrateRandomHash(), "Pamela", symbol.zero);

		board = new Board(dimension);
		board._init();

	}

	const play = function(player, position) {

		player._move(board, position);

		if (!_win(board)) {
			_setWinningMoves(board, player);
		} else {
			player._incrementScore();
			alert("Congratulations! You have won.");
		}
	}

	const _win = function(board) {

	}

	const _setWinningMoves = function(board, player) {

	}

	const _bindDOMToHandlers = function() {

	}

	init();

})(3);
