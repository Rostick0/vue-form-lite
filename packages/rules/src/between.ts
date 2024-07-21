import { interpolate, ruleMessages } from "./config";

export default (min: number, max: number) => (val: string, field: string) =>
  parseFloat(val) <= max && parseFloat(val) >= min
    ? true
    : interpolate(ruleMessages.between, { field, min, max });
