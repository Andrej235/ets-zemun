import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n.ts";
import sendAPIRequest from "@/api-dsl/send-api-request";

const fullNewsArticleLoader = createLoader(({ params: { newsId } }) =>
  sendAPIRequest("/news/{id}", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      id: +newsId,
    },
  })
);

export default fullNewsArticleLoader;

