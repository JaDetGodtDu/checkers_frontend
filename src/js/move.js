let sourceCellId = null;

export function handleDragStart(event) {
  sourceCellId = event.target.parentElement.id; // Get the ID of the source cell
}

export function handleDragOver(event) {
    event.preventDefault(); // Allow dropping
    const target = event.target.closest(".cell");
    if (target) {
      target.classList.add("dragover"); // Add the dragover class
    }
}

export function handleDrop(event) {
    event.preventDefault();
    const target = event.target.closest(".cell");
    if (target) {
      target.classList.remove("dragover"); // Remove the dragover class
    }

    const targetCellId = target.id; // Get the ID of the target cell
    if (sourceCellId && targetCellId && sourceCellId !== targetCellId) {
      // Print the move in the format "a3-b4"
      const move = `${sourceCellId}-${targetCellId}`;
      console.log(`${move}`); // THE MOVE STRING. IE: "a3-b4" - WE WILL SEND THIS TO BACKEND

      // Move the piece in the DOM
      const piece = document.querySelector(`#${sourceCellId} .piece`);
      if (piece) {
        target.appendChild(piece);
      }

      // Clear the source cell ID
      sourceCellId = null;
    }
}
export function handleDragLeave(event) {
  const target = event.target.closest(".cell");
  if (target) {
    target.classList.remove("dragover"); // Remove the dragover class
  }
}
