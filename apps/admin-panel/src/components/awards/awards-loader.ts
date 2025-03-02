import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const awardsLoader = createLoader(() =>
  sendAPIRequest("/award", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  })
);

export default awardsLoader;
