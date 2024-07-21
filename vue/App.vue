<template>
  <pre>
    {{ $valid }}
  </pre>
  <form class="todo-mutation" @submit="onSubmit" method="post">
    <input v-model="state.title" />
    <input v-model="state.description" />
    <input @change="(e) => (state.img = onChangeFile(e))" type="file" />
    <button class="todo-mutation__btn">Send</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// import formLite from "../packages/vueformlite";
import formLite from "../packages/vueformlite";
import { between, minLength, min, required, image } from "../packages/rules";
import { setRuleMesaage } from "../packages/rules/dist/config";

// setRuleMesaage("required", "{field} is required");
// console.log(ruleMessages["required"] = 'Поле важно');

interface IPost {
  title?: string | null;
  description: string | null;
  img?: any;
}

//file();

const onChangeFile = (e: Event) => {
  console.log(e.target?.files);
  return (e.target as HTMLInputElement).files;
};

const state = ref<IPost>({
  title: undefined,
  description: null,
  img: null,
});

// watch(() => state.value.img, (newV: any) => {
//   console.log(newV);
// });

// const aboba = (a: any) => {
//   return (val: any) => (val ? true : "Абоба");
// };

// const requiredCUstom = (val: any) => !val;

const checkSuper = (val: any) => (val === "super" ? true : "It's not super");

const { handleSubmit, errors, $valid } = formLite({
  state,
  rules: {
    title: {
      // custom rule
      checkSuper,
      // Some functions require arguments to be specified
      minLength: minLength(4),
      required,
    },
    img: {
      image: image,
    },
  },
});

const onSubmit = handleSubmit(async (val: IPost) => {
  console.log(val);
});
</script>
