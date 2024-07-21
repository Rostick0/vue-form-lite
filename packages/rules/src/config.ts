export const interpolate = (template: string, values: Record<string, any>) =>
  template.replace(/(\d:)?{([^}]+)}/g, function (_, param, placeholder) {
    if (!param || !values.params) {
      return placeholder in values
        ? values[placeholder]
        : values.params && placeholder in values.params
        ? values.params[placeholder]
        : `{${placeholder}}`;
    }
    // Handles extended object params format
    if (!Array.isArray(values.params)) {
      return placeholder in values.params
        ? values.params[placeholder]
        : `{${placeholder}}`;
    }
    // Extended Params exit in the format of `paramIndex:{paramName}` where the index is optional
    const paramIndex = Number(param.replace(":", ""));
    return paramIndex in values.params
      ? values.params[paramIndex]
      : `${param}{${placeholder}}`;
  });

export const ruleMessages: Record<string, string> = {
  required: "The {field} field is required",
  min: "The {field} must be at least {min}",
  max: "The {field} must not be greater than {max}",
  between: "The {field} must be between {min} and {max}",
  minLength: "The {field} must be at least {min} characters",
  maxLength: "The {field} must not be greater than {max} characters",
  email: "The {field} must be a valid email address",
  contains: "The selected {field} is invalid",
  mimes: "The {field} must be a file of {minesString} - '{fileName}'",
  numeric: "The {field} must be a number",
};

// export const setRuleMesaage = (rule: string, message: string)
