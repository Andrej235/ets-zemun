import { useLoaderData } from "react-router";
import "./class-page.scss";
import ClassSchema from "src/assets/json-data/ts-schemas/class.schema";

export default function ClassPage() {
  const classData = useLoaderData() as ClassSchema;

  return (
    <div className="class-page">
      <h1>{classData.name}</h1>
      <p>{classData.description}</p>
      {classData.skillsEarned?.map((skill) => (
        <div className="skill" key={skill.name}>
          <h1>{skill.name}</h1>
          <p>{skill.description}</p>
        </div>
      ))}
    </div>
  );
}
