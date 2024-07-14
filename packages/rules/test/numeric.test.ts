import { expect, test } from "@jest/globals";
import numeric from "../src/numeric";

const field = "field";
const message = `The ${field} must be a number`;

test("numeric test", () => {
  expect(numeric("1", field)).toBe(true);
  expect(numeric("1.02", field)).toBe(true);
  expect(numeric(".02", field)).toBe(true);
  expect(numeric("", field)).toBe(true);

  expect(numeric("H2O", field)).toBe(message);
  expect(numeric("NaN", field)).toBe(message);
});
