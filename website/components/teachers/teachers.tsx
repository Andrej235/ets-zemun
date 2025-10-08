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

  const leadership: Schema<"TeacherResponseDto">[] = [
    {
      id: 1,
      name: t("teachers.staff.1.name"),
      title: t("teachers.staff.1.title"),
      bio: "direktor@ets-zemun.edu.rs",
      email: "",
      image: "/images/teachers/radulovic.png",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 2,
      name: t("teachers.staff.2.name"),
      title: t("teachers.staff.2.title"),
      bio: "",
      email: "",
      image: "",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 3,
      name: t("teachers.staff.3.name"),
      title: t("teachers.staff.3.title"),
      bio: "",
      email: "sekretar@ets-zemun.edu.rs",
      image: "/images/teachers/stojkovic.jpg",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 4,
      name: t("teachers.staff.4.name"),
      title: t("teachers.staff.4.title"),
      bio: "",
      email: "rac@ets-zemun.edu.rs",
      image: "",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 5,
      name: t("teachers.staff.5.name"),
      title: t("teachers.staff.5.title"),
      bio: "",
      email: "ppsluzba@ets-zemun.edu.rs",
      image: "",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 6,
      name: t("teachers.staff.6.name"),
      title: t("teachers.staff.6.title"),
      bio: "",
      email: "ppsluzba@ets-zemun.edu.rs",
      image: "",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
    {
      id: 7,
      name: t("teachers.staff.7.name"),
      title: t("teachers.staff.7.title"),
      bio: "",
      email: "",
      image: "/images/teachers/nedic.jpg",
      startOfOpenOfficeHoursFirstShift: null,
      startOfOpenOfficeHoursSecondShift: null,
      qualifications: [],
      subjects: [],
    },
  ];

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

        <div className="leadership">
          <div className="leadership-header">
            <h2>{t("teachers.leadership")}</h2>
          </div>
          <div className="teacher-cards-container">
            <AnimatePresence mode="popLayout">
              {leadership.map((data) => (
                <TeacherCard teacher={data} key={data.id} onSelect={() => {}} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <h2>Nastavnici</h2>
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
