export default (min: number) => (val: string, field: string) =>
  val?.trim()?.length < min
    ? `The ${field} must be at least ${min} characters`
    : true;
