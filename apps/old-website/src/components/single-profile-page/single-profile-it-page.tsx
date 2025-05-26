import { useTranslation } from "node_modules/react-i18next";
import "./single-profile-page.scss";
import SingleProfileSubjectsSegment from "./single-profile-subjects-segment";

export default function SingleProfileITPage() {
  const { t } = useTranslation();

  return (
    <div className="single-profile-page">
      <div className="header">
        <div className="image-container">
          <img
            src="/images/profiles/elektrotehnicar-informacionih-tehnologija.jpg"
            alt="Placeholder"
          />
        </div>

        <div className="info">
          <h1>{t("educationalProfiles.it.title")}</h1>

          <p>{t("educationalProfiles.it.descriptionOne")}</p>

          <p>{t("educationalProfiles.it.descriptionTwo")}</p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2> {t("educationalProfiles.it.program.title")}</h2>

          <p>{t("educationalProfiles.it.program.descriptionOne")}</p>

          <ul className="skills">
            <li>
              <h2>{t("educationalProfiles.it.program.programming.title")}</h2>
              <p>
                {t("educationalProfiles.it.program.programming.description")}
              </p>
            </li>

            <li>
              <h2>{t("educationalProfiles.it.program.web.title")}</h2>
              <p>{t("educationalProfiles.it.program.web.description")}</p>
            </li>

            <li>
              <h2>{t("educationalProfiles.it.program.database.title")}</h2>
              <p>{t("educationalProfiles.it.program.database.description")}</p>
            </li>

            <li>
              <h2>{t("educationalProfiles.it.program.network.title")}</h2>
              <p>{t("educationalProfiles.it.program.network.description")}</p>
            </li>

            <li>
              <h2>{t("educationalProfiles.it.program.hardware.title")}</h2>
              <p>{t("educationalProfiles.it.program.hardware.description")}</p>
            </li>
          </ul>

          <p>{t("educationalProfiles.it.program.descriptionTwo")}</p>
        </section>

        <section>
          <h2>{t("educationalProfiles.it.knowledgeApplication.title")}</h2>

          <p>{t("educationalProfiles.it.knowledgeApplication.description")}</p>
        </section>

        <section>
          <h2>{t("educationalProfiles.it.target.title")}</h2>

          <p>{t("educationalProfiles.it.target.description")}</p>
        </section>
      </div>

      <SingleProfileSubjectsSegment />
    </div>
  );
}
