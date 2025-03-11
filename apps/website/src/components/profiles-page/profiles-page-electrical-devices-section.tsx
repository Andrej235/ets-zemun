import Icon from "@components/icon/icon";
import SchoolPreviewCard from "@components/school-preview-card/school-preview-card";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInTop from "../../motion-animation-presets/scroll-animation-fly-in-top";

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageElectricalEngineerSection({
  layout,
}: SchoolPreviewCardProps) {
  const { t } = useTranslation();

  function getAnimation(layout: string) {
    switch (layout) {
      case "image-left":
        return scrollAnimationFlyInLeft;
      case "image-right":
        return scrollAnimationFlyInRight;
      case "vertical":
      default:
        return scrollAnimationFlyInTop;
    }
  }

  return (
    <div className="profiles-page-section">
      <SchoolPreviewCard
        title={t("educationalProfiles.electricalDevices.title")}
        image="/images/profiles/elektromehanicar-za-rashladne-i-termicke-uredjaje.jpg"
        description={
          t("educationalProfiles.electricalDevices.descriptionOne") +
          "</br>" +
          t("educationalProfiles.electricalDevices.descriptionTwo")
        }
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />
      <div className="profiles-button-container">
        <motion.div
          {...getAnimation(layout)}
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektromehanicar-za-rashladne-i-termicke-uredjaje"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

