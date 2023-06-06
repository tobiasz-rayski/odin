const createPlayer = (name, mark) => {
  return {
    name,
    mark,
    score: 0,
  };
};

const player1 = createPlayer("Jeff", "x");
const player2 = createPlayer("Tom", "o");

const gameBoard = (function () {
  const board = new Array(9).fill(null);
  let currentPlayer = player1;

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
      return true;
    }
    return false;
  };

  const isTie = (mark) => {
    const win = isWin(mark);
    return board.every((item) => item !== null) && !win;
  };

  const getCurrentPlayer = () => currentPlayer;

  const getBoard = () => board;

  const changeTurns = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const reset = () => {
    board.fill(null);
  };

  const isLegalMove = (player, space) => {
    const playerTurn = getCurrentPlayer();
    return playerTurn === player && board[space] === null;
  };

  const placeMark = (player, space) => {
    const moveIsLegal = isLegalMove(player, space);

    if (moveIsLegal) {
      board[space] = player.mark;
      if (!isWin(player.mark)) {
        changeTurns();
      } else {
        player.score++;
      }
    }
  };

  const updateGameState = (index) => {
    const currentPlayer = gameBoard.getCurrentPlayer();
    gameBoard.placeMark(currentPlayer, index);
  };

  return {
    getBoard,
    getCurrentPlayer,
    updateGameState,
    placeMark,
    isWin,
    isTie,
    reset,
  };
})();

const displayController = (function () {
  const updateDisplay = (oMark, xMark) => {
    const currentPlayer = gameBoard.getCurrentPlayer();
    if (currentPlayer === player1) {
      oMark.classList.remove("hide");
      oMark.classList.add("show");
    } else {
      xMark.classList.remove("hide");
      xMark.classList.add("show");
    }
  };

  const spaces = document.querySelectorAll(".space");

  spaces.forEach((space, index) => {
    space.id = "space-" + index;

    let xMark = document.createElement("object");
    let oMark = document.createElement("object");

    xMark.setAttribute("type", "image/svg+xml");
    xMark.setAttribute("data", "./img/x.svg");
    xMark.setAttribute("width", "37");
    xMark.setAttribute("height", "37");
    xMark.classList.add("mark");
    xMark.classList.add("hide");

    space.appendChild(xMark);

    oMark.setAttribute("type", "image/svg+xml");
    oMark.setAttribute("data", "./img/o.svg");
    oMark.setAttribute("width", "37");
    oMark.setAttribute("height", "37");
    oMark.classList.add("mark");
    oMark.classList.add("hide");

    space.appendChild(oMark);

    space.addEventListener("click", () => {
      gameBoard.updateGameState(index);
      updateDisplay(oMark, xMark);
    });
  });
})();
