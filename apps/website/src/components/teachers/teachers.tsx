import "./teachers.scss";
import useLoader from "@better-router/use-loader";
import teacherLoader from "@components/teachers/teachers-loader";
import LazyAwaitedList from "@components/lazy-loaded-list/lazy-awaited-list";
import TeacherCard from "./teacher-card";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();

  return (
    <div className="teachers-page">
      <h1>Nastavnici</h1>

      <div className="teacher-cards-container">
        <LazyAwaitedList data={loaderData} success="OK">
          {(data) => {
            return <TeacherCard teacher={data} key={data.id} />;
          }}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

