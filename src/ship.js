class Ship {
  constructor(length) {
    this.length = length;
    this.hitcount = 0;
  }
  hit() {
    this.hitcount++;
  }
  isSunk() {
    if (this.length == this.hitcount) {
      return true;
    } else return false;
  }
}

let testShip = new Ship(5);

export { testShip };
