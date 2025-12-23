import { Ship } from "./ship.js";

class Gameboard {
  constructor() {
    this.size = 10;
    this.board = [[], [], [], [], [], [], [], [], [], []];
  }
  placeShip(x, y, ship, mode = "horizontal") {
    if (mode == "horizontal") {
      let available = true;
      if (y + ship.length > 9) {
        return false;
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] != undefined) {
          available = false;
          break;
        }
      }
      if (available) {
        for (let i = 0; i < ship.length; i++) {
          this.board[x][y + i] = ship;
        }
        return true;
      }
    } else if (mode == "vertical") {
      let available = true;
      if (x + ship.length > 9) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] != undefined) {
          available = false;
          break;
        }
      }
      if (available) {
        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y] = ship;
        }
        return true;
      }
    }

    return false;
  }
  receiveAttack(x, y) {
    if (this.board[x][y] != undefined) {
      this.board[x][y].hit();
      return true;
    } else {
      this.board[x][y] = null;
      return false;
    }
  }
  showShip(x, y) {
    return this.board[x][y];
  }
  allSunk() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] == undefined || this.board[i][j] == null) {
          continue;
        } else {
          let state = this.board[i][j].isSunk();
          if (state) {
            continue;
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }
  resetBoard() {
    this.board = [[], [], [], [], [], [], [], [], [], []];
  }
  placeRandomShip() {
    this.resetBoard();
    let ship5 = new Ship(5);
    let ship4 = new Ship(4);
    let ship3 = new Ship(3);
    let ship2 = new Ship(2);
    let arr = [ship5, ship4, ship3, ship2];
    function calculatePos() {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let position = Math.floor(Math.random() * 2);
      if (position == 0) {
        position = "horizontal";
      } else {
        position = "vertical";
      }
      return [x, y, position];
    }
    for (let i = 0; i < arr.length; i++) {
      let pos = calculatePos();
      while (this.placeShip(pos[0], pos[1], arr[i], pos[2]) == false) {
        pos = calculatePos();
      }
    }
  }

  shipCount() {
    let sum = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] != undefined || this.board[i][j] != null) {
          sum++;
        }
      }
    }
    return sum;
  }
}

let testBoard = new Gameboard();

export { testBoard };
export { Gameboard };
