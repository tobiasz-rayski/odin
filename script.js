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
  let currentPlayer = player1.score > player2.score ? player2 : player1;
  let tieScore = 0;
  let gameOn = true;

  const getCurrentPlayer = () => currentPlayer;
  const getBoard = () => board;
  const getTieScore = () => tieScore;

  const setCurrentPlayer = () => {
    currentPlayer = player1.score > player2.score ? player2 : player1;
  };

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
    return board[space] === null && gameOn === true;
  };

  const placeMark = (space) => {
    board[space] = currentPlayer.mark;
  };

  const changeTurns = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const reset = () => {
    gameOn = true;
    board.fill(null);
  };

  const addPlayerScore = () => {
    currentPlayer.score++;
  };

  const addTieScore = () => {
    tieScore++;
  };

  const stopGame = () => {
    gameOn = false;
  };

  const isGameOn = () => gameOn;

  return {
    isGameOn,
    stopGame,
    isWin,
    isTie,
    addPlayerScore,
    addTieScore,
    getBoard,
    getCurrentPlayer,
    placeMark,
    changeTurns,
    getTieScore,
    setCurrentPlayer,
    isLegalMove,
    reset,
  };
})();

const displayController = (function () {
  const playAgainBtn = document.getElementById("play-again");
  const resetBtn = document.getElementById("reset");
  const modal = document.getElementById("modal");
  const gameLog = document.getElementById("log");
  const spaces = document.querySelectorAll(".space");
  const playerOneScore = document.getElementById("player-1-score");
  const playerTwoScore = document.getElementById("player-2-score");
  const turnOne = document.getElementById("turn-1");
  const turnTwo = document.getElementById("turn-2");

  const toggleTurns = () => {
    currentPlayer = gameBoard.getCurrentPlayer();
    if (currentPlayer === player1) {
      turnOne.textContent = "🟢";
      turnTwo.textContent = "";
    } else if (currentPlayer === player2) {
      turnOne.textContent = "";
      turnTwo.textContent = "🟢";
    }
  };

  toggleTurns();

  const toggleModal = () => {
    modal.classList.toggle("hide");
    modal.classList.toggle("show");
  };

  const displayMsgWin = () => {
    const currentPlayer = gameBoard.getCurrentPlayer();
    gameLog.textContent = `${currentPlayer.name} wins!`;
  };

  const displayMsgTie = () => {
    gameLog.textContent = `It's a TIE!`;
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

  const updateScore = () => {
    playerOneScore.textContent = player1.score;
    playerTwoScore.textContent = player2.score;
  };

  const displayReset = () => {
    gameLog.textContent = "";

    marks.forEach((mark) => {
      mark.classList.remove("show");
      mark.classList.add("hide");
    });
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
      const gameOn = gameBoard.isGameOn();
      const moveIsLegal = gameBoard.isLegalMove(index);

      if (!gameOn) {
        return;
      }

      if (moveIsLegal) {
        gameBoard.placeMark(index);
        updateDisplay(xMark, oMark);

        const win = gameBoard.isWin();
        const tie = gameBoard.isTie();

        if (win) {
          gameBoard.addPlayerScore();
          updateScore();
          displayMsgWin();
          toggleModal();
          gameBoard.stopGame();
        } else if (tie) {
          gameBoard.addTieScore();
          displayMsgTie();
          toggleModal();
          gameBoard.stopGame();
        } else {
          gameBoard.changeTurns();
          toggleTurns();
        }
      }
    });
  });

  const marks = document.querySelectorAll(".mark");

  playAgainBtn.onclick = () => {
    gameBoard.reset();
    displayReset();
    toggleModal();
    gameBoard.setCurrentPlayer();
    toggleTurns();
  };

  resetBtn.onclick = () => {
    gameBoard.reset();
    displayReset();
    player1.score = 0;
    player2.score = 0;
    updateScore();
  };
})();
