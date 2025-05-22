import createLoader from "@/better-router/create-loader";
import i18n from "@/i18n.ts";
import sendAPIRequest from "@/api-dsl/send-api-request";

export type SingleProfilePageLoader = ReturnType<
  typeof singleProfilePageLoaderCreator
>;

const singleProfilePageLoaderCreator = (id: number) =>
  createLoader(() => {
    return sendAPIRequest("/profiles/{id}", {
      method: "get",
      parameters: {
        id,
        languageCode: i18n.language,
      },
    });
  });

const singleProfilePageLoaderIT = singleProfilePageLoaderCreator(1);
const singleProfilePageLoaderAdministrator = singleProfilePageLoaderCreator(2);
const singleProfilePageLoaderEngineer = singleProfilePageLoaderCreator(3);
const singleProfilePageLoaderAutomatics = singleProfilePageLoaderCreator(4);
const singleProfilePageLoaderACs = singleProfilePageLoaderCreator(5);

export {
  singleProfilePageLoaderACs,
  singleProfilePageLoaderAdministrator,
  singleProfilePageLoaderAutomatics,
  singleProfilePageLoaderEngineer,
  singleProfilePageLoaderIT,
};
