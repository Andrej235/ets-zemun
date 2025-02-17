import {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import "./lazy-loaded-list.scss";
import Async from "@better-router/async";
import { useScroll } from "motion/react";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Endpoints } from "@shared/api-dsl/types/endpoints/endpoints";

type ResponseLike<C, T> = {
  code: C;
  content: T;
};

type LazyLoadResponse<T> = {
  items: T[];
  loadedCount: number;
  totalCount: number;
  nextCursor: string | null;
};

export type EntityType<T extends LazyLoadResponse<unknown>> =
  T extends LazyLoadResponse<infer U> ? U : never;

type LazyLoadedListProps<
  R extends Promise<ResponseLike<string, T>>,
  C extends Awaited<R>["code"],
  T
> = {
  readonly data: R;
  readonly children: (
    loaded: R extends Promise<ResponseLike<string, infer U>>
      ? U extends LazyLoadResponse<infer V>
        ? V
        : never
      : never
  ) => React.ReactNode;
  readonly success: C;
  readonly loadMoreOn?: `${number}%`;
};

export default function LazyLoadedList<
  R extends Promise<ResponseLike<string, T>>,
  C extends Awaited<R>["code"],
  T
>({
  data,
  children,
  success,
  loadMoreOn = "85%",
}: LazyLoadedListProps<R, C, T>) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [responses, setResponses] = useState<
    {
      id: number;
      data: R;
    }[]
  >([{ id: 0, data }]);
  const [currentResponse, setCurrentResponse] = useState<R>(data);

  const sentCursor = useRef<string | null>(null);
  const isWaiting = useRef(false);

  const loadMore = useCallback(async () => {
    if (isWaiting.current) return null;
    isWaiting.current = true;

    const currentAwaitedResponse = (await currentResponse)
      .content as LazyLoadResponse<unknown>;

    if (
      !currentAwaitedResponse.nextCursor ||
      sentCursor.current === currentAwaitedResponse.nextCursor
    )
      return null;

    sentCursor.current = currentAwaitedResponse.nextCursor;

    const newResponse = sendAPIRequest(
      ("/" + currentAwaitedResponse.nextCursor) as Endpoints,
      {
        method: "get",
      } as never
    ).then((x: Awaited<R>) => {
      if (x.code === success) {
        sentCursor.current = null;
        isWaiting.current = false;
      }

      return x;
    }) as R;

    setCurrentResponse(newResponse);
    setResponses((x) => [...x, { id: x.length, data: newResponse }]);
    return newResponse;
  }, [currentResponse, success]);

  useEffect(() => {
    if (!markerRef.current) return;

    const observer = new IntersectionObserver(
      ([marker]) => {
        if (
          marker &&
          marker.isIntersecting &&
          marker.intersectionRatio >= 0.5
        ) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(markerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [markerRef, loadMore]);

  const marker = useMemo(
    () => (
      <div
        className="lazy-loading-marker"
        ref={markerRef}
        style={{
          top: `max(150vh, ${loadMoreOn})`,
        }}
      />
    ),
    [loadMoreOn]
  );

  const memoizedChildren = useMemo(
    () =>
      responses.map((x) => (
        <Async await={x.data} key={x.id}>
          {(data: unknown) => {
            if ((data as ResponseLike<string, T>).code !== success) return null;

            return (
              (
                (data as ResponseLike<string, T>)
                  .content as LazyLoadResponse<unknown>
              ).items as (R extends Promise<ResponseLike<string, infer U>>
                ? U extends LazyLoadResponse<infer V>
                  ? V
                  : never
                : never)[]
            ).map(children);
          }}
        </Async>
      )),
    [responses, success, children]
  );

  const { scrollY } = useScroll();
  useLayoutEffect(() => {
    // FIXME: this is a hack, which doesn't even work because it requires a rerender to restore scroll position but in this version
    // of lazy list rerender happens only after a request is sent, not after a response is received and the list is rendered (it is rendered inside of 'Async' component)
    document.scrollingElement!.scrollTop = scrollY.get();
  });

  return (
    <>
      {marker}
      {memoizedChildren}
    </>
  );
}

