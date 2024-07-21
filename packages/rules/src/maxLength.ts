import { interpolate, ruleMessages } from "./config";

export default (max: number) => (val: string, field: string) =>
  val?.trim()?.length > max
    ? interpolate(ruleMessages.maxLength, { field, max })
    : true;
