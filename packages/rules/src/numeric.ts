export default (val: string, field: string) =>
  !isNaN(+val) ? true : `The ${field} must be a number`;
