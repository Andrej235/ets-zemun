import { useLoaderData } from "react-router";
import { LoaderReturnType, Loader as LoaderType } from "./create-loader";

export default function useLoader<Loader extends LoaderType<unknown>>() {
  const data = useLoaderData();
  return data as Awaited<LoaderReturnType<Loader>>;
}

