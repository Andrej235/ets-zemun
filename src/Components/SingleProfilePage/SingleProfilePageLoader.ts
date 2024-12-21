import { redirect } from "react-router";
import profilePreviewData from "@data/profiles.json";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";

export default async function SingleProfilePageLoader({
  params: { profileName },
}: LoaderArgs) {
  if (!profileName) return redirect("/profili");

  const preview = profilePreviewData.profiles.find((x) =>
    x.profileURL.includes(profileName)
  );

  if (!preview) return redirect("/profili");

  const profile = await import(
    `../../assets/json-data/data/profiles/${preview.fullProfileFileName.replace(
      ".json",
      ""
    )}.json`
  );

  return {
    ...profile,
  };
}
