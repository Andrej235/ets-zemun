import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullTeacherLoader = createLoader(({ params: { id } }) =>
  sendAPIRequest("/teacher/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  })
);

export default fullTeacherLoader;

