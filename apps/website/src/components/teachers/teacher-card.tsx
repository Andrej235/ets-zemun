import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useTranslation } from "react-i18next";

type TeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onSelect: () => void;
};

function TeacherCard({ teacher, onSelect }: TeacherCardProps) {
  const { t } = useTranslation();

  return (
    <button
      className="teacher-card"
      onClick={onSelect}
    >
      <img
        src={teacher.image}
        alt={teacher.name}
        className="teacher-image"
      />

      <div className="teacher-card-header">
        <h2>{teacher.name}</h2>
        <p>{teacher.title}</p>
      </div>

      <div className="basic-info">
        <p>{teacher.bio}</p>
        <ul className="subjects">
          <p>{t("teachers.subjects")}</p>
          {teacher.subjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </div>

      <a className="email" href={`mailto:${teacher.email}`}>
        {teacher.email}
      </a>

      <div className="expanded-content-container" />
    </button>
  );
}

export default TeacherCard;

