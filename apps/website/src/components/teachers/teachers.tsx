import "./teachers.scss";
import Async from "@better-router/async";
import useLoader from "@better-router/use-loader";
import teacherLoader from "@components/teachers/teachers-loader";

export default function Teachers() {
  const loaderData = useLoader<typeof teacherLoader>();

  return (
    <div className="teachers-page">
      <h1>Nastavnici</h1>

      <div className="teacher-cards-container">
        <Async await={loaderData}>
          {(teachers) => {
            console.log(teachers);

            return null;
          }}
        </Async>
      </div>
    </div>
  );
}

