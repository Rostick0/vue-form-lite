<template>
  <pre>
    {{ $valid }}
  </pre>
  <form class="todo-mutation" @submit="onSubmit" method="post">
    <input v-model="state.title" />
    <input v-model="state.description" />
    <button class="todo-mutation__btn">Send</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import formLite from "../packages/vueformlite";
import { between, minLength, min, required } from "../packages/rules/src/index";

interface IPost {
  title?: string | null;
  description: string | null;
}

const state = ref<IPost>({
  title: undefined,
  description: null,
});

// const aboba = (a: any) => {
//   return (val: any) => (val ? true : "Абоба");
// };

// const requiredCUstom = (val: any) => !val;

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

const onSubmit = handleSubmit(async (val: IPost) => {
  console.log(val);
});
</script>
