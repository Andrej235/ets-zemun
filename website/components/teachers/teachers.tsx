"use client";
import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import ExpandedTeacherCard from "./expanded-teacher-card";
import TeacherCard from "./teacher-card";
import "./teachers.scss";

type TeachersProps = {
  teachers: Schema<"TeacherResponseDto">[];
};

export default function Teachers({ teachers }: TeachersProps) {
  const t = useTranslations();

  const [selectedTeacher, setSelectedTeacher] =
    useState<Schema<"TeacherResponseDto"> | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Get all unique subjects for filtering
  const allSubjects = useMemo(() => {
    const subjects = new Set<string>();
    teachers.forEach((teacher) => {
      teacher.subjects.forEach((subject) => {
        subjects.add(subject.name);
      });
    });
    return Array.from(subjects).sort();
  }, [teachers]);

  // Filter teachers based on search and subject
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        selectedSubject === "" ||
        teacher.subjects.some((subject) => subject.name === selectedSubject);

      return matchesSearch && matchesSubject;
    });
  }, [teachers, searchTerm, selectedSubject]);

  useEffect(() => {
    if (selectedTeacher) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTeacher]);

  return (
    <>
      <div className="teachers-page" data-search-key="nastavnici">
        <div className="teachers-header">
          <h1>{t("teachers.title")}</h1>
          <p className="teachers-subtitle">{t("teachers.description")}</p>
        </div>

        <div className="teachers-filters-container">
          <div className="teachers-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder={t("teachers.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-container">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="subject-filter"
              >
                <option value="">{t("teachers.allSubjects")}</option>
                {allSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p>
            {t("teachers.results", {
              filtered: filteredTeachers.length,
              total: teachers.length,
            })}
          </p>
        </div>

        <div className="teacher-cards-container">
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((data) => (
              <TeacherCard
                teacher={data}
                key={data.id}
                onSelect={() => setSelectedTeacher(data)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTeachers.length === 0 && (
          <div className="no-results">
            <p>{t("teachers.noResults")}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedTeacher && (
          <ExpandedTeacherCard
            teacher={selectedTeacher}
            onRequestClose={() => setSelectedTeacher(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
