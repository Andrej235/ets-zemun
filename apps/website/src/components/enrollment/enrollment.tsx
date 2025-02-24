import Icon from "@components/icon/icon";
import "./enrollment.scss";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function Enrollment() {
  const { t } = useTranslation();

  const courses = useMemo(() => {
    return [
      {
        name: t("enrollment.courses.0.name"),
        duration: t("enrollment.courses.0.duration"),
        students: 60,
        requiredPoints: 80.04,
      },
      {
        name: t("enrollment.courses.1.name"),
        duration: t("enrollment.courses.1.duration"),
        students: 60,
        requiredPoints: 69.86,
      },
      {
        name: t("enrollment.courses.2.name"),
        duration: t("enrollment.courses.2.duration"),
        students: 30,
        requiredPoints: 66.86,
      },
      {
        name: t("enrollment.courses.3.name"),
        duration: t("enrollment.courses.3.duration"),
        students: 30,
        requiredPoints: 70.69,
      },
      {
        name: t("enrollment.courses.4.name"),
        duration: t("enrollment.courses.4.duration"),
        students: 30,
        requiredPoints: 47.64,
      },
    ];
  }, [t]);

  return (
    <div className="enrollment-page">
      <h1>{t("enrollment.title")}</h1>
      <h2>{t("enrollment.description")}</h2>

      <div className="timeline">
        <div className="card">
          <h1>{t("enrollment.timeline.0.date")}</h1>
          <p>{t("enrollment.timeline.0.event")}</p>
        </div>

        <div className="card">
          <h1>{t("enrollment.timeline.1.date")}</h1>
          <p>{t("enrollment.timeline.1.event")}</p>
        </div>

        <div className="card">
          <h1>{t("enrollment.timeline.2.date")}</h1>
          <p>{t("enrollment.timeline.2.event")}</p>
        </div>

        <div className="card">
          <h1>{t("enrollment.timeline.3.date")}</h1>
          <p>{t("enrollment.timeline.3.event")}</p>
        </div>
      </div>

      <div className="enrollment-table">
        <table>
          <caption>{t("enrollment.table.caption")}</caption>
          <thead>
            <tr>
              <th>{t("enrollment.table.head.0")}</th>
              <th>{t("enrollment.table.head.1")}</th>
              <th>{t("enrollment.table.head.2")}</th>
              <th>{t("enrollment.table.head.3")}</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((program, index) => (
              <tr key={index + ""}>
                <td>{program.name}</td>
                <td>{program.duration}</td>
                <td>{program.students}</td>
                <td>{program.requiredPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="call-to-action">
        <p>{t("enrollment.callToAction.tagline")}</p>

        <a href="https://mojasrednjaskola.gov.rs/" target="_blank">
          <button>
            <p>{t("enrollment.callToAction.button")}</p>
            <Icon name="arrow-right" className="button-icon" />
          </button>
        </a>
      </div>
    </div>
  );
}

