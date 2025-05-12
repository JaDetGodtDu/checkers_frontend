import { handleDragStart, handleDragOver, handleDrop, handleDragLeave } from "./move.js";

function renderBoard(board) {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // Clear previous board

  // Create a container for the board with labels
  const boardContainer = document.createElement("div");
  boardContainer.style.display = "grid";
  boardContainer.style.gridTemplateColumns = "30px repeat(8, 50px)";
  boardContainer.style.gridTemplateRows = "30px repeat(8, 50px)";

  // Add an empty top-left corner
  const corner = document.createElement("div");
  boardContainer.appendChild(corner);

  // Add column labels (letters a-h)
  for (let col = 0; col < 8; col++) {
    const colLabel = document.createElement("div");
    colLabel.textContent = String.fromCharCode(97 + col); // Convert 0-7 to 'a'-'h'
    colLabel.style.display = "flex";
    colLabel.style.justifyContent = "center";
    colLabel.style.alignItems = "center";
    colLabel.style.fontWeight = "bold";
    boardContainer.appendChild(colLabel);
  }

  // Add row labels and the board cells
  for (let row = board.length - 1; row >= 0; row--) {
    // Add row label (numbers 1-8)
    const rowLabel = document.createElement("div");
    rowLabel.textContent = board.length - row; // Convert 7-0 to 1-8
    rowLabel.style.display = "flex";
    rowLabel.style.justifyContent = "center";
    rowLabel.style.alignItems = "center";
    rowLabel.style.fontWeight = "bold";
    boardContainer.appendChild(rowLabel);

    // Add board cells
    for (let col = 0; col < board[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "black" : "white");

      const cellId = `${String.fromCharCode(97 + col)}${board.length - row}`;
      cell.id = cellId;

      if (board[row][col] === 1 || board[row][col] === 3) {
        const piece = document.createElement("div");
        piece.classList.add("piece", board[row][col] === 1 ? "player1" : "player2");
        piece.draggable = true; // Make the piece draggable
        piece.addEventListener("dragstart", handleDragStart);
        cell.appendChild(piece);
      }

      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("drop", handleDrop);

      boardContainer.appendChild(cell);
    }
  }

  // Append the board container to the board element
  boardElement.appendChild(boardContainer);
}

export default renderBoard;
