"use client";
import useOutsideClick from "@/hooks/use-outside-click";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type ExpandedTeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onRequestClose: () => void;
};

export default function ExpandedTeacherCard({
  teacher,
  onRequestClose,
}: ExpandedTeacherCardProps) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, onRequestClose);

  return (
    <div className="overlay">
      <div className="teacher-card-expanded-wrapper" ref={containerRef}>
        <div className="teacher-card-expanded" key={teacher.id}>
          <div className="teacher-image">
            <Image src={teacher.image} alt={teacher.name} fill />
          </div>

          <div className="teacher-card-header">
            <h2>{teacher.name}</h2>
            <p>{teacher.title}</p>
          </div>

          <div className="basic-info">
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
        </div>
        <div className="expanded-info-container">
          <div className="bio">
            <p className="bio-h">{t("teachers.bio")}</p>
            <p>{teacher.bio}</p>
          </div>
          <div className="qualification">
            <p className="qualification-h">{t("teachers.qualifications")}</p>
            {teacher.qualifications.map((qualification) => (
              <p key={qualification.id}>{qualification.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
