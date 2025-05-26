import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import useOutsideClick from "@/hooks/use-outside-click";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState, useEffect } from "react";
import { useTranslation } from "node_modules/react-i18next";
import SubjectOverlay from "./subject-overlay";
import { SingleProfilePageLoader } from "./single-profile-page-loader";
export default function SingleProfileSubjectsSegment() {
  const loaderData = useLoader<SingleProfilePageLoader>();
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<{
    subject: Schema<"ProfileSubjectResponseDto">;
    type: "general" | "vocational";
  } | null>(null);

  useEffect(() => {
    if (selectedSubject) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selectedSubject]);

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

  const mappedData: Promise<
    {
      subjects: {
        type: "general" | "vocational";
        subjectId: number;
        subject: {
          id: number;
          name: string;
          description: string;
        };
        perWeek: number;
        year: number;
      }[];
      year: number;
    }[]
  > = useMemo(
    () =>
      loaderData.then((response) => {
        if (response.code !== "200") return [];

        const years = [
          ...new Set(
            [
              ...response.content.generalSubjects,
              ...response.content.vocationalSubjects,
            ].map((x) => x.year),
          ),
        ];

        return years.map((year) => ({
          year,
          subjects: response.content.generalSubjects
            .filter((x) => x.year === year)
            .map((x) => ({
              ...x,
              type: "general" as "general" | "vocational",
            }))
            .concat(
              response.content.vocationalSubjects
                .filter((x) => x.year === year)
                .map((x) => ({
                  ...x,
                  type: "vocational",
                })),
            ),
        }));
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loaderData, t],
  );

  return (
    <>
      <div className="subjects-container">
        <Async await={mappedData}>
          {(data) => {
            return (
              <>
                <div className="year-selector">
                  {data
                    .map((x) => x.year)
                    .map((year) => (
                      <button
                        key={year}
                        className={selectedYear === year ? "selected" : ""}
                        onClick={() => handleYearChange(year)}
                      >
                        <p>{getYearName(year)}</p>
                      </button>
                    ))}
                </div>

                <div className="subjects-list">
                  <AnimatePresence mode="popLayout">
                    {data
                      .filter((x) => x.year === selectedYear)[0]
                      ?.subjects?.map((x) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                          layoutId={"subject-" + x.subject.id}
                          key={"subject-" + x.subject.id}
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
    </>
  );
}
