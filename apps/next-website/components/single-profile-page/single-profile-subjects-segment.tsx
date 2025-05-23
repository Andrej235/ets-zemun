"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import useOutsideClick from "@/hooks/use-outside-click";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import SubjectOverlay from "./subject-overlay";

type SingleProfileSubjectsSegmentProps = {
  data: Schema<"EducationalProfileResponseDto">;
};

export default function SingleProfileSubjectsSegment({
  data,
}: SingleProfileSubjectsSegmentProps) {
  const t = useTranslations();

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

  const mappedData: {
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
  }[] = useMemo(
    () => {
      const years = [
        ...new Set(
          [...data.generalSubjects, ...data.vocationalSubjects].map(
            (x) => x.year
          )
        ),
      ];

      return years.map((year) => ({
        year,
        subjects: data.generalSubjects
          .filter((x) => x.year === year)
          .map((x) => ({
            ...x,
            type: "general" as "general" | "vocational",
          }))
          .concat(
            data.vocationalSubjects
              .filter((x) => x.year === year)
              .map((x) => ({
                ...x,
                type: "vocational",
              }))
          ),
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, t]
  );

  return (
    <>
      <div className="subjects-container">
        <div className="year-selector">
          {mappedData
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
            {mappedData
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
