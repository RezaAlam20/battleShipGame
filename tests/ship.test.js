import { testShip } from "../src/ship";

test("checking hit", () => {
  testShip.hit();
  expect(testShip.hitcount).toBe(1);
});

test("sunk check ", () => {
  expect(testShip.isSunk()).toBe(false);
});

test("sunk check ", () => {
  testShip.hit();
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
