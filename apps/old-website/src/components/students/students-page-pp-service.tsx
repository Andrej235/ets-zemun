import { useTranslation } from "node_modules/react-i18next";

export default function StudentsPagePPService() {
  const { t } = useTranslation();

  return (
    <div
      className="pp-service"
      searchKey={{
        id: "pp-sluzba",
        keywords: "searchKeys.ppService.keywords",
        title: "searchKeys.ppService.title",
        url: "/ucenici",
      }}
    >
      <h1>{t("students.sections.ppService.title")}</h1>
      <div className="pp-service-description">
        <p>
          {t("students.sections.ppService.description.0")}{" "}
          <b>{t("students.sections.ppService.description.1")}</b>{" "}
          {t("students.sections.ppService.description.2")}{" "}
          <b>{t("students.sections.ppService.description.3")}</b>{" "}
          {t("students.sections.ppService.description.4")}
        </p>
      </div>

      <h2>{t("students.sections.ppService.reachOut")}</h2>
      <ul>
        <li>
          <b>{t("students.sections.ppService.reachOutList.0.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.0.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.1.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.1.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.2.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.2.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.3.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.3.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.4.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.4.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.5.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.5.1")}
        </li>
        <li>
          <b>{t("students.sections.ppService.reachOutList.6.0")}</b>{" "}
          {t("students.sections.ppService.reachOutList.6.1")}
        </li>
        <li>{t("students.sections.ppService.reachOutList.7.0")}</li>
        <li>{t("students.sections.ppService.reachOutList.8.0")}</li>
      </ul>

      <div className="pp-service-description">
        <p>{t("students.sections.ppService.moreInfo")}</p>
      </div>

      <h2>{t("students.sections.ppService.helpOutsideOfSchool.title")}</h2>
      <ul>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.0")}
        </li>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.1")}
        </li>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.2")}
        </li>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.3")}
        </li>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.4")}
        </li>
        <li>
          {t("students.sections.ppService.helpOutsideOfSchool.options.5")}
        </li>
      </ul>
    </div>
  );
}
