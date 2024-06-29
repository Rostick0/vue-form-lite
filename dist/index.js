import { ref, watch, computed } from "vue";
import { isEmpty, debounce } from "./utils";
export default ({ state, rules, debounceMs }) => {
  const valid = ref({
    touched: false,
  });
  const errors = ref({});
  const setError = (field, err) => {
    errors.value[field] = err;
  };
  const setErrors = (errs) => {
    errors.value = {
      ...errors.value,
      ...errs,
    };
  };
  const clearError = (field) => {
    var _a;
    const fieldType = field;
    if (
      (_a = errors.value) === null || _a === void 0 ? void 0 : _a[fieldType]
    ) {
      delete errors.value[fieldType];
    }
  };
  const clearErrors = () => {
    errors.value = {};
  };
  const handleSubmit = (successFunction, errorFunction) => {
    return async (e) => {
      e.preventDefault();
      if (isEmpty(errors.value)) {
        successFunction(state.value);
        return;
      }
      errorFunction === null || errorFunction === void 0
        ? void 0
        : errorFunction(state.value, errors);
    };
  };
  const $valid = computed(() => ({
    ...valid.value,
    errors: errors.value,
  }));
  for (const stateItem of Object.keys(state.value)) {
    const a = watch(
      () => state.value[stateItem],
      debounce((newV) => {
        var _a, _b, _c;
        if (
          (rules === null || rules === void 0 ? void 0 : rules[stateItem]) &&
          !isEmpty(
            rules === null || rules === void 0 ? void 0 : rules[stateItem]
          )
        ) {
          if (
            (_a = errors.value) === null || _a === void 0
              ? void 0
              : _a[stateItem]
          ) {
            delete errors.value[stateItem];
          }
          for (const rule of Object.keys(rules[stateItem])) {
            if (
              (_b = errors.value) === null || _b === void 0
                ? void 0
                : _b[state.value[stateItem]]
            )
              return;
            const ruleFunct =
              (_c = rules[stateItem]) === null || _c === void 0
                ? void 0
                : _c[rule](newV);
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
