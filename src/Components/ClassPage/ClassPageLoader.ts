import data from "@data/classes.json";
import { redirect } from "react-router";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";

export default function classPageLoader({ params: { className } }: LoaderArgs) {
  if (!className) return redirect("..");

  const toFind = className.replace(/-/g, " ");
  return data.classes.find((x) => x.name.toLowerCase() === toFind)!;
}
