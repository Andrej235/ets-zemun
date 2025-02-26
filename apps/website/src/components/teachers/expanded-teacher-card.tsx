import useOutsideClick from "@hooks/use-outside-click";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

type ExpandedTeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onRequestClose: () => void;
};

export default function ExpandedTeacherCard({
  teacher,
  onRequestClose,
}: ExpandedTeacherCardProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, onRequestClose);

  function transformTime(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    const endMinutes = (minutes + 45) % 60;
    const endHours = hours + Math.floor((minutes + 45) / 60);

    return `${hours}:${minutes
      .toString()
      .padStart(2, "0")}-${endHours}:${endMinutes.toString().padStart(2, "0")}`;
  }

  return (
    <div className="overlay">
      <div
        className="teacher-card expanded"
        key={teacher.id}
        ref={containerRef}
      >
        <img src={teacher.image} alt={teacher.name} className="teacher-image" />

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

        <div className="expanded-info-container">
          {teacher.qualifications.map((qualification) => (
            <p key={qualification.id}>{qualification.name}</p>
          ))}

          {teacher.startOfOpenOfficeHoursFirstShift &&
            transformTime(teacher.startOfOpenOfficeHoursFirstShift)}

          {teacher.startOfOpenOfficeHoursSecondShift &&
            transformTime(teacher.startOfOpenOfficeHoursSecondShift)}
        </div>
      </div>
    </div>
  );
}

