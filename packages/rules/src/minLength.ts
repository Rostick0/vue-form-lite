import { interpolate, ruleMessages } from "./config";

export default (min: number) => (val: string, field: string) =>
  val?.trim()?.length < min
    ? interpolate(ruleMessages.minLength, { field, min })
    : true;
