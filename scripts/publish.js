const path = require("path");
const { writeFile } = require("fs-extra");
const packageInfo = require("../dist/package.json");
const { exec } = require("child_process");

const { name } = packageInfo;

const distCwd = path.resolve(__dirname, "..", "dist");

const runCommand = (command, cwd) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        resolve("");
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

const writeJson = (targetPath, obj) =>
  writeFile(targetPath, JSON.stringify(obj, null, 2), "utf8");

(async () => {
  const versions = await runCommand(`npm view ${name} versions --json`);
  const versionsObj = JSON.parse(String(versions)) || [];
  packageInfo.version = versionsObj[versionsObj.length - 1];

  const targetPath = path.resolve(__dirname, `../dist/package.json`);
  const newPackageData = {
    ...packageInfo,
  };

  await writeJson(targetPath, newPackageData);

  await runCommand("npm version patch", distCwd);
  await runCommand("npm publish", distCwd);
})();
