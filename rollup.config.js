import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import typescript from "rollup-plugin-typescript2";
import path from "path";
import externals from "rollup-plugin-node-externals";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

import pkg from "./package.json";

const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.compile(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(result);
        }
      }
    );
    sass.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

const dtsFilePathAlias = {
  typescript: require("ttypescript"),
  tsconfigDefaults: {
    compilerOptions: {
      plugins: [
        { transform: "typescript-transform-paths" },
        {
          transform: "typescript-transform-paths",
          afterDeclarations: true,
        },
      ],
    },
  },
};

const entry = "src/index.ts";

export default [
  {
    input: [entry], // 入口文件
    output: [
      {
        // 出口文件
        dir: path.dirname(pkg.module),
        format: "es", // es模块导出，支持按需加载
        name: pkg.name,
        exports: "named", // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        // preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      // 自动将dependencies依赖声明为 externals
      externals({
        devDeps: false,
      }),
      peerDepsExternal(),
      // 处理外部依赖
      resolve(),
      // 支持基于 CommonJS 模块引入
      commonjs(),
      typescript({
        // 为了让tsconfig.json配置的路径别名在编译出的.d.ts中转换成相对路径
        // 例如："@/hooks" => "../../hooks"
        ...dtsFilePathAlias,
      }),
      // 支持 scss
      postcss({
        extract: true,
        process: processScss,
      }),
      // 清除调试代码
      strip(),
    ],
  },
];
