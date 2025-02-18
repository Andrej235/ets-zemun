import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";

type TeacherCardProps = {
  teacher: Schema<"TeacherResponseDto">;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <img src={teacher.image} alt={teacher.name} className="teacher-image" />

      <div className="teacher-card-header">
        <h2>{teacher.name}</h2>
        <p>{teacher.title}</p>
      </div>

      <div className="basic-info">
        <p>{teacher.bio}</p>
        <ul className="subjects">
          <p>Predmeti: </p>
          {teacher.subjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </div>

      <a className="email" href={`mailto:${teacher.email}`}>
        {teacher.email}
      </a>
    </div>
  );
};

export default TeacherCard;

