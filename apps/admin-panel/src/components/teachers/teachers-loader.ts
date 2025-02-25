import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const teachersLoader = createLoader(() =>
  sendAPIRequest("/teacher/simple", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  })
);

export default teachersLoader;

