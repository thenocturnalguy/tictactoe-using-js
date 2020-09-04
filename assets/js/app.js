"use strict";

/* Cache the DOM for faster manipulation */
let boardDOM = document.querySelector('#board');

let tictactoe = (function(dimension) {

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
		this.sums = {
			row: new Array(dimension).fill(1),
			column: new Array(dimension).fill(1),
			diagonal: {
				left: 1,
				right: 1
			}
		}
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
		_computeSum(player);

		if (_hasWon(player)) {
			player._incrementScore();
			alert("Congratulations! You have won.");
		}
	}

	const _hasWon = function(player) {
		let x = player.lastMove.x, y = player.lastMove.y;

		/* Winning conditions */
		if (player.sums.row[y] == dimension || player.sums.column[x] == dimension || player.sums.diagonal.left == dimension || player.sums.diagonal.right == dimension) {
			return true;
		}
	}

	const _computeSum = function(player) {
		let x = player.lastMove.x, y = player.lastMove.y;

		player.sums.row[y] += 1;
		player.sums.column[x] += 1;

		if (x == y) 
			player.sums.diagonal.left += 1;
		
		if (x == n - y - 1) 
			player.sums.diagonal.right += 1;
	}

	const _bindDOMToHandlers = function() {

	}

	window.addEventListener('load', init);

})(3);
