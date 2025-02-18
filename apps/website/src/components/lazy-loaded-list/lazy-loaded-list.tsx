import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./lazy-loaded-list.scss";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Endpoints } from "@shared/api-dsl/types/endpoints/endpoints";
import { useScroll } from "motion/react";

type LazyLoadResponse<T> = {
  items: T[];
  loadedCount: number;
  totalCount: number;
  nextCursor: string | null;
};

type EntityType<T extends LazyLoadResponse<unknown>> =
  T extends LazyLoadResponse<infer U> ? U : never;

type LazyLoadedListProps<T extends LazyLoadResponse<unknown>> = {
  readonly response: T;
  readonly children: (loaded: EntityType<T>) => React.ReactNode;
  readonly loadMoreOn?: `${number}%`;
};

export default function LazyLoadedList<T extends LazyLoadResponse<unknown>>({
  response: initialResponse,
  children,
  loadMoreOn = "85%",
}: LazyLoadedListProps<T>) {
  const markerRef = useRef<HTMLDivElement>(null);

  const [currentResponse, setCurrentResponse] =
    useState<LazyLoadResponse<unknown>>(initialResponse);

  const sentCursor = useRef<string | null>(null);
  const preserveScroll = useRef(false);

  const loadMore = useCallback(async () => {
    if (
      !currentResponse.nextCursor ||
      sentCursor.current === currentResponse.nextCursor
    )
      return null;

    sentCursor.current = currentResponse.nextCursor;

    const newResponse = await sendAPIRequest(
      ("/" + currentResponse.nextCursor) as Endpoints,
      {
        method: "get",
      } as never
    ).then((x) => x as unknown);

    if (
      typeof newResponse !== "object" ||
      !newResponse ||
      !("code" in newResponse) ||
      !("content" in newResponse) ||
      newResponse.code !== "OK"
    )
      return null;

    const newResponseContent = newResponse.content as LazyLoadResponse<unknown>;

    newResponseContent.items = currentResponse.items.concat(
      newResponseContent.items
    );
    preserveScroll.current = true;
    setCurrentResponse(newResponseContent);

    sentCursor.current = null;
    return newResponse;
  }, [currentResponse]);

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

  const { scrollY } = useScroll();
  useLayoutEffect(() => {
    if (preserveScroll.current)
      document.scrollingElement!.scrollTop = scrollY.get();
  });

  const marker = useMemo(
    () => (
      <div
        className="lazy-loading-marker"
        ref={markerRef}
        style={{
          top: loadMoreOn,
        }}
      />
    ),
    [loadMoreOn]
  );

  const memoizedChildren = useMemo(
    () => (currentResponse.items as EntityType<T>[]).map(children),
    [children, currentResponse.items]
  );

  return (
    <>
      {marker}
      {memoizedChildren}
    </>
  );
}

