export function dom() {}

let content = document.querySelector(".content");
let nav = document.querySelector("nav");
let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let container = document.querySelector(".container");

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

input.classList.add("placeShip");
//removed the input for now
let resetBtn = document.createElement("div");
resetBtn.classList.add("btn");
resetBtn.classList.add("resetBtn");
resetBtn.textContent = "Reset Board";
container.appendChild(resetBtn);

let info = document.createElement("div");
info.innerHTML = `<p> you can place ships as you but they have to add up to 14 squares
thats 5 4 3 2 length ships or use the random placement</p> `;
info.classList.add("info");
input.appendChild(info);

let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

function createShip(length, className) {
  const ship = document.createElement("div");
  ship.classList.add("ship", className);
  ship.id = length.toString();
  ship.draggable = true;
  return ship;
}
const carrier = createShip(5, "carrier");
const battleship = createShip(4, "battleship");
const destroyer = createShip(3, "destroyer");

const patrol = createShip(2, "patrol");

wrapper.appendChild(carrier);
wrapper.appendChild(battleship);
wrapper.appendChild(destroyer);
wrapper.appendChild(patrol);
content.appendChild(wrapper);

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

function showShips(player) {
  let board = player.gameboard.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let square = firstGrid.querySelector(`#c${i}${j}`);
      square.classList.remove("has-ship");
      if (board[i][j] != undefined && board[i][j] != null) {
        square.classList.add("has-ship");
      }
    }
  }
}

function showHits(player, event) {
  let board = player.gameboard.board;
  let id = event.target.id;
  let split = id.split("");
  // if there is a ship its truthy
  if (board[split[1]][split[2]]) {
    event.target.textContent = "○";
  }
}

let modeBtn = document.createElement("div");
modeBtn.classList.add("modeBtn");
modeBtn.classList.add("btn");
modeBtn.id = "mode";
modeBtn.textContent = "switch mode";
wrapper.appendChild(modeBtn);
export { showHits };
export { showShips };
export { resetDom };
