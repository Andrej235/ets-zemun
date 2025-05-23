import Icon from "@/components/icon/icon";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";;

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageElectricalAutomaticsSection({
  layout,
}: SchoolPreviewCardProps) {
  const t = useTranslations();

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
            href={"/profili/elektrotehnicar-automatike"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
