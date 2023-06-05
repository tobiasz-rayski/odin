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

    if (win) {
      console.log(`${mark} wins.`);
      return true;
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
    if (board[space] === null) {
      board[space] = player.mark;
      isWin(player.mark);
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

const Player = (name, mark) => {
  const isTurn = false;

  return {
    name,
    mark,
    isTurn,
  };
};

const player1 = Player("Jeff", "x");
const player2 = Player("Tom", "o");
player1.isTurn = true;

// gameBoard.placeMark(player1, 0);
// console.log(gameBoard.board);

// gameBoard.reset();

// const randomFill = () => {
//   let mark = "x";
//   while (board.some((item) => item === null)) {
//     let random = Math.floor(Math.random() * 9);
//     if (board[random] === null) {
//       board[random] = mark;
//       if (isWin(mark) === true) break;
//       mark = mark === "x" ? "o" : "x";
//     }
//   }
// };
