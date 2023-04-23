const { mkdirp, createFile } = require("fs-extra");

const capitalize = (str) => {
  let firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1);
};

const pkgName = process.argv.splice(2)[0];

const packagePath = `${process.cwd()}/src/packages/`;

// 要创建的组件文件夹路径
const pkgPath = `${packagePath}/${pkgName}`;

// 要创建的组件示例文件夹路径
const pkgExamplePath = `${pkgPath}/__example__`;

// 要创建的组件文档文件夹路径
const pkgStoriesPath = `${pkgPath}/stories`;

// 要创建的组件样式文件夹路径
const pkgStylesPath = `${pkgPath}/styles`;

// 要创建的组件样式文件夹路径
const pkgIndexFile = `${pkgPath}/index.ts`;

// 要创建的组件样式文件夹路径
const pkgNameFile = `${pkgPath}/${capitalize(pkgName)}.tsx`;

(function () {
  console.log(process.cwd());
  mkdirp(pkgPath);
  mkdirp(pkgExamplePath);
  mkdirp(pkgStoriesPath);
  mkdirp(pkgStylesPath);
  createFile(pkgIndexFile);
  createFile(pkgNameFile);
})();
