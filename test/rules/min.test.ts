import { expect, test } from "@jest/globals";
import min from "../../packages/rules/src/min";

const field = "price";
const val = 1;
const message = `The ${field} must be at least ${val}`;

test("min test", () => {
  expect(min(val)("1", field)).toBe(true);
  expect(min(val)("", field)).toBe(true);

  expect(min(val)("0", field)).toBe(message);
  expect(min(val)("-5", field)).toBe(message);
});
