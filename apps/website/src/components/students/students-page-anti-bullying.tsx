import Icon from "@components/icon/icon";
import { useTranslation } from "react-i18next";

export default function StudentsPageAntiBullying() {
  const { t } = useTranslation();

  return (
    <div
      className="anti-bullying"
      searchKey={{
        id: "nasilje",
        keywords: "searchKeys.bullying.keywords",
        title: "searchKeys.bullying.title",
        url: "/ucenici",
      }}
    >
      <h1>{t("students.sections.bullying.title")}</h1>

      <div className="anti-bullying-description">
        <p>{t("students.sections.bullying.description.0")}</p>
        <p>{t("students.sections.bullying.description.1")}</p>

        <a
          className="anti-bullying-link"
          href="/documents/prijava-nasilja.pdf"
          target="_blank"
        >
          <p>{t("students.sections.bullying.description.2")}</p>
          <Icon name="arrow-right" />
        </a>
      </div>

      <h2>{t("students.sections.bullying.sos.title")}</h2>
      <ul>
        <li>{t("students.sections.bullying.sos.data.0")}</li>
        <li>{t("students.sections.bullying.sos.data.1")}</li>
        <li>{t("students.sections.bullying.sos.data.2")}</li>
        <li>{t("students.sections.bullying.sos.data.3")}</li>
        <li>{t("students.sections.bullying.sos.data.4")}</li>
        <li>{t("students.sections.bullying.sos.data.5")}</li>
      </ul>

      <h2>{t("students.sections.bullying.antiBullying.title")}</h2>
      <div className="anti-bullying-description">
        <p>{t("students.sections.bullying.antiBullying.data.0")}</p>
        <br />
        <p>{t("students.sections.bullying.antiBullying.data.1")}</p>
        <br />
        <p>{t("students.sections.bullying.antiBullying.data.2")}</p>
        <br />
        <p>{t("students.sections.bullying.antiBullying.data.3")}</p>
      </div>

      <h2>{t("students.sections.bullying.platforms.title")}</h2>
      <ul>
        <li>{t("students.sections.bullying.platforms.data.0")}</li>
        <li>{t("students.sections.bullying.platforms.data.1")}</li>
        <li>
          <a
            href="https://cuvamte.gov.rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{t("students.sections.bullying.platforms.data.2")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>
      </ul>

      <h2>{t("students.sections.bullying.support.title")}</h2>
      <ul>
        <li>
          <a href="/documents/support/1.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.0")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/2.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.1")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/3.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.2")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/4.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.3")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/5.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.4")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/6.pdf" target="_blank">
            <p>{t("students.sections.bullying.support.data.5")}</p>
            <Icon name="arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  );
}

