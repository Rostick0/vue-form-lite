import terser from "@rollup/plugin-terser";
// import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import tsPlugin from "@rollup/plugin-typescript";

function generateOutputConfig(fileName = "index") {
  return {
    mjs: {
      file: `dist/${fileName}.js`,
      format: "es",
    },
    // cjs: {
    //   file: `dist/${fileName}.cjs`,
    //   format: "cjs",
    // },
    global: {
      file: `dist/${fileName}.iife.min.js`,
      format: "iife",
    },
  };
}

function generateConfigFactory({
  libraryName = "vue-form-lite",
  input = "src/index.ts",
  outputConfigs,
  copyTypes = false,
}) {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const config = {
    input,
    plugins: [
      // resolve(),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      tsPlugin(),
    ],
    output: [],
  };

  /**
   * Create config output
   * @param {string} name
   * @param {import('rollup').OutputOptions} options
   * @return {*}
   */
  function createConfig(name, options) {
    const opts = { ...options };
    opts.exports = "named";
    opts.globals = {
      ...opts.globals,
    };

    const isGlobalBuild = name === "global";
    const isMinified = opts.file.includes(".min.");

    if (isGlobalBuild) opts.name = libraryName = "vue-form-lite";
    opts.plugins = [];
    if (isMinified) {
      opts.plugins.push(terser());
    }
    if (copyTypes) {
      opts.plugins.push(
        copy({
          hook: "writeBundle",
          flatten: true,
          targets: [
            {
              src: "types.d.ts",
              dest: "dist",
              rename: "types.d.cts",
            },
            {
              src: "types.d.ts",
              dest: "dist",
              rename: "types.d.mts",
            },
          ],
        })
      );
    }

    opts.extend = true;
    return opts;
  }

  const packageBuilds = Object.keys(outputConfigs);
  config.output = packageBuilds.map((buildName) =>
    createConfig(buildName, outputConfigs[buildName])
  );
  // config.output.extend = true;

  return config;
}

export default generateConfigFactory({
  libraryName: "vue-form-lite",
  outputConfigs: generateOutputConfig(),
  copyTypes: true,
});
