import { interpolate, ruleMessages } from "./config";

export default (min: number) => (val: string, field: string) =>
  parseFloat(val) < min ? interpolate(ruleMessages.min, { field, min }) : true;
