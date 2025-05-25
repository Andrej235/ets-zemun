"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
        <h1>{t("teachers.title")}</h1>

        <div className="teacher-cards-container">
          {teachers.map((data) => (
            <TeacherCard
              teacher={data}
              key={data.id}
              onSelect={() => setSelectedTeacher(data)}
            />
          ))}
        </div>
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
