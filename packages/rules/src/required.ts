import { isEmpty, isObject } from "./utils";

export default (val: any) => {
  let empty = false;

  if (isObject(val)) {
    if (isEmpty(val)) empty = true;
  } else if (Array.isArray(val)) {
    if (val?.length === 0) empty = true;
  } else if ([undefined, null, ""].find((el) => val === el) !== undefined) {
    empty = true;
  }

  return empty ? "" : false;
};
