import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const languageLoader = createLoader(() =>
  sendAPIRequest("/language", {
    method: "get",
  })
);

export default languageLoader;

