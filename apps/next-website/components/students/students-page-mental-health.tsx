import { useTranslations } from "next-intl";

export default function StudentsPageMentalHealth() {
  const t = useTranslations();

  return (
    <div
      className="mental-health"
      data-search-key="mentalno-zdravlje"
    >
      <h1>{t("students.sections.mentalHealth.title")}</h1>

      <div className="mental-health-description">
        <h2>
          {t("students.sections.mentalHealth.understandingMentalHealth.title")}
        </h2>

        <p>
          {t("students.sections.mentalHealth.understandingMentalHealth.text")}
        </p>

        <p>
          <strong>
            {t(
              "students.sections.mentalHealth.understandingMentalHealth.list.0.0",
            )}
          </strong>{" "}
          {t(
            "students.sections.mentalHealth.understandingMentalHealth.list.0.1",
          )}
        </p>

        <p>
          <strong>
            {t(
              "students.sections.mentalHealth.understandingMentalHealth.list.1.0",
            )}
          </strong>{" "}
          {t(
            "students.sections.mentalHealth.understandingMentalHealth.list.1.1",
          )}
        </p>

        <p>
          <strong>
            {t(
              "students.sections.mentalHealth.understandingMentalHealth.list.2.0",
            )}
          </strong>{" "}
          {t(
            "students.sections.mentalHealth.understandingMentalHealth.list.2.1",
          )}
        </p>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.challenges.title")}</h2>

        <ul>
          <li>{t("students.sections.mentalHealth.challenges.list.0.item")}</li>
          <p className="advice">
            {t("students.sections.mentalHealth.challenges.list.0.advice")}
          </p>

          <li>{t("students.sections.mentalHealth.challenges.list.1.item")}</li>
          <p className="advice">
            {t("students.sections.mentalHealth.challenges.list.1.advice")}
          </p>

          <li>{t("students.sections.mentalHealth.challenges.list.2.item")}</li>
          <p className="advice">
            {t("students.sections.mentalHealth.challenges.list.2.advice")}
          </p>

          <li>{t("students.sections.mentalHealth.challenges.list.3.item")}</li>
          <p className="advice">
            {t("students.sections.mentalHealth.challenges.list.3.advice")}
          </p>

          <li>{t("students.sections.mentalHealth.challenges.list.4.item")}</li>
          <p className="advice">
            {t("students.sections.mentalHealth.challenges.list.4.advice")}
          </p>
        </ul>

        <p>{t("students.sections.mentalHealth.challenges.conclusion")}</p>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.symptoms.title")}</h2>

        <ul>
          <li>{t("students.sections.mentalHealth.symptoms.list.0")}</li>
          <li>{t("students.sections.mentalHealth.symptoms.list.1")}</li>
          <li>{t("students.sections.mentalHealth.symptoms.list.2")}</li>
          <li>{t("students.sections.mentalHealth.symptoms.list.3")} </li>
        </ul>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.identifyingProblems.title")}</h2>

        <ul>
          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.0")}
          </li>

          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.1")}
          </li>

          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.2")}
          </li>

          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.3")}
          </li>

          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.4")}
          </li>

          <li>
            {t("students.sections.mentalHealth.identifyingProblems.list.5")}
          </li>
        </ul>

        <p>
          {t("students.sections.mentalHealth.identifyingProblems.conclusion")}
        </p>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.impact.title")}</h2>

        <div className="mental-health-description-item">
          <h3>{t("students.sections.mentalHealth.impact.list.0.title")}</h3>
          <p>{t("students.sections.mentalHealth.impact.list.0.description")}</p>

          <ul>
            <li>{t("students.sections.mentalHealth.impact.list.0.items.0")}</li>
            <li>{t("students.sections.mentalHealth.impact.list.0.items.1")}</li>
          </ul>
        </div>

        <div className="mental-health-description-item">
          <h3>{t("students.sections.mentalHealth.impact.list.1.title")}</h3>

          <p>{t("students.sections.mentalHealth.impact.list.1.description")}</p>

          <ul>
            <li>{t("students.sections.mentalHealth.impact.list.1.items.0")}</li>
            <li>{t("students.sections.mentalHealth.impact.list.1.items.1")}</li>
          </ul>
        </div>

        <p>{t("students.sections.mentalHealth.impact.conclusion")}</p>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.support.title")}</h2>

        <div className="mental-health-description-item">
          <h3>{t("students.sections.mentalHealth.support.parent.title")}</h3>

          <p>
            {t("students.sections.mentalHealth.support.parent.description")}
          </p>

          <h3>
            {t(
              "students.sections.mentalHealth.support.parent.communicating.title",
            )}
          </h3>
          <p>
            {t(
              "students.sections.mentalHealth.support.parent.communicating.description",
            )}
          </p>

          <ul>
            <li>
              {t(
                "students.sections.mentalHealth.support.parent.communicating.list.0",
              )}
            </li>

            <li>
              {t(
                "students.sections.mentalHealth.support.parent.communicating.list.1",
              )}
            </li>

            <li>
              {t(
                "students.sections.mentalHealth.support.parent.communicating.list.2",
              )}
            </li>
          </ul>

          <h3>
            {t("students.sections.mentalHealth.support.parent.awareness.title")}
          </h3>

          <p>
            {t(
              "students.sections.mentalHealth.support.parent.awareness.description",
            )}
          </p>

          <ul>
            <li>
              {t(
                "students.sections.mentalHealth.support.parent.awareness.list.0",
              )}
            </li>

            <li>
              {t(
                "students.sections.mentalHealth.support.parent.awareness.list.1",
              )}
            </li>

            <li>
              {t(
                "students.sections.mentalHealth.support.parent.awareness.list.2",
              )}
            </li>
          </ul>

          <p>{t("students.sections.mentalHealth.support.parent.conclusion")}</p>
        </div>

        <div className="mental-health-description-item">
          <h3>{t("students.sections.mentalHealth.support.teacher.title")}</h3>

          <p>
            {t("students.sections.mentalHealth.support.teacher.description")}
          </p>
        </div>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.improving.title")}</h2>

        <p>{t("students.sections.mentalHealth.improving.description")}</p>

        <ul>
          <li>{t("students.sections.mentalHealth.improving.list.0")}</li>

          <li>{t("students.sections.mentalHealth.improving.list.1")}</li>

          <li>{t("students.sections.mentalHealth.improving.list.2")}</li>
        </ul>

        <p>{t("students.sections.mentalHealth.improving.conclusion")}</p>
      </div>

      <div className="mental-health-description">
        <h2>{t("students.sections.mentalHealth.help.title")}</h2>

        <p>{t("students.sections.mentalHealth.help.description")}</p>

        <ul>
          <li>{t("students.sections.mentalHealth.help.list.0")}</li>

          <li>{t("students.sections.mentalHealth.help.list.1")}</li>

          <li>{t("students.sections.mentalHealth.help.list.2")}</li>

          <li>{t("students.sections.mentalHealth.help.list.3")}</li>

          <li>{t("students.sections.mentalHealth.help.list.4")}</li>
        </ul>

        <p>{t("students.sections.mentalHealth.help.conclusion")}</p>
      </div>
    </div>
  );
}
