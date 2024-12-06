import * as classes from "@data/classes.json";
import { redirect } from "react-router";

export default function ClassPageLoader({ params: { className } }: any) {
  if (typeof className !== "string" || className.length < 1)
    return redirect("..");

  return classes.classes.find((x) => x.name === className)!;
}
