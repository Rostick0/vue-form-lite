export const debounce = (fn, ms = 200) => {
  let timeoutId;
  return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
export const isEmpty = (obj) => Object.keys(obj).length > 0 ? false : true;
export const isObject = (x) => typeof x === "object" && !Array.isArray(x) && x !== null;
