import  renderBoard  from './js/renderBoard.js';
import { sendMoveToBackend, fetchUpdatedBoardState } from './js/api.js';
import { getPendingMove } from './js/move.js';


// const boardState = [
//   [1, 0, 1, 0, 1, 0, 1, 0],
//   [0, 1, 0, 1, 0, 1, 0, 1],
//   [1, 0, 1, 0, 1, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 3, 0, 3, 0, 3, 0, 3],
//   [3, 0, 3, 0, 3, 0, 3, 0],
//   [0, 3, 0, 3, 0, 3, 0, 3],
// ];

// renderBoard(boardState);

fetchUpdatedBoardState();

document.getElementById("make-move-button").disabled = true;

document.getElementById("make-move-button").addEventListener("click", () => {
  const move = getPendingMove(); // Retrieve the pending move
  if (move) {
    sendMoveToBackend(move); // Send the move to the backend
  } else {
    console.log("No move to commit!");
  }
});