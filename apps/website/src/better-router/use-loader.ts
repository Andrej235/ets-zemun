import { useLoaderData } from "react-router";
import { LoaderReturnType, Loader as LoaderType } from "./create-loader";

export default function useLoader<Loader extends LoaderType<unknown>>() {
  const data = useLoaderData();
  return (
    "__default" in data ? data.__default : data
  ) as LoaderReturnType<Loader>;
}

