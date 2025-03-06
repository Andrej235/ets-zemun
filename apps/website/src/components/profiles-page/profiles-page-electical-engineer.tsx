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

export default function ProfilesPageElecticalEngineerSection({
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
        title="Elektrotehničar računara"
        image="/images/profiles/elektrotehnicar-racunara.jpg"
        description="Elektrotehničar računara je obrazovni profil koji priprema učenike za rad na hardveru i softveru računara. Ovaj profil omogućava učenicima da steknu potrebna znanja i veštine za konfiguraciju, održavanje, dijagnostiku i popravku računara, kao i za razvoj i implementaciju softverskih aplikacija. <br />
            Nakon završetka školovanja, učenici će biti osposobljeni za programiranje na popularnim programskim jezicima, razvoj desktop i web aplikacija, rad sa bazama podataka, implementaciju i održavanje računarskih mreža, kao i za administraciju mrežnih operativnih sistema."
        layout={layout === "image-left" ? "image-left" : "image-right"}
      />
      <div className="profiles-button-container">
        <motion.div
          {...getAnimation(layout)}
          className={layout === "image-left" ? "button-left" : "button-right"}
        >
          <Link
            className="button-link"
            to={"/profili/elektrotehnicar-racunara"}
          >
            <p>Saznaj vise</p>
            <Icon className="learn-icon" name="arrow-right" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

