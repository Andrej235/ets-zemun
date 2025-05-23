import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { getLocale, getTranslations } from "next-intl/server";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";
import Image from "next/image";

export default async function SingleProfileNetworkAdminPage() {
  const locale = await getLocale();
  const profileData = await sendApiRequestSSR("/profiles/{id}", {
    method: "get",
    parameters: {
      id: 2,
      languageCode: locale === "srl" ? "sr_lt" : locale,
    },
  });

  if (!profileData.isOk) throw new Error("Failed to load profile data");

  const t = await getTranslations();

  return (
    <div className="single-profile-page">
      <div className="header">
        <div className="image-container">
          <Image
            src="/images/profiles/administrator-racunarskih-mreza.jpg"
            alt="Administrator računarskih mreža"
            fill
          />
        </div>

        <div className="info">
          <h1>{t("educationalProfiles.administrator.title")}</h1>

          <p>{t("educationalProfiles.administrator.descriptionOne")}</p>

          <p>{t("educationalProfiles.administrator.descriptionTwo")}</p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2>{t("educationalProfiles.administrator.program.title")}</h2>

          <p>{t("educationalProfiles.administrator.program.descriptionOne")}</p>

          <ul className="skills">
            <li>
              <h2>
                {t("educationalProfiles.administrator.program.network.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.network.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.security.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.security.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.hardware.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.hardware.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.administrator.program.operatingSystems.title"
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.operatingSystems.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.database.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.database.description"
                )}
              </p>
            </li>
          </ul>

          <p>{t("educationalProfiles.administrator.program.descriptionTwo")}</p>
        </section>

        <section>
          <h2>
            {t("educationalProfiles.administrator.knowledgeApplication.title")}
          </h2>

          <p>
            {t(
              "educationalProfiles.administrator.knowledgeApplication.description"
            )}
          </p>
        </section>

        <section>
          <h2>{t("educationalProfiles.administrator.target.title")}</h2>

          <p>{t("educationalProfiles.administrator.target.description")}</p>
        </section>
      </div>

      <SingleProfileSubjectsSegment data={profileData.response!} />
    </div>
  );
}
