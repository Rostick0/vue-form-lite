const { src, series, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");

function js() {
  return src(["src/*.ts", "src/**/*.ts"])
    .pipe(
      ts({
        noImplicitAny: true,
        target: "es2020",
      })
    )
    .pipe(dest("dist"));

  // .pipe(
  //   babel({
  //     presets: ["@babel/env"],
  //   })
  // )
  // .pipe(uglify());
  // .pipe(dest("app/js/concat/"));
}

exports.build = series(js);
