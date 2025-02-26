import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullTeacherLoader = createLoader(({ params: { id } }) => ({
  teacher: sendAPIRequest("/teacher/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  }),
  subjects: sendAPIRequest("/subject", {
    method: "get",
    parameters: {
      languageCode: i18n.language,
      limit: 9,
    },
  }),
}));

export default fullTeacherLoader;

