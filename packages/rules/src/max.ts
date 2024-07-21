import { interpolate, ruleMessages } from "./config";

export default (max: number) => (val: string, field: string) =>
  parseFloat(val) > max ? interpolate(ruleMessages.max, { field, max }) : true;
