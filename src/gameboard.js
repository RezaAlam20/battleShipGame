import { Ship } from "./ship";

class Gameboard {
  constructor() {
    this.size = 10;
    this.board = [[], [], [], [], [], [], [], [], [], []];
  }
  placeShip(x, y, ship) {
    if (this.board[x][y] == undefined) {
      this.board[x][y] = ship;
      return true;
    }
    return false;
  }
  receiveAttack(x, y) {
    if (this.board[x][y] != undefined) {
      return true;
    }
    return false;
  }
}

let testBoard = new Gameboard();

export { testBoard };
