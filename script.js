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
  let tieScore = 0;
  let gameOn = true;

  const getCurrentPlayer = () => currentPlayer;
  const getBoard = () => board;
  const getTieScore = () => tieScore;

  const isWin = () => {
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

    const win = winConditions.some((arr) =>
      arr.every((index) => board.at(index) === currentPlayer.mark)
    );

    if (win) {
      return true;
    }
    return false;
  };

  const isTie = () => {
    const win = isWin();
    if (board.every((item) => item !== null && !win)) {
      return true;
    }
    return false;
  };

  const isLegalMove = (space) => {
    return board[space] === null && gameOn;
  };

  const placeMark = (space) => {
    board[space] = currentPlayer.mark;
  };

  const changeTurns = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const reset = () => {
    board.fill(null);
  };

  const addPlayerScore = () => {
    currentPlayer.score++;
  };

  const addTieScore = () => {
    tieScore++;
  };

  return {
    isWin,
    isTie,
    addPlayerScore,
    addTieScore,
    getBoard,
    getCurrentPlayer,
    placeMark,
    changeTurns,
    tieScore,
    getTieScore,
    isLegalMove,
    reset,
  };
})();

const displayController = (function () {
  const gameLog = document.getElementById("log");
  const spaces = document.querySelectorAll(".space");

  const displayMessage = () => {
    const currentPlayer = gameBoard.getCurrentPlayer();
    gameLog.textContent = `${currentPlayer.name} wins!`;
  };

  const updateDisplay = (xMark, oMark) => {
    const currentPlayer = gameBoard.getCurrentPlayer();
    if (currentPlayer === player1) {
      xMark.classList.remove("hide");
      xMark.classList.add("show");
    } else {
      oMark.classList.remove("hide");
      oMark.classList.add("show");
    }
  };

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
      const currentPlayer = gameBoard.getCurrentPlayer();
      const tieScore = gameBoard.getTieScore();

      if (gameBoard.isLegalMove(index)) {
        gameBoard.placeMark(index);
        updateDisplay(xMark, oMark);

        const win = gameBoard.isWin();
        const tie = gameBoard.isTie();

        if (win) {
          currentPlayer.score++;
          gameBoard.gameOn = !gameBoard.gameOn;
        } else if (tie) {
          tieScore++;
        } else {
          gameBoard.changeTurns();
        }
      }

      console.log(gameBoard.getBoard());
      console.log(player1);
      console.log(player2);
      console.log(gameBoard.getCurrentPlayer());
    });
  });
})();
