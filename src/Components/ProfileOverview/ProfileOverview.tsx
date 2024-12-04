import { motion } from "motion/react";
import "./ProfileOverview.scss";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";

type ProfileOverviewProps = {
  name: string;
  briefDescription: string;
  image: string;
  layout: "image-left" | "image-right";
};

export default function ProfileOverview({
  briefDescription,
  image,
  name,
  layout,
}: ProfileOverviewProps) {
  return (
    <motion.div
      {...(layout !== "image-left"
        ? scrollAnimationFlyInRight
        : scrollAnimationFlyInLeft)}
      className={"profile-overview " + layout}
      viewport={{
        once: true,
        amount: 0.3,
      }}
    >
      <div className="image-container">
        <img src={image} alt={name} />
      </div>

      <div className="info">
        <h1 className="title">{name}</h1>
        <p className="description">{briefDescription}</p>
      </div>
    </motion.div>
  );
}
