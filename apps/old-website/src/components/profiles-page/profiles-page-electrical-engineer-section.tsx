import Icon from "@/components/icon/icon";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { useTranslation } from "node_modules/react-i18next";
import { Link } from "react-router";

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageElectricalEngineerSection({
  layout,
}: SchoolPreviewCardProps) {
  const { t } = useTranslation();

  return (
    <div className="profiles-page-section">
      <SchoolPreviewCard
        title={t("educationalProfiles.electricalEngineer.title")}
        image="/images/profiles/elektrotehnicar-racunara.jpg"
        description={
          t("educationalProfiles.electricalEngineer.descriptionOne") +
          "</br>" +
          t("educationalProfiles.electricalEngineer.descriptionTwo")
        }
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />
      <div className="profiles-button-container">
        <div
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektrotehnicar-racunara"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
