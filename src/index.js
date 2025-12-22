import { dom } from "./dom.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

dom();

let player1 = new Player("human", "player1");
let player2 = new Player("human", "player2");

player1.gameboard.placeShip(0, 0, new Ship(1), "horizontal");

player2.gameboard.placeShip(1, 3, new Ship(3), "horizontal");

player2.gameboard.placeShip(3, 6, new Ship(3), "horizontal");
console.log(player1.gameboard);

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");
let currTurn = player2;
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

function turnAlternate() {
  if (currTurn == player1) {
    currTurn = player2;
  } else {
    currTurn = player1;
  }
}

function declarewinner(player) {
  console.log(`${player.name} is the winner`);
}
