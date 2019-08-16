let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const grid = [];
  for ( let i = 1; i <= 8; i++) {
    grid.push( new Array(8));
  }

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let row = pos[0];
  let col = pos[1];
  if (row > 7 || col > 7){
    throw new Error('Not valid pos!');
  }
  return this.grid[row][col];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let currentPiece = this.getPiece(pos);
  if (currentPiece === undefined) {
    return undefined;
  } else { 
   return currentPiece.color === color;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let currentPiece = this.getPiece(pos);
  if (currentPiece === undefined){
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (this.hasMove('black') === false && this.hasMove('white') === false){
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let row = pos[0];
  let col = pos[1];
  if (row > 7 || col > 7 || row < 0 || col < 0 ) {
    return false;
  } else {
    return true;
  }

};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position. #HANDLED
 *
 * Returns null if no pieces of the opposite color are found. #HANDLED
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip = []) {
  
  let oRow = pos[0];
  let oCol = pos[1];
  let currPos = [oRow, oCol];

  let dirRow = dir[0];
  let dirCol = dir[1];

  function nextPos(row, col) {
    oRow = row + dirRow;
    oCol = col + dirCol;
    return [oRow, oCol];
  }

  let nextPosse = nextPos(oRow, oCol);
  
  //console.log(instanceof(board));
  if (board.isValidPos(nextPosse) === false) {
    return null;
  }
  
  if (!board.isOccupied(nextPosse)) {
    return null;
  }
  if (board.isMine(nextPosse, color)) {
    return [];
  }  

  piecesToFlip.concat(nextPosse).concat(_positionsToFlip(board, nextPosse, color, dir, piecesToFlip = []));

  if ( piecesToFlip === [] ) {
    return null;
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let row = pos[0]; //we could refactor into helper method
  let col = pos[1];
  this.grid[row][col] = new Piece(color);
  
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {

  if (this.isOccupied(pos)) {
    return false;
  } 

  for (let i = 0; i < Board.DIRS.length; i++) {
    if (_positionsToFlip(this, pos, color, Board.DIRS[i], []) === null) {
      return false;
    } else {
      return true;
    }
  }
  // Board.DIRS.forEach(function(dir){
    
    // while (this.isValidPos(currPos)){
    //   let nextPosse = nextPos(oRow, oCol);
    //   if (!this.isOccupied(nextPos)){
    //     break;
    //   } 
    //   if (this.isMine(nextPos)) {
    //     break;
    //   }
      // if ()  //  _positionsToFlip (board, pos, color, dir, piecesToFlip)
    // } );
};


/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;


function _positionsToFlip(board, pos, color, dir, piecesToFlip = [])