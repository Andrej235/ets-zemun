import sendAPIRequest from "@shared/api-dsl/send-api-request";

const aboutLoader = () =>
  sendAPIRequest("/auth/user", {
    method: "get",
  }).then((x) => (x.code === "OK" ? x.content : null));

export default aboutLoader;

