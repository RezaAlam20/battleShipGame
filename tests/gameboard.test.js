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
  testBoard.placeShip(1, 6, new Ship(5));
  expect(testBoard.receiveAttack(1, 6)).toBe(true);
  expect(testBoard.receiveAttack(10, 2)).toBe(false);
});
