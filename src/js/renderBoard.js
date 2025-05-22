import { handleDragStart, handleDragOver, handleDrop, handleDragLeave } from "./move.js";

function renderBoard(board) {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // Clear previous board

  const flippedBoard = [...board].reverse(); // Reverse the board for display

  // Create a container for the board with labels
  const boardContainer = document.createElement("div");
  boardContainer.style.display = "grid";
  boardContainer.style.gridTemplateColumns = "30px repeat(8, 50px)";
  boardContainer.style.gridTemplateRows = "30px repeat(8, 50px)";

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
  for (let row = 0; row < flippedBoard.length; row++) {
    const rowLabel = document.createElement("div");
    rowLabel.textContent = flippedBoard.length - row;
    rowLabel.style.display = "flex";
    rowLabel.style.justifyContent = "center";
    rowLabel.style.alignItems = "center";
    rowLabel.style.fontWeight = "bold";
    boardContainer.appendChild(rowLabel);

    // Add board cells
    for (let col = 0; col < flippedBoard[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "black" : "white");

      const cellId = `${String.fromCharCode(97 + col)}${flippedBoard.length - row}`;
      cell.id = cellId;

      if (
        flippedBoard[row][col] === 1 ||
        flippedBoard[row][col] === 3 ||
        flippedBoard[row][col] === 2 ||
        flippedBoard[row][col] === 4
      ) {
        const piece = document.createElement("div");
        piece.classList.add("piece");

        // Add player-specific classes
        if (flippedBoard[row][col] === 1 || flippedBoard[row][col] === 2) {
          piece.classList.add("player1"); // Black pieces
        } else if (flippedBoard[row][col] === 3 || flippedBoard[row][col] === 4) {
          piece.classList.add("player2"); // White pieces
        }

        if (flippedBoard[row][col] === 2 || flippedBoard[row][col] === 4) {
          piece.classList.add("king"); // Add king styling
        }

        piece.draggable = true;
        piece.addEventListener("dragstart", handleDragStart);
        cell.appendChild(piece);
      }

      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("drop", handleDrop);

      boardContainer.appendChild(cell);
    }
  }

  boardElement.appendChild(boardContainer);
}

export default renderBoard;
