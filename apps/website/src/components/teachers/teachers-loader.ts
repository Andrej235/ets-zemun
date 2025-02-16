import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const teacherLoader = createLoader(() => {
  return {
    teachers: sendAPIRequest("/teacher", {
      method: "get",
      parameters: {
        languageId: 9,
        limit: 9,
      },
    }),
    test: new Promise((r) => {
      setTimeout(() => {
        r(1);
      }, 3000);
    }),
  };
});

export default teacherLoader;

