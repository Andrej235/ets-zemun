import createLoader from "@better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import i18n from "../../i18n";

const teacherLoader = createLoader(() =>
  sendAPIRequest("/teacher", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  })
);

export default teacherLoader;

