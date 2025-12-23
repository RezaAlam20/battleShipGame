export function dom() {}
let content = document.querySelector(".content");
let nav = document.querySelector("nav");
let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let container = document.querySelector(".container");
createGrid(firstGrid);
createGrid(secondGrid);
function createGrid(grid) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let div = document.createElement("div");
      div.classList.add("cell");
      div.id = `c${i}${j}`;
      grid.appendChild(div);
    }
  }
}

let startBtn = document.createElement("btn");
startBtn.classList.add("startBtn");
startBtn.classList.add("btn");
startBtn.textContent = "Start Game";

let firstWindow = document.createElement("div");
let secondWindow = document.createElement("div");

firstWindow.classList.add("window");
firstWindow.id = "firstWin";
secondWindow.classList.add("window");
secondWindow.id = "secondWin";

nav.appendChild(firstWindow);
container.appendChild(startBtn);
nav.appendChild(secondWindow);

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

let randomBtn = document.createElement("div");
randomBtn.textContent = "Random Ships";
randomBtn.classList.add("btn");
randomBtn.classList.add("randomBtn");
container.appendChild(randomBtn);

let input = document.createElement("div");

input.innerHTML = `       <form action="">
      <label for="name"> place Ships
        <input type="text" placeholder="row,column,length" id=input />
      </label>
      <button type="submit" class="submitBtn">submit</button>
    </form>`;

input.classList.add(".placeShip");
content.appendChild(input);

function showShips(player) {
  let board = player.gameboard.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == undefined) {
        let square = firstGrid.querySelector(`#c${i}${j}`);
        square.style.backgroundColor = " rgb(101, 101, 101)";
      } else if (board[i][j] != undefined || board[i][j] != null) {
        let square = firstGrid.querySelector(`#c${i}${j}`);
        square.style.backgroundColor = "red";
      }
    }
  }
}

export { showShips };
export { resetDom };
