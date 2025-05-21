import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const userLoader = createLoader(() =>
  sendAPIRequest("/users/all", {
    method: "get",
    parameters: {},
  }),
);

export default userLoader;
