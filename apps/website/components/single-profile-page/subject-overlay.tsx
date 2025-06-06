import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { forwardRef } from "react";
import { useTranslations } from "next-intl";

type SubjectItemProps = {
  readonly subject: Schema<"ProfileSubjectResponseDto">;
  readonly type: "general" | "vocational";
};

const SubjectOverlay = forwardRef<HTMLDivElement, SubjectItemProps>(
  ({ subject, type }, ref) => {
    const t = useTranslations();

    return (
      <div className={"full-screen-subject-container subject-item"} ref={ref}>
        <p className={`subject-name`}>
          <div className="subject-name-text">{subject.subject.name}</div>
          <div className={`subject-${type}`}>
            {type === "general"
              ? t("educationalProfiles.subjects.types.general")
              : t("educationalProfiles.subjects.types.vocational")}
          </div>
        </p>
        <p className="subject-count">
          {subject.perWeek}x {t("educationalProfiles.subjects.types.weeks")}
        </p>
        <p className="subject-description">{subject.subject.description}</p>
      </div>
    );
  },
);

SubjectOverlay.displayName = "SubjectOverlay";
export default SubjectOverlay;
