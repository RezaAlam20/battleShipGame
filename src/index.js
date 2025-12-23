import { dom, showHits } from "./dom.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { resetDom } from "./dom.js";
import { showShips } from "./dom.js";
dom();

let player1 = new Player("human", "player1");
let player2 = new Player("human", "Computer");

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let currTurn = undefined;
let startBtn = document.querySelector(".startBtn");
let content = document.querySelector(".content");
let randomBtn = document.querySelector(".randomBtn");
let sumbit = document.querySelector(".submitBtn");
let input = document.querySelector("#input");
let resetBtn = document.querySelector(".resetBtn");

let gameState = "prep"; //prep , ingame , end
function startGame() {
  currTurn = player1;
  resetDom();
  player2.gameboard.placeRandomShip();

  turnAlternate();
  windowTexts();
  showShips(player1);
  gameState = "ingame";
}

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
      turnAlternate();
      let lost = player1.gameboard.allSunk();
      showShips(player1);
      showHits(player1, e);

      if (lost) {
        gameState = "end";
        endGame();
        declarewinner(player2);
      }
    } else return;
  }
});

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
      turnAlternate();
      showShips(player1);
      showHits(player2, e);

      let lost = player2.gameboard.allSunk();
      if (lost) {
        gameState = "end";
        endGame();
        declarewinner(player1);
      }
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
  if (currTurn == player1) {
    currTurn = player2;
    secondWindow.classList.add("active");
    firstWindow.classList.remove("active");
  } else {
    currTurn = player1;
    firstWindow.classList.add("active");
    secondWindow.classList.remove("active");
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
  if (gameState == "prep") {
    player1.gameboard.placeRandomShip();
    showShips(player1);
  }
});

sumbit.addEventListener("click", (e) => {
  if (gameState == "prep") {
    e.preventDefault();
    if (player1.gameboard.shipCount() >= 14) {
      return;
    } else {
      let value = input.value;
      let split = value.split(",");

      player1.gameboard.placeShip(
        parseInt(split[0]),
        parseInt(split[1]),
        new Ship(parseInt(split[2])),
        "horizontal"
      );
      showShips(player1);
    }
  }
});

resetBtn.addEventListener("click", () => {
  player1.gameboard.resetBoard();
  player2.gameboard.resetBoard();
  resetDom();
  gameState = "prep";
});

function comp() {
  let lost = player1.gameboard.allSunk();
  if (lost) {
    gameState = "end";
    endGame();
    declarewinner(player2);
    return;
  }
  let compx = Math.floor(Math.random() * 10);
  let compy = Math.floor(Math.random() * 10);
  let square = document.querySelector(`#c${compx}${compy}`);
  if (square.textContent != "×" || square.textContent != "○") {
    player1.gameboard.receiveAttack(compx, compy);
    square.textContent = "×";
  } else {
    comp();
  }
}

windowTexts();
