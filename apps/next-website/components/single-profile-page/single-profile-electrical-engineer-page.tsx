import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";

export default async function SingleProfileElectricalEngineerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const profileData = await sendApiRequestSSR("/profiles/{id}", {
    method: "get",
    parameters: {
      id: 3,
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
            src="/images/profiles/elektrotehnicar-racunara.webp"
            alt="Elektrotehničar računara"
            fill
          />
        </div>

        <div className="info">
          <h1>{t("educationalProfiles.electricalEngineer.title")}</h1>

          <p>{t("educationalProfiles.electricalEngineer.descriptionOne")}</p>

          <p>{t("educationalProfiles.electricalEngineer.descriptionTwo")}</p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2>{t("educationalProfiles.electricalEngineer.program.title")}</h2>

          <p>
            {t("educationalProfiles.electricalEngineer.program.descriptionOne")}
          </p>

          <ul className="skills">
            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalEngineer.program.programming.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalEngineer.program.programming.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.electricalEngineer.program.web.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalEngineer.program.web.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalEngineer.program.database.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalEngineer.program.database.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalEngineer.program.network.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalEngineer.program.network.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalEngineer.program.hardware.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalEngineer.program.hardware.description",
                )}
              </p>
            </li>
          </ul>

          <p>
            {t("educationalProfiles.electricalEngineer.program.descriptionTwo")}
          </p>
        </section>

        <section>
          <h2>
            {t(
              "educationalProfiles.electricalEngineer.knowledgeApplication.title",
            )}
          </h2>

          <p>
            {t(
              "educationalProfiles.electricalEngineer.knowledgeApplication.description",
            )}
          </p>
        </section>

        <section>
          <h2>{t("educationalProfiles.electricalEngineer.target.title")}</h2>

          <p>
            {t("educationalProfiles.electricalEngineer.target.description")}
          </p>
        </section>
      </div>

      <SingleProfileSubjectsSegment data={profileData.response!} />
    </div>
  );
}
