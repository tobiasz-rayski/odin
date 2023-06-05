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

const getPlayerTurn = () => {
  if (player1.isTurn) {
    return player1;
  } else {
    return player2;
  }
};

const player1 = createPlayer("Jeff", "x");
const player2 = createPlayer("Tom", "o");
player1.isTurn = true;

const displayController = (function () {
  const spaces = document.querySelectorAll(".space");

  spaces.forEach((item, index) => {
    item.id = "space-" + index;

    item.addEventListener("click", function () {
      if (getPlayerTurn() === player1) {
        gameBoard.placeMark(getPlayerTurn(), index);
        item.textContent = gameBoard.board[index].toUpperCase();
      } else gameBoard.placeMark(getPlayerTurn(), index);
      item.textContent = gameBoard.board[index].toUpperCase();
    });
  });
})();
