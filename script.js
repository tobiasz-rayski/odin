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
        row.push({ ...space });
      }
    }

    return board;
  };

  const getBoard = () => {
    return board;
  };

  return {
    setUp,
    getBoard,
  };
})();

const createPlayer = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  const placeMarker = (space) => {
    const board = gameBoard.getBoard();
    board[0][1][mark] = true;
    console.log(board);
  };

  return { getName, getMark, placeMarker };
};

const player1 = createPlayer("Jeff", "x");

gameBoard.setUp();
player1.placeMarker();
