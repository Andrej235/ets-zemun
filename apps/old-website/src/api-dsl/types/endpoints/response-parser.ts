import { Endpoints, Methods, Paths } from "./endpoints";
import { Union2Tuple } from "./union-to-tuple";
import { ParseSchemaProperty } from "./property-parser";

export type APIResponse<
  Endpoint extends Endpoints,
  Method extends Methods<Endpoint>,
> = Paths[Endpoint][Method] extends {
  responses: infer Responses;
}
  ? ParseAllResponses<
      Union2Tuple<keyof Responses>,
      Union2Tuple<Responses[keyof Responses]>
    >
  : never;

type ParseAllResponses<
  Codes extends unknown[],
  Responses extends unknown[],
> = Codes extends [infer FirstCode, ...infer RestCode]
  ? Responses extends [infer First, ...infer Rest]
    ?
        | (First extends {
            content: {
              "application/json": {
                schema: infer Schema;
              };
            };
          }
            ? {
                code: FirstCode;
                content: ParseSchemaProperty<Schema>;
              }
            : {
                code: FirstCode;
                content: null;
              })
        | ParseAllResponses<RestCode, Rest>
    : never
  : never;
