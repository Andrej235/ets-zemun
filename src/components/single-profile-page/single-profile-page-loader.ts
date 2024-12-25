import { redirect } from "react-router";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";
import profilePreviewData from "@data/profiles.json";
import itData from "@data/profiles/elektrotehničar-informacionih-tehnologija.json";
import armData from "@data/profiles/administrator-računarskih-mreža.json";
import erData from "@data/profiles/elektrotehničar-računara.json";
import euData from "@data/profiles/elektrotehničar-automatike.json";
import klimeData from "@data/profiles/elektromehaničar-za-rashladne-i-termičke-uredjaje.json";

export default function SingleProfilePageLoader({
  params: { profileName },
}: LoaderArgs) {
  if (!profileName) return redirect("/profili");

  const preview = profilePreviewData.profiles.find((x) =>
    x.profileURL.includes(profileName),
  );

  if (!preview) return redirect("/profili");

  switch (preview.abbreviation) {
    case "it":
      return itData;
    case "arm":
      return armData;
    case "er":
      return erData;
    case "eu":
      return euData;
    case "klime":
      return klimeData;
    default:
      return null;
  }
}
