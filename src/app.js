import { sendMoveToBackend, fetchUpdatedBoardState } from './js/api.js';
import { getPendingMove } from './js/move.js';

fetchUpdatedBoardState();

document.getElementById("make-move-button").disabled = true;

document.getElementById("make-move-button").addEventListener("click", () => {
  const move = getPendingMove();
  if (move) {
    sendMoveToBackend(move);
  } else {
    console.log("No move to commit!");
  }
});