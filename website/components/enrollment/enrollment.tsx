import Icon from "@/components/icon/icon";
import { getTranslations } from "next-intl/server";
import "./enrollment.scss";
import Image from "next/image";

export default async function Enrollment({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({
    locale,
  });

  const courses = [
    {
      name: t("enrollment.courses.0.name"),
      duration: t("enrollment.courses.0.duration"),
      students: 56,
      requiredPoints: 70.91,
    },
    {
      name: t("enrollment.courses.1.name"),
      duration: t("enrollment.courses.1.duration"),
      students: 84,
      requiredPoints: 75.34,
    },
    {
      name: t("enrollment.courses.2.name"),
      duration: t("enrollment.courses.2.duration"),
      students: 54,
      requiredPoints: 70.5,
    },
    {
      name: t("enrollment.courses.3.name"),
      duration: t("enrollment.courses.3.duration"),
      students: 25,
      requiredPoints: 70.0,
    },
    {
      name: t("enrollment.courses.4.name"),
      duration: t("enrollment.courses.4.duration"),
      students: 28,
      requiredPoints: 46.44,
    },
  ];

  return (
    <div className="enrollment-page" data-search-key="upis-i-prijem">
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

      <div className="announcement">
        <h1>{t("enrollment.announcement.header")}</h1>
        <p>{t("enrollment.announcement.announcement.0")}</p>
        <h3>{t("enrollment.announcement.listHeader")}</h3>
        <ul>
          <li>{t("enrollment.announcement.list.0")}</li>
          <li>{t("enrollment.announcement.list.1")}</li>
        </ul>
        <p>{t("enrollment.announcement.text")}</p>

        <Image
          src="/images/announcement-table.webp"
          alt={t("enrollment.announcement.tableAlt")}
          width={1200}
          height={1600}
          unoptimized
        />
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
