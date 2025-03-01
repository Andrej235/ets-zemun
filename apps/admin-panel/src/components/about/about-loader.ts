import sendAPIRequest from "@shared/api-dsl/send-api-request";

const aboutLoader = () =>
  sendAPIRequest("/auth/user", {
    method: "get",
  }).then((x) => (x.code === "200" ? x.content : null));

export default aboutLoader;

