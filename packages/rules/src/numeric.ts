import { interpolate, ruleMessages } from "./config";

export default (val: string, field: string) =>
  !isNaN(+val) ? true : interpolate(ruleMessages.numeric, { field });
