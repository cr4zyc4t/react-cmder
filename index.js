#!/usr/bin/env node

const spawn = require("cross-spawn");
const inquirer = require("inquirer");
const fs = require("fs");
const { getProjectInfo, shellescape } = require("./utils");

const craPath = require.resolve("create-react-app");

async function start() {
  const answers = await inquirer.prompt([
    {
      name: "features",
      type: "checkbox",
      message: "Check the features needed for your project:",
      pageSize: 5,
      choices: [
        {
          name: "TypeScript",
          value: "ts",
          short: "TS",
          description: "Add support for the TypeScript language",
          plugins: ["typescript"],
        },
        {
          name: "Router",
          value: "router",
          description: "Structure the app with dynamic pages",
        },
        {
          name: "Redux",
          value: "redux",
          description: "Manage the app state with a centralized store",
        },
        {
          name: "CSS Pre-processors",
          value: "css-preprocessor",
          description: "Add support for CSS pre-processors like Sass, Less or Stylus",
        },
        {
          name: "Linter / Formatter",
          value: "linter",
          short: "Linter",
          description: "Check and enforce code quality with ESLint or Prettier",
          plugins: ["eslint"],
          checked: true,
        },
        // {
        //   name: "Unit Testing",
        //   value: "unit",
        //   short: "Unit",
        //   description: "Add a Unit Testing solution like Jest or Mocha",
        //   plugins: ["jest"],
        // },
      ],
    },
    {
      name: "reduxConfig",
      when: answers => answers.features.includes("redux"),
      type: "checkbox",
      message: "Middleware for handling side-effect:",
      description: "Middleware for handling side-effect in redux",
      choices: [
        {
          name: "Redux Thunk",
          value: "thunk",
          short: "Thunk",
        },
        {
          name: "Redux Saga",
          value: "saga",
          short: "Saga",
          checked: true,
        },
      ],
    },
    {
      name: "eslintConfig",
      when: answers => answers.features.includes("linter"),
      type: "list",
      message: "Pick a linter / formatter config:",
      description: "Checking code errors and enforcing an homogeoneous code style is recommended.",
      choices: [
        {
          name: "ReactApp strictly config",
          value: "stricly",
          short: "Stricly",
        },
        {
          name: "ReactApp standard config",
          value: "standard",
          short: "Standard",
        },
      ],
    },
  ]);

  const craArgv = process.argv.slice(2);
  if (answers.features.includes("ts") && !craArgv.includes("--typescript")) {
    craArgv.push("--typescript");
  }

  // const result = spawn.sync(
  //   "node",
  //   [craPath].concat(craArgv),
  //   { stdio: "inherit" }
  // );

  // if (result.status !== 0) {
  //   process.exit(result.status);
  // }

  const {
    useYarn,
    useTS,
    packagePath,
  } = getProjectInfo(craArgv[0]);

  const packageJson = require(packagePath);
  const additionalPkgs = [];

  if (answers.features.includes("css-preprocessor")) {
    additionalPkgs.push("node-sass");
  }
  if (answers.features.includes("linter") && answers.eslintConfig === "stricly") {
    additionalPkgs.push("@cr4zyc4t/eslint-config-common");
    packageJson.eslintConfig.extends = ["react-app", "@cr4zyc4t/common", "@cr4zyc4t/common/import", "@cr4zyc4t/common/react"];
  }
  if (answers.features.includes("redux")) {
    additionalPkgs.push("redux", "react-redux");
    if (useTS) {
      additionalPkgs.push("@types/react-redux");
    }
    if (answers.reduxConfig.includes("thunk")) {
      additionalPkgs.push("redux-thunk");
    }
    if (answers.reduxConfig.includes("saga")) {
      additionalPkgs.push("redux-saga");
    }
  }
  if (answers.features.includes("router")) {
    additionalPkgs.push("react-router-dom");
    if (useTS) {
      additionalPkgs.push("@types/react-router-dom");
    }
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), "utf8");
  if (additionalPkgs.length > 0) {
    if (useYarn) {
      spawn(
        "yarn",
        ["add"].concat(additionalPkgs),
        { stdio: "inherit" }
      );
    } else {
      spawn(
        "npm",
        ["install"].concat(additionalPkgs),
        { stdio: "inherit" }
      );
    }
  }
}

start();