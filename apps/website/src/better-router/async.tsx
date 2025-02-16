import { ReactNode, Suspense } from "react";
import { Await } from "react-router";

type AsyncProps<T> = {
  readonly await: T;
  readonly skeleton?: ReactNode;
  readonly errorElement?: ReactNode;
  readonly children: (
    data: unknown extends T
      ? unknown
      : T extends Promise<infer U>
      ? U
      : Awaited<AwaitedObject<T>>
  ) => ReactNode;
};

export default function Async<T>({
  await: resolve,
  skeleton,
  errorElement,
  children,
}: AsyncProps<T>) {
  return (
    <Suspense fallback={skeleton ?? null}>
      <Await
        errorElement={errorElement}
        resolve={
          resolve instanceof Promise
            ? resolve
            : awaitObject(resolve as Record<string, unknown>)
        }
      >
        {children as (data: unknown) => ReactNode}
      </Await>
    </Suspense>
  );
}

type AwaitedObject<T> = Promise<{ [K in keyof T]: Awaited<T[K]> }>;
async function awaitObject<T extends Record<string, unknown>>(
  obj: T
): AwaitedObject<T> {
  const entries = Object.entries(obj);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => [key, await value] as const)
  );
  return Object.fromEntries(resolvedEntries) as {
    [K in keyof T]: Awaited<T[K]>;
  };
}

