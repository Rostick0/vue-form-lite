<template>
  <form class="todo-mutation" @submit="onSubmit" method="post">
    <input v-model="state.title" />
    <input v-model="state.description" />
    <button class="todo-mutation__btn">Send</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import formLite from "../packages/vueformlite/src";

interface IPost {
  title: string | null;
  description: string | null;
}

const state = ref<IPost>({
  title: null,
  description: null,
});

const aboba = (a: any) => {
  return (val: any) => (val ? true : "Абоба");
};

const { handleSubmit } = formLite({
  state,
});

const onSubmit = handleSubmit(async (val: IPost) => {
  console.log(val);
});
</script>
