import { dom } from "./dom.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

dom();

let player1 = new Player("human");
let player2 = new Player("human");

player1.gameboard.placeShip(1, 3, new Ship(3), "horizontal");

player1.gameboard.placeShip(3, 6, new Ship(3), "horizontal");
player2.gameboard.placeShip(1, 3, new Ship(3), "horizontal");

player2.gameboard.placeShip(3, 6, new Ship(3), "horizontal");
console.log(player1.gameboard);

let firstGrid = document.querySelector(".firstGrid");
let secondGrid = document.querySelector(".secondGrid");

firstGrid.addEventListener("click", (e) => {
  let coords = e.target.id;
  let split = coords.split("");
  player1.gameboard.receiveAttack(split[0], split[1]);
  console.log(player1.gameboard.showShip(split[0], split[1]));
});
