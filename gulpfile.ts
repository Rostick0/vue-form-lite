const { src, series, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");

function vueFormLite() {
  return src(["packages/vueformlite/src/*.ts"])
    .pipe(
      ts({
        noImplicitAny: true,
        target: "es2020",
      })
    )
    .pipe(dest("packages/vueformlite/dist"));

  // .pipe(
  //   babel({
  //     presets: ["@babel/env"],
  //   })
  // )
  // .pipe(uglify());
  // .pipe(dest("app/js/concat/"));
}

exports.build = series(vueFormLite);
