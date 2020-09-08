"use strict";

let tictactoe = (function(dimension) {

	let board, player = {
		A: null,
		B: null
	}, symbol = {
		cross: "<svg style=\"width: 60px; height: 60px\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"times\" class=\"svg-inline--fa fa-times fa-w-11\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 512\"><path fill=\"currentColor\" d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"></path></svg>",
		zero: "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"dot-circle\" class=\"svg-inline--fa fa-dot-circle fa-w-16\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z\"></path></svg>"
	}, currentPlayer = null, playerDOM = document.querySelector('#players'), controlsDOM = document.querySelector('#controls');

	const Board = function(dimension) {
		this.dimension = dimension;
		this.moves = new Array(dimension);
		this.cells = new Array(dimension);
		this.DOM = null;
	} 

	Board.prototype._init = function() {
		let i, j, row, column;
		
		/* Cache the DOM for faster board manipulation */
		this.DOM = document.querySelector('#board');
		
		for (i = 0; i < this.dimension; ++i) {
			this.moves[i] = new Array(this.dimension);
			this.cells[i] = new Array(this.dimension);
			row = document.createElement('tr');

			for (j = 0; j < this.dimension; ++j) {
				this.moves[i][j] = null;
				column = document.createElement('td');
				column.setAttribute('data-row', i);
				column.setAttribute('data-column', j);
				row.appendChild(column);
				this.cells[i][j] = column;
			}
			this.DOM.getElementsByTagName('table')[0].appendChild(row);
		}
	}

	Board.prototype._isValidMove = function(cell) {
		if (currentPlayer.currentMove.x && currentPlayer.currentMove.y) {

			if (this.moves[cell.getAttribute('data-row')][cell.getAttribute('data-column')]) {
				return false;
			}
			this.cells[currentPlayer.currentMove.x][currentPlayer.currentMove.y].innerText = null;
		} else if (this.moves[cell.getAttribute('data-row')][cell.getAttribute('data-column')]) {
			return false;
		}
		return true;
	}

	Board.prototype._drawSymbol = function(cell) {
		event.preventDefault();

		if (this._isValidMove(cell)) {	
			cell.innerHTML = currentPlayer.symbol;
			currentPlayer.currentMove.x = cell.getAttribute('data-row');
			currentPlayer.currentMove.y = cell.getAttribute('data-column');
		} else {
			modal.init('_Invalid');
			modal.on();
		}
	}

	Board.prototype._bindHandler = function() {
		let i, j, cell;
		for (i = 0; i < this.dimension; ++i) 
			for (j = 0; j < this.dimension; ++j) 
				this.cells[i][j].onclick = this._drawSymbol.bind(this, this.cells[i][j]);
	}

	Board.prototype._unbindHandler = function() {
		let i, j, cell;
		for (i = 0; i < this.dimension; ++i) 
			for (j = 0; j < this.dimension; ++j) 
				this.cells[i][j].onclick = null;
	}

	Board.prototype._softReset = function() {
		let i, j;
		this.moves = new Array(dimension);
		for (i = 0; i < this.dimension; ++i) {
			this.moves[i] = new Array(this.dimension);
			for (j = 0; j < this.dimension; ++j) {
				this.moves[i][j] = null;
				this.cells[i][j].innerHTML = null;
			}
		}
	}
	
	const Player = function(id, name, symbol) {
		this.id = id
		this.name = name;
		this.lastMove = {
			x: null,
			y: null
		};
		this.currentMove = {
			x: null,
			y: null
		};
		this.sums = {
			row: new Array(dimension).fill(0),
			column: new Array(dimension).fill(0),
			diagonal: {
				left: 0,
				right: 0
			}
		}
		this.score = 0;
		this.symbol = symbol;
		this.DOM = null
	}

	Player.prototype._init = function(id) {
		this.DOM = playerDOM.querySelector('#' + id);
	}

	Player.prototype._move = function(board) {
		if (this.currentMove.x && this.currentMove.y) {
			board.moves[this.currentMove.x][this.currentMove.y] = this.symbol;
			this.lastMove.x = this.currentMove.x;
			this.lastMove.y = this.currentMove.y;
			this.currentMove = {
				x: null,
				y: null
			}
		} else {
			modal.init('_Invalid');
			modal.on();
		}
	}

	Player.prototype._incrementScore = function() {
		this.score += 50;
	}

	Player.prototype._undo = function() {

	}

	Player.prototype._softReset = function() {
		this.lastMove = {
			x: null,
			y: null
		};
		this.currentMove = {
			x: null,
			y: null
		};
		this.sums = {
			row: new Array(dimension).fill(0),
			column: new Array(dimension).fill(0),
			diagonal: {
				left: 0,
				right: 0
			}
		}
	}

	Player.prototype._setSymbol = function(symbol) {
		this.symbol = symbol;
	}

	Player.prototype._setName = function(name) {
		this.name = name;
	}

	Player.prototype._getSymbol = () => this.symbol;

	Player.prototype._getName = () => this.name;

	const _generateRandomHash = () => Math.random().toString(36).substring(2);

	const init = function() {
		player.A = new Player(_generateRandomHash(), "Rahul", symbol.cross);
		player.B = new Player(_generateRandomHash(), "Pamela", symbol.zero);
		player.A._init('playerA');
		player.B._init('playerB');
		currentPlayer = player.A;
		board = new Board(dimension);
		board._init();
		board._bindHandler();
	}

	const restart = function() {
		player.A._softReset();
		player.B._softReset();
		currentPlayer = player.A;
		board._softReset();
		board._bindHandler();
	}

	const play = function() {
		currentPlayer._move(board);
		_computeSum(currentPlayer);

		if (_hasWon(currentPlayer)) {
			currentPlayer._incrementScore();
			modal.init('_Win');
			modal.on({name: currentPlayer.name});
			_printScore();
			board._unbindHandler();
		} else {
			if (currentPlayer.id === player.A.id)
				currentPlayer = player.B;
			else currentPlayer = player.A;
		}
	}

	const _printScore = function() {
		currentPlayer.DOM.querySelector('.points').innerText = currentPlayer.score + 'p';
	}

	const _hasWon = function(player) {
		let x = player.lastMove.x, y = player.lastMove.y;

		/* Winning conditions */
		if (player.sums.row[x] == dimension || player.sums.column[y] == dimension || player.sums.diagonal.left == dimension || player.sums.diagonal.right == dimension) {
			return true;
		}
	}

	const _computeSum = function(player) {
		let x = player.lastMove.x, y = player.lastMove.y;

		player.sums.row[x] += 1;
		player.sums.column[y] += 1;
		if (x == y) 
			player.sums.diagonal.left += 1;
		
		if (x == dimension - y - 1) 
			player.sums.diagonal.right += 1;
	}

	/* Game Controls */
	init();
	controlsDOM.querySelector('#move').onclick = play;
	controlsDOM.querySelector('#restart').onclick = function() {
		restart();
		modal.init('_Reset');
		modal.on();
	};
	controlsDOM.querySelector('#stats').onclick = function() {
		modal.init('_Stats');
		modal.on();
	};
})(3);
