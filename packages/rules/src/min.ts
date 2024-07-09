export default (min: number) => (val: string, field: string) =>
  parseFloat(val) < min ? `The ${field} must be at least ${min}` : true;
