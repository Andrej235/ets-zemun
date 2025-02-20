import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const newsLoader = createLoader(() =>
  sendAPIRequest("/news", {
    method: "get",
    parameters: {
      languageCode: "sr_lt",
      limit: 9,
    },
  })
);

export default newsLoader;

