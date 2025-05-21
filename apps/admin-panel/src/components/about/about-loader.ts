import sendAPIRequest from "@shared/api-dsl/send-api-request";

const aboutLoader = () =>
  sendAPIRequest("/users/me/role", {
    method: "get",
  }).then((x) => (x.code === "200" ? x.content : null));

export default aboutLoader;
