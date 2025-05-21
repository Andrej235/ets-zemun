import { useTranslation } from "react-i18next";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";

export default function SingleProfileNetworkAdminPage() {
  const { t } = useTranslation();

  return (
    <div className="single-profile-page">
      <div className="header">
        <div className="image-container">
          <img
            src="/images/profiles/administrator-racunarskih-mreza.jpg"
            alt="Administrator računarskih mreža"
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
                  "educationalProfiles.administrator.program.network.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.security.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.security.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.hardware.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.hardware.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t(
                  "educationalProfiles.administrator.program.operatingSystems.title",
                )}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.operatingSystems.description",
                )}
              </p>
            </li>

            <li>
              <h2>
                {t("educationalProfiles.administrator.program.database.title")}
              </h2>
              <p>
                {t(
                  "educationalProfiles.administrator.program.database.description",
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
              "educationalProfiles.administrator.knowledgeApplication.description",
            )}
          </p>
        </section>

        <section>
          <h2>{t("educationalProfiles.administrator.target.title")}</h2>

          <p>{t("educationalProfiles.administrator.target.description")}</p>
        </section>
      </div>

      <SingleProfileSubjectsSegment />
    </div>
  );
}
