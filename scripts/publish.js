const path = require("path");
const { writeFile } = require("fs-extra");
const packageInfo = require("../package.json");
const { exec } = require("child_process");

const { name } = packageInfo;

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

  await runCommand("git add .");
  await runCommand("git commit -m 'publish to npm'");

  await runCommand("npm version patch");
  await runCommand("npm publish");
})();
