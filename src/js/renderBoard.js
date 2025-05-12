function renderBoard(board) {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // Clear previous board

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "black" : "white");

      if (board[row][col] === 1) {
        const piece = document.createElement("div");
        piece.classList.add("piece", "player1");
        cell.appendChild(piece);
      } else if (board[row][col] === 3) {
        const piece = document.createElement("div");
        piece.classList.add("piece", "player2");
        cell.appendChild(piece);
      }

      boardElement.appendChild(cell);
    }
  }
}

export default renderBoard;