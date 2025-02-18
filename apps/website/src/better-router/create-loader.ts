import { LoaderFunctionArgs, redirect } from "react-router";

type LoaderInit<T extends { [key: string]: object } | Promise<P>, P> = (args: {
  params: Record<string, string>;
  request: Request;
}) => LoaderInitData<T>;

type LoaderInitData<T> = T | ReturnType<typeof redirect> | null;

export type Loader<T> = (
  x: LoaderFunctionArgs
) => Promise<T | ReturnType<typeof redirect> | null>;

export type LoaderReturnType<C extends Loader<unknown>> = C extends Loader<
  infer T
>
  ? T
  : unknown;

export default function createLoader<
  T extends { [key: string]: object } | Promise<P>,
  P
>(loader: LoaderInit<T, P>): Loader<T> {
  return async (x: LoaderFunctionArgs) => {
    try {
      const data: T | ReturnType<typeof redirect> | null = loader({
        params: x.params as Record<string, string>,
        request: x.request,
      });

      return data instanceof Promise
        ? ({ __default: data } as unknown as T)
        : data;
    } catch (error) {
      console.error(`Error occurred in loader`, error);
      throw error;
    }
  };
}

