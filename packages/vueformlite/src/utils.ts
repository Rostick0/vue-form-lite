export const debounce = (fn: Function, ms = 200) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const isEmpty = (obj: object) =>
  Object.keys(obj).length > 0 ? false : true;

export const isObject = (x: any) =>
  typeof x === "object" && !Array.isArray(x) && x !== null;

export const withMessage = (message: string) => message;
