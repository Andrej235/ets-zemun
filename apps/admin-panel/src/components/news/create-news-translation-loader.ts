import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const createTranslationNewsArticleLoader = createLoader(
  ({ params: { id } }) => ({
    preview: sendAPIRequest("/news/admin/{id}/preview", {
      method: "get",
      parameters: {
        id: +id,
        languageCode: "sr_lt",
      },
    }),
    full: sendAPIRequest("/news/admin/{id}", {
      method: "get",
      parameters: {
        id: +id,
        languageCode: "sr_lt",
      },
    }),
  })
);

export default createTranslationNewsArticleLoader;

