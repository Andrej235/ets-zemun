import { useTranslation } from "react-i18next";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";

export default function SingleProfileElectricalDevicesPage() {
  const { t } = useTranslation();

  return (
    <div className="single-profile-page">
      <div className="header">
        <div className="image-container">
          <img
            src="/images/profiles/elektromehanicar-za-rashladne-i-termicke-uredjaje.jpg"
            alt="Elektromehaničar za rashladne i termičke uređaje"
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
      
      <SingleProfileSubjectsSegment />
    </div>
  );
}

