import { APIMap } from "../../api-map";

export type Paths = APIMap["paths"];
export type Endpoints = keyof Paths;
export type Methods<Endpoint extends Endpoints> = keyof Paths[Endpoint];
export type AllSchemaInformation = APIMap["components"]["schemas"];
export type SchemaNames = keyof AllSchemaInformation;
