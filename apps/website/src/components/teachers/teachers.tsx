import "./teachers.scss";
import Async from "@better-router/async";
import useLoader from "@better-router/use-loader";
import teacherLoader from "@components/teachers/teachers-loader";
import TeacherCard from "./teacher-card";
import LazyLoadedList from "@components/lazy-loaded-list/lazy-loaded-list";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();

  return (
    <div className="teachers-page">
      <h1>Nastavnici</h1>

      <div className="teacher-cards-container">
        <Async await={loaderData}>
          {(teachers) => {
            if (teachers.code !== "OK") return null;

            return (
              <LazyLoadedList response={teachers.content}>
                {(x) => <TeacherCard key={x.id} teacher={x} />}
              </LazyLoadedList>
            );
          }}
        </Async>
      </div>
    </div>
  );
}

