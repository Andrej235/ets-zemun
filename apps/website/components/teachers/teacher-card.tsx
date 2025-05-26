import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useTranslations } from "next-intl";
import Image from "next/image";

type TeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onSelect: () => void;
};

function TeacherCard({ teacher, onSelect }: TeacherCardProps) {
  const t = useTranslations();

  function truncateBio(bio: string): string {
    const words = bio.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return bio;
  }

  const displayedSubjects = teacher.subjects.slice(0, 3);
  const hasMoreSubjects = teacher.subjects.length > 3;

  return (
    <button className="teacher-card" onClick={onSelect}>
      <div className="teacher-image">
        <Image src={teacher.image} alt={teacher.name} fill />
      </div>

      <div className="teacher-card-header">
        <h2>{teacher.name}</h2>
        <p>{teacher.title}</p>
      </div>

      <div className="basic-info">
        <p>{truncateBio(teacher.bio)}</p>
        <ul className="subjects">
          <p>{t("teachers.subjects")}</p>
          {displayedSubjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
          {hasMoreSubjects && <li>...</li>}
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
