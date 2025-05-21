const fs = require("fs");
const util = require("util");

const data = fs.readFileSync(process.argv[2], "utf8");
const parsedData = JSON.parse(data);
const objectString = util.inspect(parsedData, {
  depth: null,
  breakLength: Infinity,
  maxArrayLength: null,
  maxStringLength: null,
});

const tsDefinition = `export type APIMap = ${objectString}`;
fs.writeFileSync(process.argv[3], tsDefinition);
fs.writeFileSync(process.argv[4], tsDefinition);
