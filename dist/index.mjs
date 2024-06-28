import { ref, watch, computed } from "vue";
const debounce = (fn, ms = 200) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
const isEmpty = (obj) => {
  if (Object.keys(obj).length > 0) {
    return false;
  }
  return true;
};
export default ({ state, rules, debounceMs }) => {
  const valid = ref({
    touched: false,
  });
  const errors = ref({});
  const handleSubmit = (successFunction, errorFunction) => {
    return async (e) => {
      e.preventDefault();
      if (isEmpty(errors.value)) {
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
      debounce((newV) => {
        if (rules?.[stateItem] && !isEmpty(rules?.[stateItem])) {
          if (errors.value?.[stateItem]) {
            delete errors.value[stateItem];
          }
          for (const rule of Object.keys(rules[stateItem])) {
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