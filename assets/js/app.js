"use strict";

let tictactoe = (function(dimension) {

	let board, player = {
		A: null,
		B: null
	}, symbol = {
		cross: "X",
		zero: "0"
	}, currentPlayer = null;

	const Board = function(dimension) {
		this.dimension = dimension;
		this.moves = new Array(dimension);
		this.cells = new Array(dimension);
		this.DOM = null;
	} 

	Board.prototype._init = function(currentPlayer) {
		let i, j, row, column;
		
		/* Cache the DOM for faster manipulation */
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
		} 
		return true;
	}

	Board.prototype._drawSymbol = function(cell) {
		event.preventDefault();

		if (this._isValidMove(cell)) {	
			cell.innerText = currentPlayer.symbol;
			currentPlayer.currentMove.x = cell.getAttribute('data-row');
			currentPlayer.currentMove.y = cell.getAttribute('data-column');
		} else alert("Wrong Move! Please check.");
	}

	Board.prototype._bindHandler = function() {
		let i, j, cell;
		for (i = 0; i < this.dimension; ++i) 
			for (j = 0; j < this.dimension; ++j) 
				this.cells[i][j].onclick = this._drawSymbol.bind(this, this.cells[i][j]);
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
	}

	Player.prototype._move = function(board) {
		board.moves[this.currentMove.x][this.currentMove.y] = this.symbol;
		this.lastMove.x = this.currentMove.x;
		this.lastMove.y = this.currentMove.y;
		this.currentMove = {
			x: null,
			y: null
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

	const _generateRandomHash = () => Math.random().toString(36).substring(2);

	const init = function() {
		player.A = new Player(_generateRandomHash(), "Rahul", symbol.cross);
		player.B = new Player(_generateRandomHash(), "Pamela", symbol.zero);
		currentPlayer = player.A;
		board = new Board(dimension);
		board._init(currentPlayer);
		board._bindHandler();
	}

	const play = function() {
		currentPlayer._move(board);
		_computeSum(currentPlayer);

		if (_hasWon(currentPlayer)) {
			currentPlayer._incrementScore();
			alert("Congratulations! You have won. Keep it up " + currentPlayer.name);
		} else {
			if (currentPlayer.id === player.A.id)
				currentPlayer = player.B;
			else
				currentPlayer = player.A;
		}
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

	init();
	document.querySelector('#move').onclick = play;
})(3);
