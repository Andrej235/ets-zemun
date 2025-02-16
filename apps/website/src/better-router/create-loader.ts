import { LoaderFunctionArgs } from "react-router";

type LoaderInit<T extends { [key: string]: object }> = (args: {
  params: Record<string, string>;
  request: Request;
}) => LoaderInitData<T> | Promise<LoaderInitData<T>>;

type LoaderInitData<T> = T | Response | null;

export type Loader<T> = (x: LoaderFunctionArgs) => Promise<T | Response | null>;

export type LoaderReturnType<C extends Loader<unknown>> = C extends Loader<
  infer T
>
  ? T
  : unknown;

export default function createLoader<T extends { [key: string]: object }>(
  loader: LoaderInit<T>
): Loader<T> {
  return async (x: LoaderFunctionArgs) => {
    try {
      const data: T | Response | null = await loader({
        params: x.params as Record<string, string>,
        request: x.request,
      });

      return data;
    } catch (error) {
      console.error(`Error occurred in loader`, error);
      throw error;
    }
  };
}

