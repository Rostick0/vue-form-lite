import { Ref, ToRefs } from "vue";

export type typeRuleItem = {
  [key in keyof any]: Function;
};

export interface IMyForm<T> {
  state: T | Ref<T> | ToRefs<T>;
  rules?: {
    [key in keyof T]?: typeRuleItem;
  };
  debounceMs?: number;
}

export type TypeErrors = Record<string, Function>;

export interface IValid {
  touched: boolean;
}
