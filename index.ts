import { ref, watch, computed } from "vue";
import { IMyForm, IValid, TypeErrors } from "./types";

const debounce = (fn: Function, ms = 200) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const isEmpty = (obj: object) => {
  if (Object.keys(obj).length > 0) {
    return false;
  }

  return true;
};

export default <T extends { [key in keyof any]: any }>({
  state,
  rules,
  debounceMs,
}: IMyForm<T>) => {
  const valid = ref<IValid>({
    touched: false,
  });

  const errors = ref<TypeErrors>({});

  const handleSubmit = (
    successFunction: Function,
    errorFunction?: Function
  ) => {
    return async (e: Event): Promise<void> => {
      e.preventDefault();

      if (isEmpty(state.value)) {
        successFunction(state.value);
        return;
      }

      errorFunction?.(state.value, errors);
    };
  };

  const $valid = computed(() => ({
    valid,
    errors: errors.value,
  }));

  for (const stateItem of Object.keys(state.value)) {
    const a = watch(
      () => state.value[stateItem],
      debounce((newV: any) => {
        if (rules?.[stateItem] && !isEmpty(rules?.[stateItem] as object)) {
          if (errors.value?.[stateItem]) {
            delete errors.value[stateItem];
          }

          for (const rule of Object.keys(rules[stateItem] as object)) {
            if (errors.value?.[state.value[stateItem]]) return;

            const ruleFunct = rules[stateItem]?.[rule](newV);
            if (ruleFunct !== true) errors.value[stateItem] = ruleFunct;
          }
        }
      }, debounceMs)
    );
  }

  return {
    $valid,
    errors,
    handleSubmit,
  };
};
