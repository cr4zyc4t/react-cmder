const path = require("path");
const fs = require("fs");

function getProjectInfo(projectDirectory) {
  const appDir = path.join(process.cwd(), projectDirectory);

  const packagePath = path.join(appDir, "package.json");
  const yarnLock = path.join(appDir, "yarn.lock");
  const tsConfig = path.join(appDir, "tsconfig.json");
  // const packageLock = path.join(appDir, "package-lock.json");

  const useYarn = fs.existsSync(yarnLock);
  // const useNpm = fs.existsSync(packageLock);
  const useTS = fs.existsSync(tsConfig);

  return {
    appDir,
    useYarn,
    // useNpm,
    useTS,
    packagePath,
  };
}

function shellescape(s) {
  return s.replace("/", "\\/");
}

module.exports = {
  getProjectInfo,
  shellescape,
};