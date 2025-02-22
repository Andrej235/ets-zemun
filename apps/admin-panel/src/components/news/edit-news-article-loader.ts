import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const editNewsArticleLoader = createLoader(({ params: { id } }) => ({
  preview: sendAPIRequest("/news/admin/{id}/preview", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  }),
  full: sendAPIRequest("/news/admin/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  }),
}));

export default editNewsArticleLoader;

