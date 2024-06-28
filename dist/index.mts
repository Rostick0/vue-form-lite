import { ref, watch, computed, type UnwrapRef } from "vue";
import type { IMyForm, IValid, TypeErrors } from "./types";

const debounce = (fn: Function, ms = 200) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const isEmpty = (obj: object) => (Object.keys(obj).length > 0 ? false : true);

export default <T extends { [key in string]: any }>({
  state,
  rules,
  debounceMs,
}: IMyForm<T>) => {
  const valid = ref<IValid>({
    touched: false,
  });

  const errors = ref<TypeErrors>({});

  const setError = (field: keyof T, err: string) => {
    errors.value[field as keyof TypeErrors] = err;
  };

  const setErrors = (errs: TypeErrors) => {
    errors.value = {
      ...(errors.value as object),
      ...errs,
    } as UnwrapRef<TypeErrors>;
  };

  const clearError = (field: keyof T) => {
    const fieldType = field as keyof TypeErrors;

    if (errors.value?.[fieldType]) {
      delete errors.value[fieldType];
    }
  };

  const clearErrors = () => {
    errors.value = {};
  };

  const handleSubmit = (
    successFunction: Function,
    errorFunction?: Function
  ) => {
    return async (e: Event): Promise<void> => {
      e.preventDefault();

      if (isEmpty(errors.value as object)) {
        successFunction(state.value);
        return;
      }

      errorFunction?.(state.value, errors);
    };
  };

  const $valid = computed(() => ({
    ...valid.value,
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
    setError,
    setErrors,
    clearError,
    clearErrors,
    handleSubmit,
  };
};
