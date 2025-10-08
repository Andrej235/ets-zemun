"use client";

import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { forwardRef } from "react";

type TeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onSelect: () => void;
};

const TeacherCard = forwardRef<HTMLDivElement, TeacherCardProps>(
  ({ teacher, onSelect }: TeacherCardProps, ref) => {
    const t = useTranslations();

    function truncateBio(bio: string): string {
      const words = bio.split(" ");
      if (words.length > 20) {
        return words.slice(0, 20).join(" ") + "...";
      }
      return bio;
    }

    const displayedSubjects = teacher.subjects.slice(0, 4);
    const hasMoreSubjects = teacher.subjects.length > 4;

    return (
      <motion.div
        ref={ref}
        className="teacher-card"
        onClick={onSelect}
        layout
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
      >
        <div className="teacher-card-inner">
          <div className="teacher-image-container">
            <div className="teacher-image">
              <Image
                src={teacher.image || "/placeholder.svg"}
                alt={teacher.name}
                fill
              />
            </div>
          </div>

          <div className="teacher-card-content">
            <div className="teacher-card-header">
              <h2>{teacher.name}</h2>
              <p className="teacher-title">{teacher.title}</p>
            </div>

            <div className="teacher-bio">
              <p>{truncateBio(teacher.bio)}</p>
            </div>

            {teacher.subjects && teacher.subjects.length > 0 && (
              <div className="subjects-section">
                <h4 className="subjects-title">{t("teachers.subjects")}</h4>
                <div className="subjects-tags">
                  {displayedSubjects.map((subject) => (
                    <span key={subject.id} className="subject-tag">
                      {subject.name}
                    </span>
                  ))}
                  {hasMoreSubjects && (
                    <span className="subject-tag more-subjects">
                      +{teacher.subjects.length - 4} {t("teachers.more")}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="teacher-card-footer">
              <div className="contact-info">
                <a
                  className="email-link"
                  href={`mailto:${teacher.email}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {teacher.email}
                </a>
              </div>

              <button className="view-profile-btn">
                {t("teachers.viewProfile")}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

TeacherCard.displayName = "TeacherCard";
export default TeacherCard;
