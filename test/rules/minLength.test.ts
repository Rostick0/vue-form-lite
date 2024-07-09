import { expect, test } from "@jest/globals";
import minLength from "../../packages/rules/src/minLength";

const field = "price";
const val = 10;
const message = `The ${field} must be at least ${val} characters`;

test("minLength test", () => {
  expect(minLength(val)("loremlorem", field)).toBe(true);

  expect(minLength(val)("", field)).toBe(message);
  expect(minLength(val)(" small        ", field)).toBe(message);
  expect(minLength(val)("aaa", field)).toBe(message);
});
