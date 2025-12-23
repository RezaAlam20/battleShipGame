export function dom() {}
let content = document.querySelector(".content");
let nav = document.querySelector("nav");
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

let startBtn = document.createElement("btn");
startBtn.classList.add("startBtn");
startBtn.textContent = "Start Game";

let firstWindow = document.createElement("div");
let secondWindow = document.createElement("div");

firstWindow.classList.add("window");
secondWindow.classList.add("window");

nav.appendChild(firstWindow);
nav.appendChild(startBtn);
nav.appendChild(secondWindow);

let winner = document.querySelector(".winner");
function resetDom() {
  while (firstGrid.firstElementChild) {
    firstGrid.removeChild(firstGrid.firstElementChild);
  }
  while (secondGrid.firstElementChild) {
    secondGrid.removeChild(secondGrid.firstElementChild);
  }

  createGrid(firstGrid);
  createGrid(secondGrid);
}

export { resetDom };
