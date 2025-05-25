import Icon from "@/components/icon/icon";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import "./profiles-page.scss";

export default async function ProfilesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale });

  return (
    <div className="profiles-page" data-search-key="obrazovni-profili">
      <div className="profiles-page-section">
        <SchoolPreviewCard
          title={t("educationalProfiles.it.title")}
          image="/images/profiles/elektrotehnicar-informacionih-tehnologija.webp"
          description={
            t("educationalProfiles.it.descriptionOne") +
            "</br>" +
            t("educationalProfiles.it.descriptionTwo")
          }
          layout={"image-left"}
        />
        <div className="profiles-button-container">
          <div className={"button-left"}>
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

      <div className="profiles-page-section">
        <SchoolPreviewCard
          title={t("educationalProfiles.administrator.title")}
          image="/images/profiles/administrator-racunarskih-mreza.webp"
          description={
            t("educationalProfiles.administrator.descriptionOne") +
            "</br>" +
            t("educationalProfiles.administrator.descriptionTwo")
          }
          layout={"image-right"}
        />

        <div className="profiles-button-container">
          <div className={"button-right"}>
            <Link
              className="button-link"
              href={"/profili/administrator-racunarskih-mreza"}
            >
              <p>Saznaj vise</p>
              <Icon className="learn-icon" name="arrow-right" />
            </Link>
          </div>
        </div>
      </div>

      <div className="profiles-page-section">
        <SchoolPreviewCard
          title={t("educationalProfiles.electricalEngineer.title")}
          image="/images/profiles/elektrotehnicar-racunara.webp"
          description={
            t("educationalProfiles.electricalEngineer.descriptionOne") +
            "</br>" +
            t("educationalProfiles.electricalEngineer.descriptionTwo")
          }
          layout={"image-left"}
        />
        <div className="profiles-button-container">
          <div className={"button-left"}>
            <Link
              className="button-link"
              href={"/profili/elektrotehnicar-racunara"}
            >
              <p>Saznaj vise</p>
              <Icon className="learn-icon" name="arrow-right" />
            </Link>
          </div>
        </div>
      </div>

      <div className="profiles-page-section">
        <SchoolPreviewCard
          title={t("educationalProfiles.electricalAutomatics.title")}
          image="/images/profiles/elektrotehnicar-automatike.webp"
          description={
            t("educationalProfiles.electricalAutomatics.descriptionOne") +
            "</br>" +
            t("educationalProfiles.electricalAutomatics.descriptionTwo")
          }
          layout={"image-right"}
        />

        <div className="profiles-button-container">
          <div className={"button-right"}>
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

      <div className="profiles-page-section">
        <SchoolPreviewCard
          title={t("educationalProfiles.electricalDevices.title")}
          image="/images/profiles/elektromehanicar-za-rashladne-i-termicke-uredjaje.webp"
          description={
            t("educationalProfiles.electricalDevices.descriptionOne") +
            "</br>" +
            t("educationalProfiles.electricalDevices.descriptionTwo")
          }
          layout={"image-left"}
        />
        <div className="profiles-button-container">
          <div className={"button-left"}>
            <Link
              className="button-link"
              href={
                "/profili/elektromehanicar-za-rashladne-i-termicke-uredjaje"
              }
            >
              <p>Saznaj vise</p>
              <Icon className="learn-icon" name="arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
