import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const educationalProfilesLoader = createLoader(() =>
  sendAPIRequest("/profile", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
    },
  })
);

export default educationalProfilesLoader;

