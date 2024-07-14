import { expect, test } from "@jest/globals";
import contains from "../src/contains";

const field = "field";
const message = `The selected ${field} is invalid`;

test("contains test", () => {
  expect(contains("1", "2", "3")("1", field)).toBe(true);
  expect(contains("1", "4", "")("", field)).toBe(true);

  expect(contains("1")("0", field)).toBe(message);
  expect(contains("1")("", field)).toBe(message);
});
