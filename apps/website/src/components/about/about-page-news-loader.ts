import createLoader from "@better-router/create-loader";
import i18n from "@i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const aboutPageNewsLoader = createLoader(() =>
  sendAPIRequest("/news", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 3,
    },
  })
);

export default aboutPageNewsLoader;

