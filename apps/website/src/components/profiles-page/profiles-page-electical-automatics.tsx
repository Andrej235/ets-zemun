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

export default function ProfilesPageElecticalAutomaticsSection({
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
        title="Elektrotehničar automatike"
        image="/images/profiles/elektrotehnicar-automatike.jpg"
        description="Elektrotehničar automatike je obrazovni profil koji priprema učenike za rad u industriji, sa fokusom na automatske proizvodne procese i regulaciju fizičkih veličina kao što su temperatura, nivo, protok i slične. <br /> Nakon završetka školovanja, učenici će biti osposobljeni za montažu, nadzor i rukovanje sistemima mernih i regulacionih uređaja, rad sa računarskim sistemima za prikupljanje i obradu podataka, kao i za upravljanje industrijskim robotima i automatizovanim transportnim sistemima."
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />

      <div className="profiles-button-container">
        <motion.div
          {...getAnimation(layout)}
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektrotehnicar-automatike"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

