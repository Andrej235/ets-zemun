import createLoader from "@better-router/create-loader";
import i18n from "@i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { redirect } from "react-router";
import { LoaderArgs } from "src/types/utility/react-router-loader-args";

export type SingleProfilePageLoader = ReturnType<
  typeof singleProfilePageLoaderCreator
>;

const singleProfilePageLoaderCreator = (id: number) =>
  createLoader(({ params: { profileName } }: LoaderArgs) => {
    if (!profileName) return redirect("/profili");

    return sendAPIRequest("/profile/{id}", {
      method: "get",
      parameters: {
        id,
        languageCode: i18n.language,
      },
    });
  });

const singleProfilePageLoaderIT = singleProfilePageLoaderCreator(1);
const singleProfilePageLoaderAdministrator = singleProfilePageLoaderCreator(2);
const singleProfilePageLoaderDevices = singleProfilePageLoaderCreator(3);
const singleProfilePageLoaderAutomatics = singleProfilePageLoaderCreator(4);
const singleProfilePageLoaderACs = singleProfilePageLoaderCreator(5);

export {
  singleProfilePageLoaderIT,
  singleProfilePageLoaderAdministrator,
  singleProfilePageLoaderDevices,
  singleProfilePageLoaderAutomatics,
  singleProfilePageLoaderACs,
};

