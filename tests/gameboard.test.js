import { testBoard } from "../src/gameboard";
import { Ship } from "../src/ship";

test("placeholder", () => {
  expect(1).toBe(1);
});

test("place Ship", () => {
  expect(testBoard.placeShip(5, 4, new Ship(2))).toBe(true);
  expect(testBoard.placeShip(5, 4, new Ship(3))).toBe(false);
});

test("take attacks", () => {
  testBoard.placeShip(1, 6, new Ship(2));
  expect(testBoard.receiveAttack(1, 6)).toBe(true);
  expect(testBoard.receiveAttack(9, 2)).toBe(false);
});
test("ship hit and sink", () => {
  expect(testBoard.showShip(1, 6).hitcount).toBe(1);
  testBoard.receiveAttack(1, 6);
  expect(testBoard.showShip(1, 6).isSunk()).toBe(true);
});

test("track missed", () => {
  testBoard.receiveAttack(9, 9);
  expect(testBoard.showShip(9, 9)).toBe(null);
});

test("check all ships", () => {
  expect(testBoard.allSunk()).toBe(false);
  testBoard.receiveAttack(5, 4);
  testBoard.receiveAttack(5, 4);
  expect(testBoard.allSunk()).toBe(true);
});

test("ship occupied squares", () => {
  expect(testBoard.showShip(1, 6)).toBeTruthy();
  expect(testBoard.showShip(1, 7)).toBeTruthy(); // ships length
  testBoard.placeShip(4, 8, new Ship(3), "vertical");
  expect(testBoard.showShip(5, 8)).toBeTruthy();
  expect(testBoard.showShip(6, 8)).toBeTruthy();
});

test("place ship outside the board", () => {
  testBoard.placeShip(6, 10, new Ship(5));
  expect(testBoard.showShip(6, 10)).toBeFalsy();
});

test("place ships on each other", () => {
  testBoard.placeShip(3, 1, new Ship(3));
  testBoard.placeShip(2, 2, new Ship(4), "vertical");
  expect(testBoard.showShip(4, 2)).toBeFalsy();
});

test("reset ships hitcounts", () => {
  testBoard.resetBoard();
  expect(testBoard.showShip(6, 8)).toBe(undefined);
});
