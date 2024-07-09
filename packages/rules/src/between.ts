export default (min: number, max: number) => (val: string, field: string) =>
  parseFloat(val) <= max && parseFloat(val) >= min
    ? true
    : `The ${field} must be between ${min} and ${max}`;
