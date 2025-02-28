import { Endpoints, Methods, Paths } from "./endpoints";
import { Union2Tuple } from "./union-to-tuple";
import { ParseSchemaProperty } from "./property-parser";

export type APIResponse<
  Endpoint extends Endpoints,
  Method extends Methods<Endpoint>
> = Paths[Endpoint][Method] extends {
  responses: infer Responses;
}
  ? ParseAllResponses<Union2Tuple<Responses[keyof Responses]>>
  : never;

type ParseAllResponses<Responses extends unknown[]> = Responses extends [
  infer First,
  ...infer Rest
]
  ?
      | (First extends {
          description: infer Description;
          content: {
            "application/json": {
              schema: infer Schema;
            };
          };
        }
          ? {
              code: Description;
              content: ParseSchemaProperty<Schema>;
            }
          : First extends {
              description: infer Description;
            }
          ? {
              code: Description;
              content: null;
            }
          : never)
      | ParseAllResponses<Rest>
  : never;
