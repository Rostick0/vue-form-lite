export default (max: number) => (val: string, field: string) =>
  val?.trim()?.length > max
    ? `The ${field} must not be greater than ${max} characters`
    : true;
