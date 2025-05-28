"use client";
import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useTranslations } from "next-intl";
import { useEffect, useState, useMemo } from "react";
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
          <p className="teachers-subtitle">
            Meet our dedicated educators who are passionate about shaping the
            future
          </p>
        </div>

        <div className="teachers-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search teachers..."
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
              <option value="">All Subjects</option>
              {allSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="teacher-cards-container">
          {filteredTeachers.map((data) => (
            <TeacherCard
              teacher={data}
              key={data.id}
              onSelect={() => setSelectedTeacher(data)}
            />
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="no-results">
            <p>No teachers found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedTeacher && (
        <ExpandedTeacherCard
          teacher={selectedTeacher}
          onRequestClose={() => setSelectedTeacher(null)}
        />
      )}
    </>
  );
}
