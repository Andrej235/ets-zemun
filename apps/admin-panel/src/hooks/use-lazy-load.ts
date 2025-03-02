import { useEffect, useRef } from "react";
import sendAPIRequest from "../../../shared-frontend/api-dsl/send-api-request";
import { Endpoints } from "../../../shared-frontend/api-dsl/types/endpoints/endpoints";

type LazyLoadResponse<T> = {
  items: T[];
  loadedCount: number;
  totalCount: number;
  nextCursor: string | null;
};

export default function useLazyLoad<T>(
  response: Promise<LazyLoadResponse<T> | null>,
  onLoad: (loadedData: T[]) => void
) {
  const startedCycle = useRef(false);

  useEffect(() => {
    if (startedCycle.current) return;
    startedCycle.current = true;

    response.then((x) => {
      if (x) {
        onLoad(x.items);
        recursivelyLazyLoad(x, onLoad);
      }
    });
  }, [response, onLoad]);
}

export async function recursivelyLazyLoad<T>(
  current: LazyLoadResponse<T>,
  onLoad: (loadedData: T[]) => void
) {
  if (!current.nextCursor) return;

  const newResponse = (await sendAPIRequest(
    ("/" + current.nextCursor) as Endpoints,
    {
      method: "get",
    } as never
  )) as unknown;

  if (
    typeof newResponse !== "object" ||
    !newResponse ||
    !("code" in newResponse) ||
    !("content" in newResponse) ||
    newResponse.code !== "200"
  )
    return null;

  const content = newResponse.content as LazyLoadResponse<T>;

  recursivelyLazyLoad(content, onLoad);
  onLoad(content.items);
}

