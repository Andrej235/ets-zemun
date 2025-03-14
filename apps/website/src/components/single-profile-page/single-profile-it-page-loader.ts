import createLoader from "@better-router/create-loader";
import i18n from "@i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const singleProfilePageITLoader = createLoader(() =>
  sendAPIRequest("/profile/{id}", {
    method: "get",
    parameters: {
      id: 1,
      languageCode: i18n.language,
    },
  })
);

export default singleProfilePageITLoader;
