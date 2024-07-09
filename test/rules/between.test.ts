import { expect, test } from "@jest/globals";
import between from "../../packages/rules/src/between";

const field = "field";
const min = 1;
const max = 5;
const message = `The ${field} must be between ${min} and ${max}`;

test("between test", () => {
  expect(between(min, max)("1", field)).toBe(true);
  expect(between(min, max)("3", field)).toBe(true);
  expect(between(min, max)("5", field)).toBe(true);

  expect(between(min, max)("0", field)).toBe(message);
  expect(between(min, max)("6", field)).toBe(message);
  expect(between(min, max)("", field)).toBe(message);
});
