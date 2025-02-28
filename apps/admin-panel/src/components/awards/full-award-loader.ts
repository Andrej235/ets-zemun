import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullAwardLoader = createLoader(({ params: { id } }) =>
  sendAPIRequest("/award/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  })
);

export default fullAwardLoader;
