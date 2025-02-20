import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullNewsArticleLoader = createLoader(({ params: { id } }) =>
  sendAPIRequest("/news/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: "sr_lt",
    },
  })
);

export default fullNewsArticleLoader;
