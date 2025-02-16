import { ReactNode, Suspense } from "react";
import { Await } from "react-router";

type AsyncProps<T> = {
  readonly await: Promise<T>;
  readonly skeleton?: ReactNode;
  readonly errorElement?: ReactNode;
  readonly children: (data: unknown extends T ? unknown : T) => ReactNode;
};

export default function Async<T>({
  await: resolve,
  skeleton,
  errorElement,
  children,
}: AsyncProps<Awaited<T>>) {
  return (
    <Suspense fallback={skeleton ?? null}>
      <Await errorElement={errorElement} resolve={resolve}>
        {(x) => {
          console.log("from async", x);

          return children(x);
        }}
      </Await>
    </Suspense>
  );
}

