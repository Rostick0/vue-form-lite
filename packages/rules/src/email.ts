import { interpolate, ruleMessages } from "./config";

export default (val: string, field: string) =>
  val?.match(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  )
    ? true
    : interpolate(ruleMessages.email, { field });
