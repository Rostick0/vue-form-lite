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

