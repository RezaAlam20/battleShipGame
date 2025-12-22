export function dom() {}

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
createGrid(firstGrid);
createGrid(secondGrid);
function createGrid(grid) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let div = document.createElement("div");
      div.classList.add("cell");
      div.id = `${i}${j}`;
      grid.appendChild(div);
    }
  }
}
