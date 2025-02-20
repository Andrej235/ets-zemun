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
        cycle(x);
      }
    });

    async function cycle(current: LazyLoadResponse<T>) {
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
        newResponse.code !== "OK"
      )
        return null;

      const content = newResponse.content as LazyLoadResponse<T>;

      cycle(content);
      onLoad(content.items);
    }
  }, [response, onLoad]);
}

