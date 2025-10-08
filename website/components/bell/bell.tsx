import "./bell.scss";
import { getTranslations } from "next-intl/server";

export default async function Useful({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div id="useful-page">
      <section>
        <h1>{t("bell.header")}</h1>
        <div className="enrollment-table">
          <table>
            <thead>
              <tr>
                <th>{t("bell.table.header.0")}</th>
                <th>{t("bell.table.header.1")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("bell.table.content.0.0")}</td>
                <td>{t("bell.table.content.0.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.1.0")}</td>
                <td>{t("bell.table.content.1.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.2.0")}</td>
                <td>{t("bell.table.content.2.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.3.0")}</td>
                <td>{t("bell.table.content.3.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.4.0")}</td>
                <td>{t("bell.table.content.4.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.5.0")}</td>
                <td>{t("bell.table.content.5.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.6.0")}</td>
                <td>{t("bell.table.content.6.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.7.0")}</td>
                <td>{t("bell.table.content.7.1")}</td>
              </tr>
              <tr>
                <td>{t("bell.table.content.8.0")}</td>
                <td>{t("bell.table.content.8.1")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
