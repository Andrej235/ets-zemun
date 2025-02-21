import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullNewsArticleLoader = createLoader(({ params: { id } }) =>
  sendAPIRequest("/news/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  })
);

export default fullNewsArticleLoader;

