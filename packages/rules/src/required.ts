import { interpolate, ruleMessages } from "./config";

export default (val: any, field: string) => {
  let state = true;

  if (typeof val === "string") {
    state = val.trim() !== "";
  } else if (Array.isArray(val) && val?.length === 0) {
    state = false;
  } else if ([undefined, null].findIndex((el) => val === el) !== -1) {
    state = false;
  }

  return state ? true : interpolate(ruleMessages.required, { field });
};
