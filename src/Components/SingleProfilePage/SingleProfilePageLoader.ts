import { redirect } from "react-router";
import * as profilePreviewData from "@data/profiles.json";

export default async function SingleProfilePageLoader({
  params: { profileName },
}: any) {
  if (typeof profileName !== "string" || profileName.length < 1)
    return redirect("/profili");

  const preview = profilePreviewData.profiles.find((x) =>
    x.profileURL.includes(profileName)
  );

  if (!preview) return redirect("/profili");

  const profile = await import(
    `../../assets/json-data/data/profiles/elektrotehničar-informacionih-tehnologija.json`
  );

  return {
    ...profile,
  };
}
