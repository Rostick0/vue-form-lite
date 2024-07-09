import { expect, test } from "@jest/globals";
import maxLength from "../../packages/rules/src/maxLength";

const field = "price";
const val = 10;
const message = `The ${field} must not be greater than ${val} characters`;

test("maxLength test", () => {
  expect(maxLength(val)("", field)).toBe(true);
  expect(maxLength(val)(" small        ", field)).toBe(true);
  expect(maxLength(val)("aaa", field)).toBe(true);
  expect(maxLength(val)("loremlorem", field)).toBe(true);

  expect(maxLength(val)("lorem lorem", field)).toBe(message);
});
