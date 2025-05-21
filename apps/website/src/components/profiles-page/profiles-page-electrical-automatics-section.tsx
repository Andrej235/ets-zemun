import Icon from "@/components/icon/icon";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageElectricalAutomaticsSection({
  layout,
}: SchoolPreviewCardProps) {
  const { t } = useTranslation();

  return (
    <div className="profiles-page-section">
      <SchoolPreviewCard
        title={t("educationalProfiles.electricalAutomatics.title")}
        image="/images/profiles/elektrotehnicar-automatike.jpg"
        description={
          t("educationalProfiles.electricalAutomatics.descriptionOne") +
          "</br>" +
          t("educationalProfiles.electricalAutomatics.descriptionTwo")
        }
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />

      <div className="profiles-button-container">
        <div
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektrotehnicar-automatike"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}

