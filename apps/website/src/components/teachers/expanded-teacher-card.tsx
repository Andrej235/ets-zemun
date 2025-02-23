import useOutsideClick from "@hooks/use-outside-click";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { motion } from "motion/react";
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

  return (
    <div className="overlay">
      <motion.div
        className="teacher-card expanded"
        layout
        layoutId={String(teacher.id)}
        key={teacher.id}
        ref={containerRef}
      >
        <motion.img
          layout
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

        <motion.div layout className="expanded-section"></motion.div>
      </motion.div>
    </div>
  );
}

