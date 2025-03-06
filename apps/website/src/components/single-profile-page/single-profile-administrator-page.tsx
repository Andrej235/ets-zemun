import Async from "@better-router/async";
import useLoader from "@better-router/use-loader";
import useOutsideClick from "@hooks/use-outside-click";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import SingleProfilePageLoader from "./single-profile-page-loader";
import "./single-profile-page.scss";
import SubjectOverlay from "./subject-overlay";
import { useTranslation } from "react-i18next";

export default function SingleProfileITPage() {
  const loaderData = useLoader<typeof SingleProfilePageLoader>();

  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<{
    subject: Schema<"ProfileSubjectResponseDto">;
    type: "general" | "vocational";
  } | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const selectedSubjectRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectedSubjectRef, () => {
    setSelectedSubject(null);
  });

  function getYearName(year: number) {
    switch (year) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
    }
  }

  return (
    <div className="single-profile-page">
      <div className={"overlay" + (selectedSubject ? " active" : "")}>
        {selectedSubject && (
          <SubjectOverlay
            key={selectedSubject.subject.subjectId}
            subject={selectedSubject.subject}
            type={selectedSubject.type}
            ref={selectedSubjectRef}
          />
        )}
      </div>

      <div className="header">
        <div className="image-container">
          <img
            src="/images/profiles/administrator-racunarskih-mreza.jpg"
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

      <div className="subjects-container">
        <Async await={loaderData}>
          {(response) => {
            if (response.code !== "200") return null;

            const subjects = response.content;

            const mapped = subjects.generalSubjects
              .filter((x) => x.year === selectedYear)
              .map((x) => ({
                ...x,
                type: "general" as "general" | "vocational",
              }))
              .concat(
                subjects.vocationalSubjects
                  .filter((x) => x.year === selectedYear)
                  .map((x) => ({
                    ...x,
                    type: "vocational",
                  }))
              );

            return (
              <>
                <div className="year-selector">
                  {Array.from(
                    [
                      ...new Set(
                        [
                          ...subjects.generalSubjects,
                          ...subjects.vocationalSubjects,
                        ].map((x) => x.year)
                      ),
                    ].map((year) => (
                      <button
                        key={year}
                        className={selectedYear === year ? "selected" : ""}
                        onClick={() => handleYearChange(year)}
                      >
                        <p>{getYearName(year)}</p>
                      </button>
                    ))
                  )}
                </div>

                <div className="subjects-list">
                  <AnimatePresence mode="popLayout">
                    {mapped.map((x) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                        layoutId={x.subject.name}
                        key={x.subject.name}
                        className={"subject-item " + x.type}
                        onClick={() => {
                          setSelectedSubject({
                            subject: x,
                            type: x.type,
                          });
                        }}
                        whileHover={{ y: "-1rem" }}
                      >
                        <p className="subject-name">{x.subject.name}</p>
                        <p className="subject-count">{x.perWeek}x nedeljno</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            );
          }}
        </Async>
      </div>
    </div>
  );
}

