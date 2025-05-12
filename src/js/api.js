import renderBoard from "./renderBoard.js";

// POST request for sending the move
export async function sendMoveToBackend(move) {
  if (!move) {
    console.error("No move to send!");
    return;
  }
  console.log("Sending move to backend:", move);

  await fetch("http://localhost:8080/move", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: move,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Move sent successfully");
    

      // Clear the pending move and re-enable the button
      //pendingMove = null;
      const button = document.getElementById("make-move-button");
      button.disabled = true;

      fetchUpdatedBoardState();
    })
    .catch((error) => {
      console.error("Error sending move:", error);
    });
}

// GET request for getting updated boardstate
export async function fetchUpdatedBoardState() {
  console.log("Fetching updated board state from backend...");

  await fetch("http://localhost:8080/boardstate", {
    method: "GET",
    //headers: { "Content-Type": "application/json" },
    headers: { "Content-Type": "text/plain" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((boardState) => {
      console.log("Updated board state received:", boardState);

      // Re-render the board with the new state
      renderBoard(boardState); // Assuming the backend sends the board state as `data.boardState`
    })
    .catch((error) => {
      console.error("Error fetching updated board state:", error);
    });
}

