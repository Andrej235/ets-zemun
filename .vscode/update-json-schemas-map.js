import fs from "fs/promises";
import { argv } from "process";

const currentMap = await fs
  .readFile(`${argv[2]}/src/assets/json-data/data-to-schema-map.json`, "utf-8")
  .then(JSON.parse);

const settingsJson = await fs
  .readFile(`${argv[2]}/.vscode/settings.json`, "utf-8")
  .then(JSON.parse);

settingsJson["json.schemas"] = currentMap.map((x) => ({
  fileMatch: x.fileMatch,
  url: "/" + x.url,
}));

await fs.writeFile(
  `${argv[2]}/.vscode/settings.json`,
  JSON.stringify(settingsJson, null, 2),
);
