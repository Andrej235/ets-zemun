import { Endpoints, Methods } from "./types/endpoints/endpoints";
import { Request } from "./types/endpoints/request-parser";
import { ApiResponse } from "./types/endpoints/response-parser";

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL!;
if (!baseApiUrl) throw new Error("NEXT_PUBLIC_API_URL not defined");

type Response<
  Endpoint extends Endpoints,
  T extends Request<Endpoint>,
> = T extends {
  method: infer Method;
}
  ? Method extends Methods<Endpoint>
    ? ApiResponse<Endpoint, Method>
    : never
  : never;

export default async function sendApiRequestSSR<
  T extends Request<Endpoint>,
  Endpoint extends Endpoints,
>(
  endpoint: Endpoint,
  request: T,
  revalidate?: number
): Promise<Response<Endpoint, T>> {
  const url = new URL(baseApiUrl + endpoint);
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
    next: {
      revalidate: revalidate || 3600,
    },
  };

  const response = await fetch(url, requestInit);
  const code = response.status.toString();
  const isOk = response.ok;
  let data = null;

  try {
    data = await response.json();
    // eslint-disable-next-line no-empty
  } catch {}

  return isOk
    ? ({ code, isOk, error: null, response: data } as Response<Endpoint, T>)
    : ({ code, isOk, error: data, response: null } as Response<Endpoint, T>);
}
