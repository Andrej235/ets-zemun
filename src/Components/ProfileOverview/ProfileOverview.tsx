import { motion } from "motion/react";
import "./ProfileOverview.scss";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";
import scrollAnimationFlyInTop from "../../motion-animation-presets/scroll-animation-fly-in-top";
import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import { Link } from "react-router";

type ProfileOverviewProps = {
  profile: ProfileOverviewSchema;
  layout: "image-left" | "image-right" | "vertical";
};

export default function ProfileOverview({
  profile,
  layout,
}: ProfileOverviewProps) {
  return (
    <motion.div
      {...(layout === "image-left"
        ? scrollAnimationFlyInLeft
        : layout === "image-right"
        ? scrollAnimationFlyInRight
        : scrollAnimationFlyInTop)}
      className={"profile-overview " + layout}
      viewport={{
        once: true,
        amount: 0.3,
      }}
    >
      <div className="image-container">
        <img src={profile.imagePath} alt={profile.name} />
      </div>

      <div className="info">
        <Link to={`/profili/${profile.profileURL[0]}`}>
          <h1 className="title">{profile.name}</h1>
        </Link>

        <p className="description">{profile.description}</p>
      </div>
    </motion.div>
  );
}
