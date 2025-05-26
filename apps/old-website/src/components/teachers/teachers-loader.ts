import sendAPIRequest from "@/api-dsl/send-api-request";
import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n.ts";

const teacherLoader = createLoader(() =>
  sendAPIRequest("/teachers", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  }),
);

export default teacherLoader;
