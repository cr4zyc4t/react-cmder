const path = require("path");
const fs = require("fs-extra");
const { CLIEngine } = require("eslint");
const babel = require("@babel/core");

function listAllFile(dir, blacklist = []) {
  const files = fs.readdirSync(dir);
  let listFiles = [];

  for (const file of files) {
    if (file.startsWith(".") || blacklist.includes(file)) {
      continue;
    }
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      // eslint-disable-next-line no-param-reassign
      listFiles = listFiles.concat(listAllFile(filepath, blacklist));
    } else {
      listFiles = listFiles.concat(filepath);
    }
  }

  return listFiles;
}

const babelOptions = {
  presets: [
    "@babel/preset-typescript",
  ],
};

function ts2js(inputDir, outputDir) {
  fs.ensureDirSync(outputDir);
  fs.emptyDirSync(outputDir);
  const files = listAllFile(inputDir, [
    "node_modules",
    "react-app-env.d.ts",
    "tsconfig.json",
  ]);
  for (const file of files) {
    const outputFile = path.join(outputDir, path.relative(inputDir, file));
    fs.ensureDirSync(path.dirname(outputFile));

    if (/.(ts|tsx)$/.test(file)) {
      const { code } = babel.transformFileSync(file, babelOptions);
      fs.writeFileSync(outputFile.replace(/.(ts|tsx)$/, ".js"), code, "utf8");
    } else {
      fs.copySync(file, outputFile);
    }
  }

  // create jsconfig.json
  const jsConfig = {
    "compilerOptions": {
      "baseUrl": "./src",
    },
    "include": [
      "src",
    ],
  };
  fs.writeFileSync(path.join(outputDir, "jsconfig.json"), JSON.stringify(jsConfig, null, 2), "utf8");

  const cli = new CLIEngine({
    baseConfig: {
      extends: [
        "react-app",
        "@cr4zyc4t/common",
        "@cr4zyc4t/common/import",
        "@cr4zyc4t/common/react",
      ],
    },
    useEslintrc: false,
    fix: true,
  });
  const report = cli.executeOnFiles([outputDir]);
  CLIEngine.outputFixes(report);
}

const reduxTS = path.join(__dirname, "../templates/redux-ts");
const routerTS = path.join(__dirname, "../templates/router-ts");
const reduxJS = path.join(__dirname, "../templates/redux");
const routerJS = path.join(__dirname, "../templates/router");
ts2js(reduxTS, reduxJS);
ts2js(routerTS, routerJS);