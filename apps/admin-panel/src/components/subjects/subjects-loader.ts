import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const subjectsLoader = createLoader(() =>
  sendAPIRequest("/subject", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 10,
      offset: 0,
    },
  })
);

export default subjectsLoader;
