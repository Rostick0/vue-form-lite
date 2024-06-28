This lib for vue3

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

const { handleSubmit } = formLite({
  state,
});

// handle for get values
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
