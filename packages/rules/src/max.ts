export default (max: number) => (val: string, field: string) =>
  parseFloat(val) > max ? `The ${field} must not be greater than ${max}` : true;
