const gameBoard = (function () {
  const board = new Array(9).fill(null);

  const isWin = (mark) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let win = winConditions.some((arr) =>
      arr.every((index) => board.at(index) === mark)
    );

    let full = board.every((item) => item !== null);

    if (win) {
      return true;
    } else if (full && !win) {
      console.log("TIE");
    }
    return false;
  };

  const reset = () => {
    board.fill(null);
  };

  const changeTurns = () => {
    player1.isTurn = !player1.isTurn;
    player2.isTurn = !player2.isTurn;
  };

  const placeMark = (player, space) => {
    const isLegalMove = player.isTurn === true && board[space] === null;

    if (isLegalMove) {
      board[space] = player.mark;
      if (!isWin(player.mark)) {
        changeTurns();
      } else {
        player.score++;
      }
    }
  };

  return {
    board,
    isWin,
    reset,
    placeMark,
    changeTurns,
  };
})();

const createPlayer = (name, mark) => {
  const isTurn = false;
  const score = 0;

  return {
    name,
    mark,
    isTurn,
    score,
  };
};

const player1 = createPlayer("Jeff", "x");
const player2 = createPlayer("Tom", "o");
player1.isTurn = true;

// Check TIE

/* gameBoard.placeMark(player1, 4);
gameBoard.placeMark(player2, 6);
gameBoard.placeMark(player1, 8);
gameBoard.placeMark(player2, 0);
gameBoard.placeMark(player1, 3);
gameBoard.placeMark(player2, 5);
gameBoard.placeMark(player1, 1);
gameBoard.placeMark(player2, 7);
gameBoard.placeMark(player1, 2); */

// Check WIN

/*
gameBoard.placeMark(player1, 4);
gameBoard.placeMark(player2, 6);
gameBoard.placeMark(player1, 8);
gameBoard.placeMark(player2, 0);
gameBoard.placeMark(player1, 3);
gameBoard.placeMark(player2, 5);
gameBoard.placeMark(player1, 1);
gameBoard.placeMark(player2, 2);
gameBoard.placeMark(player1, 7);
*/

console.log(player1.score);
console.log(player2.score);
console.log(gameBoard.board);

const displayController = (function () {})();
