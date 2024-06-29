import { ref, computed, watch } from 'vue';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var debounce = function (fn, ms) {
    if (ms === void 0) { ms = 200; }
    var timeoutId;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { return fn.apply(_this, args); }, ms);
    };
};
var isEmpty = function (obj) {
    return Object.keys(obj).length > 0 ? false : true;
};

var index = (function (_a) {
    var state = _a.state, rules = _a.rules, debounceMs = _a.debounceMs;
    var valid = ref({
        touched: false,
    });
    var errors = ref({});
    var setError = function (field, err) {
        errors.value[field] = err;
    };
    var setErrors = function (errs) {
        errors.value = __assign(__assign({}, errors.value), errs);
    };
    var clearError = function (field) {
        var _a;
        var fieldType = field;
        if ((_a = errors.value) === null || _a === void 0 ? void 0 : _a[fieldType]) {
            delete errors.value[fieldType];
        }
    };
    var clearErrors = function () {
        errors.value = {};
    };
    var handleSubmit = function (successFunction, errorFunction) {
        return function (e) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.preventDefault();
                if (isEmpty(errors.value)) {
                    successFunction(state.value);
                    return [2 /*return*/];
                }
                errorFunction === null || errorFunction === void 0 ? void 0 : errorFunction(state.value, errors);
                return [2 /*return*/];
            });
        }); };
    };
    var $valid = computed(function () { return (__assign(__assign({}, valid.value), { errors: errors.value })); });
    var _loop_1 = function (stateItem) {
        watch(function () { return state.value[stateItem]; }, debounce(function (newV) {
            var _a, _b, _c;
            if ((rules === null || rules === void 0 ? void 0 : rules[stateItem]) && !isEmpty(rules === null || rules === void 0 ? void 0 : rules[stateItem])) {
                if ((_a = errors.value) === null || _a === void 0 ? void 0 : _a[stateItem]) {
                    delete errors.value[stateItem];
                }
                for (var _i = 0, _d = Object.keys(rules[stateItem]); _i < _d.length; _i++) {
                    var rule = _d[_i];
                    if ((_b = errors.value) === null || _b === void 0 ? void 0 : _b[state.value[stateItem]])
                        return;
                    var ruleFunct = (_c = rules[stateItem]) === null || _c === void 0 ? void 0 : _c[rule](newV);
                    if (ruleFunct !== true)
                        errors.value[stateItem] = ruleFunct;
                }
            }
        }, debounceMs));
    };
    for (var _i = 0, _b = Object.keys(state.value); _i < _b.length; _i++) {
        var stateItem = _b[_i];
        _loop_1(stateItem);
    }
    return {
        $valid: $valid,
        errors: errors,
        setError: setError,
        setErrors: setErrors,
        clearError: clearError,
        clearErrors: clearErrors,
        handleSubmit: handleSubmit,
    };
});

export { index as default };
