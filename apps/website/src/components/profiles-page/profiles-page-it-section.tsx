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

export default function ProfilesPageITSection({
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
        title="Elektrotehnicar informacionih tehnologija"
        image="/images/profiles/elektrotehnicar-informacionih-tehnologija.jpg"
        description="Elektrotehničar informacionih tehnologija je savremeni obrazovni
            profil osmišljen za učenike koji žele da se specijalizuju u oblasti
            informacionih tehnologija, koja predstavlja osnovu današnjeg
            digitalnog društva.<br />
            Nakon završetka školovanja, učenici su spremni da nastave
            obrazovanje na fakultetima tehničkih usmerenja ili da započnu
            karijeru u IT industriji na pozicijama poput junior programera,
            mrežnog tehničara ili administratora baza podataka."
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />
      <div className="profiles-button-container">
        <motion.div
          {...getAnimation(layout)}
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektrotehnicar-informacionih-tehnologija"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

