const path = require("path");

const fs = require("fs-extra");
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

async function transformFile() {
  // fs.emptyDirSync(OUTPUT_BASE);


}

transformFile().catch(console.log);

// module.exports = function ts2js(inputDir, outputDir) {
const inputDir = path.join(__dirname, "templates/redux-ts");
console.log("ToanVQ: // -> inputDir", inputDir);
const outputDir = path.join(__dirname, "templates/redux");
fs.ensureDirSync(outputDir);
const files = listAllFile(inputDir, [], [
  "node_modules",
  "react-app-env.d.ts",
  "tsconfig.json",
]);
console.log("ToanVQ: files", files);
for (const file of files) {
  const outputFile = path.join(outputDir, path.relative(inputDir, file));

  if (/.(ts|tsx)$/.test(file)) {
    const { code } = babel.transformFileSync(file, babelOptions);
    fs.writeFileSync(outputFile.replace(/.(ts|tsx)$/, ".js"), code, "utf8");
  } else {
    fs.copySync(file, outputFile);
  }
}
// };