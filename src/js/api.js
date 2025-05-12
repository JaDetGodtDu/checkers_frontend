import renderBoard from "./renderBoard.js";

// POST request for sending the move
export function sendMoveToBackend(move) {
  if (!move) {
    console.error("No move to send!");
    return;
  }
  console.log("Sending move to backend:", move);

  fetch("http://localhost:8080/move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: move,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Move response from backend:", data);

      // Clear the pending move and re-enable the button
      pendingMove = null;
      const button = document.getElementById("make-move-button");
      button.disabled = true;

      const boardState = parseBoardArray(data);
      renderBoard(boardState);
    })
    .catch((error) => {
      console.error("Error sending move:", error);
    });
}

// GET request for getting updated boardstate
export function fetchUpdatedBoardState() {
  console.log("Fetching updated board state from backend...");

  fetch("http://localhost:8080/boardstate", {
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
    .then((data) => {
      console.log("Updated board state received:", data);

      // Re-render the board with the new state
      const boardState = parseBoardArray(data);
      renderBoard(boardState); // Assuming the backend sends the board state as `data.boardState`
    })
    .catch((error) => {
      console.error("Error fetching updated board state:", error);
    });
}

function parseBoardArray(data) {
  // Convert the plain text board array into a JavaScript array
  try {
    return JSON.parse(data); // Assuming the backend sends a valid JSON array as plain text
  } catch (error) {
    console.error("Error parsing board array:", error);
    return [];
  }
}