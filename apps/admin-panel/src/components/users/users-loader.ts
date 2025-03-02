import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const userLoader = createLoader(() =>
  sendAPIRequest("/auth/user/all", {
    method: "get",
    parameters: {
      limit: 15,
    },
  })
);

export default userLoader;
