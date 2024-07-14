import { expect, test } from "@jest/globals";
import email from "../src/email";

const field = "field";
const message = `The ${field} must be a valid email address`;

test("email test", () => {
  expect(email("email@gmail.com", field)).toBe(true);
  expect(email("email123@gmail.com", field)).toBe(true);
  expect(email("email_123@gmail.com", field)).toBe(true);
  expect(email("email_123!@gmail.com", field)).toBe(true);

  expect(email("email.@gmail.com", field)).toBe(message);
  expect(email("email@gmail", field)).toBe(message);
});
