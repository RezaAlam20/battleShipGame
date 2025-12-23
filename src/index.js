import { dom } from "./dom.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { resetDom } from "./dom.js";

dom();

let player1 = new Player("human", "player1");
let player2 = new Player("human", "player2");

function placetestShips() {
  player1.gameboard.placeShip(0, 0, new Ship(1), "horizontal");

  player2.gameboard.placeShip(0, 0, new Ship(1), "horizontal");
}
placetestShips();

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let currTurn = undefined;
let startBtn = document.querySelector(".startBtn");
let content = document.querySelector(".content");
function startGame() {
  currTurn = player1;
  resetDom();
  player1.gameboard.resetBoard();
  player2.gameboard.resetBoard();
  placetestShips();
}

firstGrid.addEventListener("click", (e) => {
  if (currTurn == player2) {
    let coords = e.target.id;
    let split = coords.split("");
    player1.gameboard.receiveAttack(split[0], split[1]);
    console.log(player1.gameboard.showShip(split[0], split[1]));
    e.target.textContent = "×";
    turnAlternate();
    let lost = player1.gameboard.allSunk();
    if (lost) {
      declarewinner(player2);
    }
  } else return;
});

secondGrid.addEventListener("click", (e) => {
  if (currTurn == player1) {
    let coords = e.target.id;
    let split = coords.split("");
    player2.gameboard.receiveAttack(split[0], split[1]);
    console.log(player2.gameboard.showShip(split[0], split[1]));
    e.target.textContent = "×";
    turnAlternate();
    let lost = player2.gameboard.allSunk();
    if (lost) {
      declarewinner(player1);
    }
  } else return;
});

startBtn.addEventListener("click", () => {
  startGame();
});

function turnAlternate() {
  if (currTurn == player1) {
    currTurn = player2;
  } else {
    currTurn = player1;
  }
}

function declarewinner(player) {
  let winnerDiv = document.createElement("div");
  winnerDiv.textContent = `${player.name} is the winner`;
  winnerDiv.classList.add("winner");
  content.appendChild(winnerDiv);

  currTurn = undefined;
}
