import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const appLoader = createLoader(() =>
  sendAPIRequest("/auth/user", {
    method: "get",
  })
);

export default appLoader;

