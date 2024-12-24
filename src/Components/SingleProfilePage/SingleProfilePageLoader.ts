import { redirect } from "react-router";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";
import profilePreviewData from "@data/profiles.json";
import it from "@data/profiles/elektrotehničar-informacionih-tehnologija.json";
import arm from "@data/profiles/administrator-računarskih-mreža.json";
import er from "@data/profiles/elektrotehničar-računara.json";
import eu from "@data/profiles/elektrotehničar-automatike.json";
import klime from "@data/profiles/elektromehaničar-za-rashladne-i-termičke-uredjaje.json";

export default function SingleProfilePageLoader({
  params: { profileName },
}: LoaderArgs) {
  if (!profileName) return redirect("/profili");

  const preview = profilePreviewData.profiles.find((x) =>
    x.profileURL.includes(profileName)
  );

  if (!preview) return redirect("/profili");

  switch (preview.abbreviation) {
    case "it":
      return it;
    case "arm":
      return arm;
    case "er":
      return er;
    case "eu":
      return eu;
    case "klime":
      return klime;
    default:
      return null;
  }
}
