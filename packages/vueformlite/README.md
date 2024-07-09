This library is for vue3

**Example init script**

```sh
import formLite from "vue-form-lite";

// example interface
interface IPost {
  title: string | null;
  description: string | null;
}

// ref from vue
const state = ref<IPost>({
  title: null,
  description: null,
});

// init form
const { handleSubmit } = formLite({
  state,
});

// handle for getting validated values
const onSubmit = handleSubmit(async (val: IPost) => {
  // values in form
  console.log(val);
});
```

**Form template**

```sh
<form class="todo-mutation" @submit="onSubmit" method="post">
    <input v-model="state.title" />
    <input v-model="state.description" />
    <button class="todo-mutation__btn">Send</button>
</form>
```

**Errors validate**

```sh
const state = ref<IPost>({
  title: null,
  description: null,
});

const {
  errors,
  setError,
  setErrors,
  clearError,
  clearErrors,
} = formLite({
  state,
});

// Set error for one field
setError("title", "This field has an error");
// for multiple fields or all
setErrors({
  description: "Incorrect description",
});

// clear error for one field
clearError("title");
// clear all errors
clearErrors();
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
