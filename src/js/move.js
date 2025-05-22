let sourceCellId = null;
let pendingMove = null;

export function handleDragStart(event) {
  sourceCellId = event.target.parentElement.id; // Get the ID of the source cell
}

export function handleDragOver(event) {
  event.preventDefault(); // Allow dropping
  const target = event.target.closest(".cell");
  if (target) {
    target.classList.add("dragover"); 
  }
}

export function handleDrop(event) {
  event.preventDefault();
  const target = event.target.closest(".cell");
  if (target) {
    target.classList.remove("dragover");
  }
  const targetCellId = target.id;
  if (sourceCellId && targetCellId && sourceCellId !== targetCellId) {
    pendingMove = `${sourceCellId}-${targetCellId}`;
    console.log(`Pending Move: ${pendingMove}`); // THE MOVE STRING. IE: "a3-b4" - WE WILL SEND THIS TO BACKEND
    // Move the piece in the DOM
    const piece = document.querySelector(`#${sourceCellId} .piece`);
    if (piece) {
      target.appendChild(piece);
    }
    const button = document.getElementById("make-move-button");
    button.disabled = !pendingMove;
    sourceCellId = null;
  }
}
export function handleDragLeave(event) {
  const target = event.target.closest(".cell");
  if (target) {
    target.classList.remove("dragover");
  }
}

export function getPendingMove() {
  return pendingMove;
}
