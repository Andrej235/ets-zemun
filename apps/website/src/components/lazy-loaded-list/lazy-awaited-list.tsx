import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Endpoints } from "@shared/api-dsl/types/endpoints/endpoints";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  memo,
} from "react";
import { useScroll } from "motion/react";
import "./lazy-loaded-list.scss";

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
  readonly skeleton?: React.ReactNode;
};

const genericMemo: <T>(component: T) => T = memo;

const LazyAwaitedList = genericMemo(
  <
    R extends Promise<ResponseLike<string, T>>,
    C extends Awaited<R>["code"],
    T
  >({
    data,
    children,
    success,
    loadMoreOn = "85%",
    skeleton,
  }: LazyLoadedListProps<R, C, T>) => {
    const markerRef = useRef<HTMLDivElement>(null);
    const [currentResponse, setCurrentResponse] = useState<R>(data);
    const [loadedResponse, setLoadedResponse] =
      useState<LazyLoadResponse<unknown> | null>(null);
    const [showSkeleton, setShowSkeleton] = useState(false);

    const sentCursor = useRef<string | null>(null);
    const isWaiting = useRef(false);
    const preserveScroll = useRef(false);

    useEffect(() => {
      isWaiting.current = true;

      const newResponse = data.then((x) => {
        if (x.code === success) {
          sentCursor.current = null;
          isWaiting.current = false;

          const response = x.content as LazyLoadResponse<unknown>;
          setLoadedResponse(response);
          setShowSkeleton(false);
        }

        return x;
      });

      setCurrentResponse(newResponse as R);
      setShowSkeleton(true);
    }, [data, success]);

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
          const newResponse = x.content as LazyLoadResponse<unknown>;
          newResponse.items = currentAwaitedResponse.items.concat(
            newResponse.items
          );
          setLoadedResponse(newResponse);
          setShowSkeleton(false);
        }

        return x;
      }) as R;

      preserveScroll.current = true;
      setCurrentResponse(newResponse);
      setShowSkeleton(true);
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
        loadedResponse &&
        (
          loadedResponse.items as (R extends Promise<
            ResponseLike<string, infer U>
          >
            ? U extends LazyLoadResponse<infer V>
              ? V
              : never
            : never)[]
        ).map(children),
      [loadedResponse, children]
    );

    const { scrollY } = useScroll();
    useLayoutEffect(() => {
      if (preserveScroll.current)
        document.scrollingElement!.scrollTop = scrollY.get();
    });

    return (
      <>
        {marker}
        {memoizedChildren}
        {showSkeleton && skeleton}
      </>
    );
  }
);
export default LazyAwaitedList;

