import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const fullSubjectLoader = createLoader(({ params: { id } }) => ({
  translations: {
    sr: sendAPIRequest("/subject/{id}", {
      method: "get",
      parameters: {
        id: +id,
        languageCode: "sr",
      },
    }),
    en: sendAPIRequest("/subject/{id}", {
      method: "get",
      parameters: {
        id: +id,
        languageCode: "en",
      },
    }),
    sr_lt: sendAPIRequest("/subject/{id}", {
      method: "get",
      parameters: {
        id: +id,
        languageCode: "sr_lt",
      },
    }),
  },
  teachers: sendAPIRequest("/subject/{id}", {
    method: "get",
    parameters: {
      id: +id,
      languageCode: i18n.language,
    },
  }),
}));

export default fullSubjectLoader;

