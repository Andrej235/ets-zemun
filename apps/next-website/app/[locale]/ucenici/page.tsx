import Students from "@/components/students/students";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Students />
    </Suspense>
  );
}
