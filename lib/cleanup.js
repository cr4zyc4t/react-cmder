const fs = require("fs-extra");
const path = require("path");

const exampleDir = path.join(__dirname, "../example");

fs.emptyDirSync(exampleDir);
