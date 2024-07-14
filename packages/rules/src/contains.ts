export default (...args: Array<string>) =>
  (val: string, field: string) =>
    args?.findIndex((i) => i === val) !== -1
      ? true
      : `The selected ${field} is invalid`;
