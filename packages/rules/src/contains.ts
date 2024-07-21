import { interpolate, ruleMessages } from "./config";

export default (...args: Array<string>) =>
  (val: string, field: string) =>
    args?.findIndex((i) => i === val) !== -1
      ? true
      : interpolate(ruleMessages.contains, { field });
