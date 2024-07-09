export const isEmpty = (obj: object) =>
  Object.keys(obj).length > 0 ? false : true;

export const isObject = (x: any) =>
  typeof x === "object" && !Array.isArray(x) && x !== null;
