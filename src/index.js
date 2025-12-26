import { dom, showHits } from "./dom.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { resetDom } from "./dom.js";
import { showShips } from "./dom.js";
import { createShip } from "./dom.js";
dom();

let player1 = new Player("human", "player1");
let player2 = new Player("human", "player2");

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let currTurn = undefined;
let startBtn = document.querySelector(".startBtn");
let content = document.querySelector(".content");
let randomBtn = document.querySelector(".randomBtn");
// let sumbit = document.querySelector(".submitBtn");
// let input = document.querySelector("#input");
let resetBtn = document.querySelector(".resetBtn");
let gameState = "prep"; //prep , ingame , end
function startGame() {
  currTurn = player1;
  resetDom();
  player2.gameboard.placeRandomShip();
  turnAlternate();
  windowTexts();
  gameState = "ingame";
}

if (player2.type == "human") {
  firstGrid.addEventListener("click", (e) => {
    if (gameState == "ingame") {
      if (e.target.textContent == "×" || e.target.textContent == "○") {
        return;
      }
      if (currTurn == player2) {
        let coords = e.target.id;
        let split = coords.split("");
        player1.gameboard.receiveAttack(split[1], split[2]);
        e.target.textContent = "×";

        let lost = player1.gameboard.allSunk();
        showHits(player1, e);

        if (lost) {
          gameState = "end";
          declarewinner(player2);
          endGame();
          return;
        }
        turnAlternate();
      } else return;
    }
  });
}

secondGrid.addEventListener("click", (e) => {
  if (gameState == "ingame") {
    if (e.target.textContent == "×" || e.target.textContent == "○") {
      return;
    }
    if (currTurn == player1) {
      let coords = e.target.id;
      let split = coords.split("");
      player2.gameboard.receiveAttack(split[1], split[2]);
      e.target.textContent = "×";

      showHits(player2, e);

      let lost = player2.gameboard.allSunk();
      if (lost) {
        gameState = "end";
        declarewinner(player1);
        endGame();
        return;
      }
      turnAlternate();
    } else return;
  }
});

startBtn.addEventListener("click", () => {
  if (player1.gameboard.shipCount() < 14) {
    alert("place some ships");
  } else {
    startGame();
  }
});

let firstWindow = document.querySelector("#firstWin");
let secondWindow = document.querySelector("#secondWin");
function turnAlternate() {
  if (player2.type == "human") {
    if (currTurn == player1) {
      currTurn = player2;
      secondWindow.classList.add("active");
      firstWindow.classList.remove("active");
    } else {
      currTurn = player1;
      firstWindow.classList.add("active");
      secondWindow.classList.remove("active");
    }
  } else {
    compShoots();
    currTurn = player1;
  }
}

function declarewinner(player) {
  let winnerDiv = document.createElement("div");
  winnerDiv.textContent = `${player.name} is the winner`;
  winnerDiv.classList.add("winner");
  content.appendChild(winnerDiv);
}
function windowTexts() {
  firstWindow.textContent = `${player1.name}`;
  secondWindow.textContent = `${player2.name}`;
}

function endGame() {
  gameState = "end";
  currTurn = undefined;
  player1.gameboard.resetBoard();
  player2.gameboard.resetBoard();
}

randomBtn.addEventListener("click", () => {
  for (let i = 0; i < ships.length; i++) {
    ships[i].remove();
  }
  if (gameState == "prep") {
    player1.gameboard.placeRandomShip();
    showShips(player1, firstGrid);
  }
});

// sumbit.addEventListener("click", (e) => {
//   if (gameState == "prep") {
//     e.preventDefault();
//     if (player1.gameboard.shipCount() >= 14) {
//       return;
//     } else {
//       let value = input.value;
//       let split = value.split(",");
//       if (split[2] > 5 || split[2] < 2) {
//         return;
//       }

//       player1.gameboard.placeShip(
//         parseInt(split[0]),
//         parseInt(split[1]),
//         new Ship(parseInt(split[2])),
//         "horizontal"
//       );
//       showShips(player1);
//     }
//   }
// });

resetBtn.addEventListener("click", () => {
  player1.gameboard.resetBoard();
  player2.gameboard.resetBoard();
  resetDom();
  gameState = "prep";
});

function compShoots() {
  let lost = player1.gameboard.allSunk();
  if (lost) {
    gameState = "end";
    declarewinner(player2);
    endGame();
    return;
  }
  let compx = Math.floor(Math.random() * 10);
  let compy = Math.floor(Math.random() * 10);
  let square = firstGrid.querySelector(`#c${compx}${compy}`);
  if (square.textContent != "×") {
    //changed if statement fixed bug with computer taking less shots
    player1.gameboard.receiveAttack(compx, compy);
    square.textContent = "×";
  } else {
    compShoots();
  }
}

windowTexts();

let firstGridCells = firstGrid.querySelectorAll(".cell");
let modeBtn = document.querySelector(".modeBtn");
let secondGridCells = secondGrid.querySelectorAll(".cell");
let wrapper = document.querySelector(".wrapper");
let beingDragged;
let currMode = "horizontal";
modeBtn.addEventListener("click", () => {
  changeMode();
  swtichShips(wrapper);
});
function changeMode() {
  if (currMode == "horizontal") {
    currMode = "vertical";
  } else {
    currMode = "horizontal";
  }
}
function swtichShips(wrapper) {
  let nodes = wrapper.children;
  for (let i = 0; i < nodes.length; i++) {
    let width = nodes[i].offsetWidth;
    let height = nodes[i].offsetHeight;
    let newWidth = height;
    let newHeight = width;
    nodes[i].style.width = `${newWidth}px`;
    nodes[i].style.height = `${newHeight}px`;
    if (currMode == "horizontal") {
      wrapper.classList.remove("vertical");
      wrapper.classList.add("horizontal");
    } else {
      wrapper.classList.remove("horizontal");
      wrapper.classList.add("vertical");
    }
  }
}

let resetShips = document.querySelector(".resetShipsBtn");

let currPrepTurn = player1;

resetShips.addEventListener("click", () => {
  if (currPrepTurn == undefined) {
    return;
  }
  currPrepTurn.gameboard.resetBoard();
  if (currPrepTurn == player1) {
    showShips(currPrepTurn, firstGrid);
  }
  if (currPrepTurn == player2) {
    showShips(currPrepTurn, secondGrid);
  }

  while (wrapper.firstElementChild) {
    wrapper.removeChild(wrapper.firstElementChild);
  }
  const carrier = createShip(5, "carrier");
  const battleship = createShip(4, "battleship");
  const destroyer = createShip(3, "destroyer");
  const patrol = createShip(2, "patrol");

  wrapper.appendChild(carrier);
  wrapper.appendChild(battleship);
  wrapper.appendChild(destroyer);
  wrapper.appendChild(patrol);
  let ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      beingDragged = e.target;
    });
  });
});
let ships = document.querySelectorAll(".ship");

ships.forEach((ship) => {
  ship.addEventListener("dragstart", (e) => {
    beingDragged = e.target;
  });
});

if (player2.type == "human") {
  firstGridCells.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", dragDrop);
    cell.addEventListener("dragleave", dragLeave);
  });
  secondGridCells.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", dragDrop);
    cell.addEventListener("dragleave", dragLeave);
  });
} else if ((player2.type = "computer")) {
  firstGridCells.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", dragDrop);
    cell.addEventListener("dragleave", dragLeave);
  });
}

function dragLeave(e) {
  if (currPrepTurn == player1) {
    if (e.target.classList[1] != "first") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }
    }
  } else if (currPrepTurn == player2) {
    if (e.target.classList[1] != "second") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }
    }
  }
}

function dragOver(e) {
  e.preventDefault();
  if (currPrepTurn == player1) {
    if (e.target.classList[1] != "first") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.add("highlight");
      }
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.add("highlight");
      }
    }
  } else if (currPrepTurn == player2) {
    if (e.target.classList[1] != "second") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.add("highlight");
      }
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.add("highlight");
      }
    }
  }
}

function dragDrop(e) {
  if (currPrepTurn == player1) {
    if (e.target.classList[1] != "first") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }

      let ship = new Ship(parseInt(beingDragged.id)); // this was a headache forgot to parse it
      let x = parseInt(split[1]);
      let y = parseInt(split[2]);
      let status = currPrepTurn.gameboard.placeShip(x, y, ship, "horizontal");
      if (status) {
        beingDragged.remove();
      }
      showShips(currPrepTurn, firstGrid);
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = firstGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }

      let ship = new Ship(parseInt(beingDragged.id)); // this was a headache forgot to parse it
      let x = parseInt(split[1]);
      let y = parseInt(split[2]);
      let status = currPrepTurn.gameboard.placeShip(x, y, ship, "vertical");
      if (status) {
        beingDragged.remove();
      }
      showShips(currPrepTurn, firstGrid);
    }
    console.log(currPrepTurn.gameboard.board);
  } else if (currPrepTurn == player2) {
    if (e.target.classList[1] != "second") {
      return;
    }
    if (currMode == "horizontal") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1])}${parseInt(split[2]) + i}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }

      let ship = new Ship(parseInt(beingDragged.id)); // this was a headache forgot to parse it
      let x = parseInt(split[1]);
      let y = parseInt(split[2]);
      let status = currPrepTurn.gameboard.placeShip(x, y, ship, "horizontal");
      if (status) {
        beingDragged.remove();
      }
      showShips(currPrepTurn, secondGrid);
    } else if (currMode == "vertical") {
      let coords = e.target.id;
      let split = coords.split("");
      for (let i = 0; i < beingDragged.id; i++) {
        let square = secondGrid.querySelector(
          `#c${parseInt(split[1]) + i}${parseInt(split[2])}`
        );
        if (square == null) {
          return;
        }
        square.classList.remove("highlight");
      }

      let ship = new Ship(parseInt(beingDragged.id)); // this was a headache forgot to parse it
      let x = parseInt(split[1]);
      let y = parseInt(split[2]);
      let status = currPrepTurn.gameboard.placeShip(x, y, ship, "vertical");
      if (status) {
        beingDragged.remove();
      }
      showShips(currPrepTurn, secondGrid);
    }
    console.log(currPrepTurn.gameboard.board);
  }
}

let confirmShips = document.querySelector(".confirmShips");

confirmShips.addEventListener("click", () => {
  if (currPrepTurn == player1) {
    if (currPrepTurn.gameboard.shipCount() < 14) {
      alert("place more ships");
    } else {
      currPrepTurn = player2;

      while (wrapper.firstElementChild) {
        wrapper.removeChild(wrapper.firstElementChild);
      }
      const carrier = createShip(5, "carrier");
      const battleship = createShip(4, "battleship");
      const destroyer = createShip(3, "destroyer");
      const patrol = createShip(2, "patrol");

      wrapper.appendChild(carrier);
      wrapper.appendChild(battleship);
      wrapper.appendChild(destroyer);
      wrapper.appendChild(patrol);
      let ships = document.querySelectorAll(".ship");

      ships.forEach((ship) => {
        ship.addEventListener("dragstart", (e) => {
          beingDragged = e.target;
        });
      });
      currMode = "horizontal";
      wrapper.classList.remove("vertical");
      wrapper.classList.add("horizontal");
    }
  } else if (currPrepTurn == player2) {
    if (currPrepTurn.gameboard.shipCount() < 14) {
      alert("place more ships");
    } else {
      currPrepTurn = undefined;
    }
  }
});
