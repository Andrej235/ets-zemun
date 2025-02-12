import { Endpoints, Methods } from "./types/endpoints/endpoints";
import { Request } from "./types/endpoints/request-parser";
import { APIResponse } from "./types/endpoints/response-parser";

const baseAPIUrl = "https://api.localhost.com";

type Response<
  Endpoint extends Endpoints,
  T extends Request<Endpoint>
> = T extends {
  method: infer Method;
}
  ? Method extends Methods<Endpoint>
    ? APIResponse<Endpoint, Method>
    : never
  : never;

export default async function sendAPIRequest<
  T extends Request<Endpoint>,
  Endpoint extends Endpoints
>(
  endpoint: Endpoint,
  request: T,
  includeCredentials: boolean = true
): Promise<Response<Endpoint, T>> {
  const url = new URL(baseAPIUrl + endpoint);
  const requestCopy = structuredClone(request);

  if ("parameters" in requestCopy) {
    for (const key in requestCopy.parameters) {
      if (!url.href.includes("%7B" + key + "%7D")) continue;

      const value = (requestCopy.parameters as Record<string, string>)[key];
      if (value !== undefined)
        url.href = url.href.replace("%7B" + key + "%7D", value);

      delete (requestCopy.parameters as Record<string, string>)[key];
    }

    url.search = new URLSearchParams(
      requestCopy.parameters as Record<string, string>
    ).toString();
  }

  const body =
    "payload" in requestCopy ? JSON.stringify(requestCopy.payload) : null;

  const requestInit: RequestInit = {
    method: requestCopy.method as string,
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: includeCredentials ? "include" : "omit",
  };

  const response = await fetch(url, requestInit);
  try {
    const responseBody = await response.json();

    return {
      code: response.statusText,
      content: responseBody,
    } as Response<Endpoint, T>;
  } catch (error) {
    console.error(error);

    return {
      code: response.statusText,
      content: null,
    } as Response<Endpoint, T>;
  }
}
