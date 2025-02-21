import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const editNewsArticleLoader = createLoader(({ params: { id } }) => ({
  preview: sendAPIRequest("/news/{id}/preview", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: "sr_lt",
    },
  }),
  full: sendAPIRequest("/news/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: "sr_lt",
    },
  }),
}));

export default editNewsArticleLoader;

