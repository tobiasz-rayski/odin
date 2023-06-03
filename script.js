const gameBoard = (function () {
  const space = {
    o: false,
    x: false,
  };

  let board;
  const setUp = () => {
    board = [];
    while (board.length < 3) {
      board.push([]);
    }

    for (row of board) {
      while (row.length < 3) {
        row.push(space);
      }
    }
    return board;
  };

  const getBoard = () => {
    console.log(board);
  };
  return {
    setUp,
    getBoard,
  };
})();

gameBoard.setUp();
gameBoard.getBoard();
