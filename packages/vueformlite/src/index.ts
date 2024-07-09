import { ref, watch, computed } from "vue";
import type { IMyForm, IValid, TypeErrors } from "./types";
import { isEmpty, debounce } from "./utils";

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
      ...errors.value,
      ...errs,
    };
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

  const validValues = (stateItem: string, value: string) => {
    if (errors.value?.[stateItem] !== undefined) {
      delete errors.value[stateItem];
    }

    if (rules?.[stateItem] && !isEmpty(rules?.[stateItem] as object)) {
      for (const rule of Object.keys(rules[stateItem] as object)) {
        if (errors.value?.[state.value[stateItem]]) return;

        const ruleFunct = rules[stateItem]?.[rule](value, stateItem);

        if (ruleFunct !== true) {
          errors.value[stateItem] =
            typeof ruleFunct === "string"
              ? ruleFunct
              : `The field ${stateItem} is invalid`;
        }
      }
    }
  };

  const handleSubmit = (
    successFunction: Function,
    errorFunction?: Function
  ) => {
    return (e: Event): void => {
      e.preventDefault();

      for (const stateItem of Object.keys(state.value)) {
        validValues(stateItem, state.value[stateItem]);
      }

      if (isEmpty(errors.value)) {
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
    watch(
      () => state.value[stateItem],
      debounce(function (newV: any) {
        if (valid.value.touched === false) valid.value.touched = true;

        validValues(stateItem, newV);
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
