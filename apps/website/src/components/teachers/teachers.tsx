import "./teachers.scss";
import useLoader from "@better-router/use-loader";
import teacherLoader from "@components/teachers/teachers-loader";
import LazyAwaitedList from "@components/lazy-loaded-list/lazy-awaited-list";
import TeacherCard from "./teacher-card";
import { useTranslation } from "react-i18next";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();
  const { t } = useTranslation();

  return (
    <div className="teachers-page">
      <h1>{t("teachers.title")}</h1>

      <div className="teacher-cards-container">
        <LazyAwaitedList
          data={loaderData}
          success="OK"
          skeleton={Array.from({ length: 9 }).map((_, i) => (
            <div className="teacher-card" key={"skeleton_" + i}></div>
          ))}
        >
          {(data) => {
            return <TeacherCard teacher={data} key={data.id} />;
          }}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

