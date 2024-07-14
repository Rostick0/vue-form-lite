import { expect, test } from "@jest/globals";
import max from "../src/max";

const field = "price";
const val = 1;
const message = `The ${field} must not be greater than ${val}`;

test("max test", () => {
  expect(max(val)("-5", field)).toBe(true);
  expect(max(val)("1", field)).toBe(true);
  expect(max(val)("0", field)).toBe(true);
  expect(max(val)("", field)).toBe(true);

  expect(max(val)("3", field)).toBe(message);
});
