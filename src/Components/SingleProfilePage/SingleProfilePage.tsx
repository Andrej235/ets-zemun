import { useLoaderData } from "react-router";
import ProfileSchema from "src/assets/json-data/ts-schemas/profile.schema";

export default function SingleProfilePage() {
  const loaderData = useLoaderData() as ProfileSchema;
  console.log(loaderData.classes);

  return <div>SingleProfilePage</div>;
}
