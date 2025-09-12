import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";
import localeToLangCode from "@/lib/locale-to-lang-code";

export default async function SingleProfileElectricalDevicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const profileData = await sendApiRequestSSR("/profiles/{id}", {
    method: "get",
    parameters: {
      id: 5,
      languageCode: localeToLangCode(locale),
    },
  });

  if (!profileData.isOk) throw new Error("Failed to load profile data");

  const t = await getTranslations();

  return (
    <div className="single-profile-page">
      <div className="header">
        <div className="image-container">
          <Image
            src="/images/profiles/elektromehanicar-za-rashladne-i-termicke-uredjaje.webp"
            alt="Elektromehaničar za rashladne i termičke uređaje"
            fill
          />
        </div>

        <div className="info">
          <h1>{t("educationalProfiles.electricalDevices.title")}</h1>

          <p>{t("educationalProfiles.electricalDevices.descriptionOne")}</p>

          <p>{t("educationalProfiles.electricalDevices.descriptionTwo")}</p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2>{t("educationalProfiles.electricalDevices.program.title")}</h2>

          <p>
            {t("educationalProfiles.electricalDevices.program.descriptionOne")}
          </p>

          <ul className="skills">
            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalDevices.program.installations.title"
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalDevices.program.installations.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalDevices.program.thermal.title"
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalDevices.program.thermal.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalDevices.program.cooling.title"
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalDevices.program.cooling.description"
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalDevices.program.diagnostics.title"
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalDevices.program.diagnostics.description"
                )}
              </p>
            </li>
          </ul>

          <p>
            {t("educationalProfiles.electricalDevices.program.descriptionTwo")}
          </p>
        </section>

        <section>
          <h2>
            {t(
              "educationalProfiles.electricalDevices.knowledgeApplication.title"
            )}
          </h2>

          <p>
            {t(
              "educationalProfiles.electricalDevices.knowledgeApplication.description"
            )}
          </p>
        </section>

        <section>
          <h2>{t("educationalProfiles.electricalDevices.target.title")}</h2>

          <p>{t("educationalProfiles.electricalDevices.target.description")}</p>
        </section>
      </div>

      <SingleProfileSubjectsSegment data={profileData.response!} />
    </div>
  );
}
