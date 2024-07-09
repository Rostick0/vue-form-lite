import { Ref, ToRefs } from "vue";

export type typeRuleItem = {
  [key in string]: Function;
};

export interface IMyForm<T> {
  state: T | Ref<T> | ToRefs<T>;
  rules?: {
    [key in keyof T]?: typeRuleItem;
  };
  debounceMs?: number;
}

export type TypeErrors = {
  [key in string]?: string;
};

export interface IValid {
  touched: boolean;
}
