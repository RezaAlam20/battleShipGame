import { Ship } from "./ship";

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
}

let testBoard = new Gameboard();

export { testBoard };
