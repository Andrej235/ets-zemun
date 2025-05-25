import { motion } from "motion/react";
import "./preview-card.scss";
import Image from "next/image";

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
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: layout === "vertical" ? 0 : layout === "image-left" ? -100 : 100,
        y: layout === "vertical" ? -30 : 0,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className={"preview-card " + layout}
    >
      <div className="image-container">
        <Image src={imagePath} alt={imageAlt} fill sizes="100%" />
      </div>

      {children}
    </motion.div>
  );
}
