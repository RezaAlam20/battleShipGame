import { Gameboard } from "./gameboard.js";

class Player {
  constructor(type, name = "computer") {
    this.type = type;
    this.gameboard = new Gameboard();
    this.name = name;
  }
}

export { Player };
