import { redirect } from "react-router";
import profilePreviewData from "@data/profiles.json";
import itData from "@data/profiles/elektrotehničar-informacionih-tehnologija.json";
import armData from "@data/profiles/administrator-računarskih-mreža.json";
import erData from "@data/profiles/elektrotehničar-računara.json";
import euData from "@data/profiles/elektrotehničar-automatike.json";
import klimeData from "@data/profiles/elektromehaničar-za-rashladne-i-termičke-uredjaje.json";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";
import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import i18n from "@i18n";
import createLoader from "@better-router/create-loader";

const SingleProfilePageLoader = createLoader(
  ({ params: { profileName } }: LoaderArgs) => {
    if (!profileName) return redirect("/profili");

    const jsonData = getJSON(profileName);
    if (!jsonData) return redirect("/profili");

    return sendAPIRequest("/profile/{id}", {
      method: "get",
      parameters: {
        id: jsonData.backendId,
        languageCode: i18n.language,
      },
    });
  }
);

function getJSON(profileName: string): ProfileSchema | null {
  const preview = profilePreviewData.profiles.find((x) =>
    x.profileURL.includes(profileName)
  );

  switch (preview?.abbreviation) {
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

export default SingleProfilePageLoader;

