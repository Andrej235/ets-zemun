import "./preview-card.scss";
import { motion } from "motion/react";
import scrollAnimationFlyInLeft from "../../motion-animation-presets/scroll-animation-fly-in-left";
import scrollAnimationFlyInRight from "../../motion-animation-presets/scroll-animation-fly-in-right";
import scrollAnimationFlyInTop from "../../motion-animation-presets/scroll-animation-fly-in-top";

export type PreviewCardLayout = "image-left" | "image-right" | "vertical";

type PreviewCardProps = {
  readonly layout: PreviewCardLayout;
  readonly imagePath: string;
  readonly imageAlt: string;
  readonly children: React.ReactNode;
};

export default function PreviewCard({
  layout,
  imagePath,
  children,
  imageAlt,
}: PreviewCardProps) {
  function getAnimation(layout: PreviewCardLayout) {
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
    <motion.div
      {...getAnimation(layout)}
      className={"preview-card " + layout}
      viewport={{
        once: true,
        amount: 0.3,
      }}
    >
      <div className="image-container">
        <img src={imagePath} alt={imageAlt} />
      </div>

      {children}
    </motion.div>
  );
}

