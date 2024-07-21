**New update - custom messages**

```sh
// Default messages
// {
//     required: "The {field} field is required",
//     min: "The {field} must be at least {min}",
//     max: "The {field} must not be greater than {max}",
//     between: "The {field} must be between {min} and {max}",
//     minLength: "The {field} must be at least {min} characters",
//     maxLength: "The {field} must not be greater than {max} characters",
//     email: "The {field} must be a valid email address",
//     contains: "The selected {field} is invalid",
//     mimes: "The {field} must be a file of {minesString} - '{fileName}'",
//     numeric: "The {field} must be a number",
// }

import { setRuleMesaage } from "../packages/rules/dist/config";
// set custom rule
setRuleMesaage("required", "{field} is required");
```

**Add validate rules**

```sh
import formLite from "vue-form-lite";
// rules library
import { required, minLength } from "@vue-form-lite/rules";

// custom rule
const checkSuper = (val: any) => (val === "super" ? true : "It's not super");

const { handleSubmit, errors, $valid } = formLite({
  state,
  rules: {
    title: {
      required,
      // custom rule
      checkSuper,
      // Some functions require arguments to be specified
      minLength: minLength(4),
    },
  },
});
```
