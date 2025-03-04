import Async from "@better-router/async";
import LazyLoadedList from "@components/lazy-loaded-list/lazy-loaded-list";
import ExpandedTeacherCard from "@components/teachers/expanded-teacher-card";
import TeacherCard from "@components/teachers/teacher-card";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { APIResponse } from "@shared/api-dsl/types/endpoints/response-parser";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type SubjectItemProps = {
  readonly subject: Schema<"ProfileSubjectResponseDto">;
  readonly type: "general" | "vocational";
  readonly onLayoutAnimationComplete: () => void;
};

const SubjectOverlay = forwardRef<HTMLDivElement, SubjectItemProps>(
  ({ subject, type, onLayoutAnimationComplete }, ref) => {
    const sentRequest = useRef(false);
    const [fullSubject, setFullSubject] = useState<Promise<
      APIResponse<"/subject/{id}", "get">
    > | null>(null);
    const [selectedTeacher, setSelectedTeacher] =
      useState<Schema<"TeacherResponseDto"> | null>(null);

    const {
      i18n: { language },
    } = useTranslation();

    useEffect(() => {
      if (sentRequest.current) return;

      sentRequest.current = true;

      setFullSubject(
        sendAPIRequest("/subject/{id}", {
          method: "get",
          parameters: {
            id: subject.subjectId,
            languageCode: language,
          },
        })
      );
    }, [subject, language]);

    return (
      <motion.div
        layout
        layoutId={subject.subject.name}
        className={"full-screen-subject-container subject-item " + type}
        ref={ref}
        onLayoutAnimationComplete={onLayoutAnimationComplete}
      >
        <motion.p layout className="subject-name">
          {subject.subject.name}
        </motion.p>
        <motion.p className="subject-count" layout>
          {subject.perWeek}x nedeljno
        </motion.p>

        <div className="subject-teachers">
          {fullSubject && (
            <Async await={fullSubject}>
              {(response) => {
                if (response.code !== "200") return null;

                return (
                  <div className="teachers">
                    <LazyLoadedList response={response.content.teachers}>
                      {(teacher) => (
                        <TeacherCard
                          onSelect={() => setSelectedTeacher(teacher)}
                          teacher={teacher}
                          key={teacher.id}
                        />
                      )}
                    </LazyLoadedList>
                  </div>
                );
              }}
            </Async>
          )}
        </div>

        {selectedTeacher && (
          <ExpandedTeacherCard
            teacher={selectedTeacher}
            onRequestClose={() => setSelectedTeacher(null)}
            key={selectedTeacher.id}
          />
        )}
      </motion.div>
    );
  }
);

export default SubjectOverlay;

