import useLoader from "@/better-router/use-loader";
import fullTeacherLoader from "./full-teacher-loader";
import Async from "@/better-router/async";

export default function FullTeacher() {
  const loaderData = useLoader<typeof fullTeacherLoader>();

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "OK") return null;
        const teacher = data.content;

        return (
          <div>
            <h1>{teacher.name}</h1>
            <p>{teacher.bio}</p>
            <img src={teacher.image} alt={teacher.name} />
          </div>
        );
      }}
    </Async>
  );
}

