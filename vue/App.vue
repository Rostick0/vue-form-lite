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
import formLite from "../packages/vueformlite/src";
import required from "../packages/rules/src/required";
import min from "../packages/rules/src/min";
import { between } from "../packages/rules/src";

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

const { handleSubmit, errors, $valid } = formLite({
  state,
  rules: {
    title: {
      required,
      // min: min(20),
      between: between(10, 30)
    },
  },
});

const onSubmit = handleSubmit(async (val: IPost) => {
  console.log(val);
});
</script>
