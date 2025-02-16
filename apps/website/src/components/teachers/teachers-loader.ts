import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const teacherLoader = createLoader(() =>
  sendAPIRequest("/teacher", {
    method: "get",
    parameters: {
      languageId: 9,
      limit: 9,
    },
  })
);

export default teacherLoader;

