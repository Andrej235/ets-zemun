import { motion } from "motion/react";
import "./profile-preview.scss";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";
import scrollAnimationFlyInTop from "../../motion-animation-presets/scroll-animation-fly-in-top";
import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import { Link } from "react-router";

type Layout = "image-left" | "image-right" | "vertical";

type ProfileOverviewProps = {
  readonly profile: ProfileOverviewSchema;
  readonly layout: Layout;
};

export default function ProfileOverview({
  profile,
  layout,
}: ProfileOverviewProps) {
  function getAnimation(layout: Layout) {
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

  function getInfoClassname(layout: Layout) {
    switch (layout) {
      case "image-left":
        return "info-right";
      case "image-right":
        return "info-left";
      case "vertical":
      default:
        return "vertical";
    }
  }

  return (
    <motion.div
      {...getAnimation(layout)}
      className={"profile-overview " + layout}
      viewport={{
        once: true,
        amount: 0.3,
      }}
    >
      <div className="image-container">
        <img src={profile.imagePath} alt={profile.name} />
      </div>

      <div className={`info ${getInfoClassname(layout)}`}>
        <Link to={`/profili/${profile.profileURL[0]}`}>
          <h1 className="title">{profile.name}</h1>
        </Link>

        <p className="description">{profile.description}</p>
      </div>
    </motion.div>
  );
}

