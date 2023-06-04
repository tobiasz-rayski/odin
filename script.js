const gameBoard = (function () {
  const gameBoard = new Array(9).fill(null);
  let mark = "x";

  const randomFill = () => {
    while (gameBoard.some((item) => item === null)) {
      let random = Math.floor(Math.random() * 9);
      if (gameBoard[random] === null) {
        gameBoard[random] = mark;
        mark = mark === "x" ? "o" : "x";
      }
    }
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
  };

  return { gameBoard, randomFill, isWin };
})();

gameBoard.randomFill();
console.log(gameBoard.gameBoard);
