import { useEffect, useState } from "react";
import useLoader from "@/better-router/use-loader";
import LazyAwaitedList from "@/components/lazy-loaded-list/lazy-awaited-list";
import teacherLoader from "@/components/teachers/teachers-loader";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useTranslations } from "next-intl";
import ExpandedTeacherCard from "./expanded-teacher-card";
import TeacherCard from "./teacher-card";
import "./teachers.scss";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();
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
      <div
        className="teachers-page"
        data-search-key="nastavnici"
      >
        <h1>{t("teachers.title")}</h1>

        <div className="teacher-cards-container">
          <LazyAwaitedList
            data={loaderData}
            success="200"
            skeleton={Array.from({ length: 9 }).map((_, i) => (
              <div className="teacher-card" key={"skeleton_" + i}></div>
            ))}
          >
            {(data) => {
              return (
                <TeacherCard
                  teacher={data}
                  key={data.id}
                  onSelect={() => setSelectedTeacher(data)}
                />
              );
            }}
          </LazyAwaitedList>
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
