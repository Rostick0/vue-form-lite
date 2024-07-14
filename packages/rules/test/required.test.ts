import { expect, test } from "@jest/globals";
import required from "../src/required";

const field = "field";
const message = `The ${field} field is required`;

test("required test", () => {
  expect(required("1", field)).toBe(true);
  expect(required([1], field)).toBe(true);
  expect(required({}, field)).toBe(true);
  expect(required(new Date(), field)).toBe(true);

  expect(required(null, field)).toBe(message);
  expect(required(undefined, field)).toBe(message);
  expect(required([], field)).toBe(message);
  expect(required("", field)).toBe(message);
});
