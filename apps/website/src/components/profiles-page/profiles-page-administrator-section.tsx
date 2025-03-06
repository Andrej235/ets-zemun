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

export default function ProfilesPageAdministratorSection({
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
        title="Administrator računarskih mreža"
        image="/images/profiles/administrator-racunarskih-mreza.jpg"
        description="Administrator računarskih mreža
            je obrazovni profil osmišljen za učenike koji
            žele da se specijalizuju u oblasti računarskih
            mreža, administriranja mreža, sigurnosti na
            mrežama, web programiranja, i rada sa bazama
            podataka. <br /> Nakon završetka školovanja, 
            učenici mogu da se zaposle u firmama koje 
            poseduju umrežene računare ili nastave dalje 
            školovanje na višim školama i fakultetima tehničkog usmerenja."
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />

      <div className="profiles-button-container">
        <motion.div
          {...getAnimation(layout)}
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/administrator-racunarskih-mreza"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

