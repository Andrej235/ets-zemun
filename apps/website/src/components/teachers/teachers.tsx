import "./teachers.scss";
import useLoader from "@better-router/use-loader";
import teacherLoader from "@components/teachers/teachers-loader";
import LazyAwaitedList from "@components/lazy-loaded-list/lazy-awaited-list";
import TeacherCard from "./teacher-card";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import ExpandedTeacherCard from "./expanded-teacher-card";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();
  const { t } = useTranslation();

  const [selectedTeacher, setSelectedTeacher] =
    useState<Schema<"TeacherResponseDto"> | null>(null);

  return (
    <>
      <div
        className="teachers-page"
        searchKey={{
          id: "nastavnici",
          keywords: "searchKeys.teachers.keywords",
          title: "searchKeys.teachers.title",
          url: "/nastavnici",
        }}
      >
        <h1>{t("teachers.title")}</h1>

        <div className="teacher-cards-container">
          <LazyAwaitedList data={loaderData} success="OK">
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

