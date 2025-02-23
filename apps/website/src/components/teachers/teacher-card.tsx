import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

type TeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onSelect: () => void;
};

function TeacherCard({ teacher, onSelect }: TeacherCardProps) {
  const { t } = useTranslation();

  return (
    <motion.button
      className="teacher-card"
      layout
      onClick={onSelect}
      layoutId={String(teacher.id)}
    >
      <motion.img
        src={teacher.image}
        alt={teacher.name}
        className="teacher-image"
      />

      <motion.div layout className="teacher-card-header">
        <h2>{teacher.name}</h2>
        <p>{teacher.title}</p>
      </motion.div>

      <motion.div layout className="basic-info">
        <p>{teacher.bio}</p>
        <ul className="subjects">
          <p>{t("teachers.subjects")}</p>
          {teacher.subjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </motion.div>

      <motion.a layout className="email" href={`mailto:${teacher.email}`}>
        {teacher.email}
      </motion.a>
    </motion.button>
  );
}

export default TeacherCard;

