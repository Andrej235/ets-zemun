import Icon from "@/components/icon/icon";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageITSection({
  layout,
}: SchoolPreviewCardProps) {
  const t = useTranslations();

  return (
    <div className="profiles-page-section">
      <SchoolPreviewCard
        title={t("educationalProfiles.it.title")}
        image="/images/profiles/elektrotehnicar-informacionih-tehnologija.jpg"
        description={
          t("educationalProfiles.it.descriptionOne") +
          "</br>" +
          t("educationalProfiles.it.descriptionTwo")
        }
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />
      <div className="profiles-button-container">
        <div
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            href={"/profili/elektrotehnicar-informacionih-tehnologija"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
