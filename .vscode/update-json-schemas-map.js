import fs from "fs/promises";
import { argv } from "process";

console.log(argv[2]);

const currentMap = await fs
  .readFile(`${argv[2]}/src/assets/json-data/data-to-schema-map.json`, "utf-8")
  .then(JSON.parse);

const settingsJson = await fs
  .readFile(`${argv[2]}/.vscode/settings.json`, "utf-8")
  .then(JSON.parse);

settingsJson["json.schemas"] = currentMap;

await fs.writeFile(
  `${argv[2]}/.vscode/settings.json`,
  JSON.stringify(settingsJson, null, 2),
);
