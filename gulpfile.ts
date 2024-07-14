const { src, series, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");

function vueFormLite() {
  return src(["packages/vueformlite/src/*.ts"])
    .pipe(
      ts({
        noImplicitAny: true,
        target: "es2017",
        declaration: true,
      })
    )
    .pipe(dest("packages/vueformlite/dist"));

  // .pipe(
  //   babel({
  //     presets: ["@babel/env"],
  //   })
  // )
  // .pipe(uglify());
}

function rules() {
  return src(["packages/rules/src/*.ts"])
    .pipe(
      ts({
        noImplicitAny: true,
        target: "es2017",
        declaration: true,
      })
    )
    .pipe(dest("packages/rules/dist"));
}

// vueFormLite
exports.build = series( rules);
