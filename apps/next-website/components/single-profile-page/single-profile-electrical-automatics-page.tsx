import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";

export default async function SingleProfileElectricalAutomaticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const profileData = await sendApiRequestSSR("/profiles/{id}", {
    method: "get",
    parameters: {
      id: 4,
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
            src="/images/profiles/elektrotehnicar-automatike.webp"
            alt="Elektrotehničar automatike"
            fill
          />
        </div>

        <div className="info">
          <h1>{t("educationalProfiles.electricalAutomatics.title")}</h1>

          <p>{t("educationalProfiles.electricalAutomatics.descriptionOne")}</p>

          <p>{t("educationalProfiles.electricalAutomatics.descriptionTwo")}</p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2>{t("educationalProfiles.electricalAutomatics.program.title")}</h2>

          <p>
            {t(
              "educationalProfiles.electricalAutomatics.program.descriptionOne",
            )}
          </p>

          <ul className="skills">
            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalAutomatics.program.automation.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalAutomatics.program.automation.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalAutomatics.program.robotics.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalAutomatics.program.robotics.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalAutomatics.program.network.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalAutomatics.program.network.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.electricalAutomatics.program.measurement.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.electricalAutomatics.program.measurement.description",
                )}
              </p>
            </li>
          </ul>

          <p>
            {t(
              "educationalProfiles.electricalAutomatics.program.descriptionTwo",
            )}
          </p>
        </section>

        <section>
          <h2>
            {t(
              "educationalProfiles.electricalAutomatics.knowledgeApplication.title",
            )}
          </h2>

          <p>
            {t(
              "educationalProfiles.electricalAutomatics.knowledgeApplication.description",
            )}
          </p>
        </section>

        <section>
          <h2>{t("educationalProfiles.electricalAutomatics.target.title")}</h2>

          <p>
            {t("educationalProfiles.electricalAutomatics.target.description")}
          </p>
        </section>
      </div>

      <SingleProfileSubjectsSegment data={profileData.response!} />
    </div>
  );
}
