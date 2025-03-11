import SchoolPreviewCard from "@components/school-preview-card/school-preview-card";
import { motion } from "motion/react";
import { Link } from "react-router";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInTop from "../../motion-animation-presets/scroll-animation-fly-in-top";
import Icon from "@components/icon/icon";

type SchoolPreviewCardProps = {
  readonly layout: string;
};

export default function ProfilesPageElectricalEngineerSection({
  layout,
}: SchoolPreviewCardProps) {
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
        title="Elektromehaničar za rashladne i termičke uređaje"
        image="/images/profiles/elektromehanicar-za-rashladne-i-termicke-uredjaje.jpg"
        description="Elektromehaničar za rashladne i termičke uređaje je obrazovni profil trećeg stepena koji priprema učenike za rad na montaži, održavanju i popravci rashladnih, termičkih i klima uređaja. <br />
            Nakon završetka školovanja, učenici će biti osposobljeni za projektovanje i čitanje elektrošema, dijagnostiku i popravku kvarova, montažu i servisiranje klima i rashladnih uređaja, kao i korišćenje odgovarajuće tehničke dokumentacije."
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

