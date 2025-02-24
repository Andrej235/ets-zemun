import i18n from "@/i18n";
import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const newsLoader = createLoader(() =>
  sendAPIRequest("/news/admin", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  })
);

export default newsLoader;

