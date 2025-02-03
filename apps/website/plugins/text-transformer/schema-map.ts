import fs from "fs/promises";
import micromatch from "micromatch";
import path from "path";

export type SchemaMap = {
  fileMatch: string[];
  url: string;
  omitFromTranslation?: string[];
}[];

export async function getPropertyNamesToOmit(
  jsonFilePath: string,
  schemaMap: SchemaMap | null
): Promise<string[]> {
  if (!schemaMap) return [];

  for (const mapping of schemaMap)
    if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch))
      return mapping.omitFromTranslation ?? [];

  return [];
}

export async function getSchemaMap(): Promise<SchemaMap> {
  return JSON.parse(
    await fs.readFile(
      path.resolve(
        __dirname,
        "../src/assets/json-data/data-to-schema-map.json"
      ),
      "utf-8"
    )
  );
}

