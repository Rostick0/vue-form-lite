import { expect, test } from "@jest/globals";
import required from "../../packages/rules/src/required";

const field = "field";
const message = `The ${field} field is required`;

test("required test", () => {
  expect(required("1", field)).toBe(true);
  expect(required([1], field)).toBe(true);
  expect(required({ name: null }, field)).toBe(true);

  expect(required(null, field)).toBe(message);
  expect(required(undefined, field)).toBe(message);
  expect(required([], field)).toBe(message);
  expect(required({}, field)).toBe(message);
  expect(required("", field)).toBe(message);
});
