import { motion } from "motion/react";
import "./ProfileOverview.scss";
import { ScrollAnimation } from "../About/About";

type ProfileOverviewProps = {
  name: string;
  briefDescription: string;
  image: string;
  layout: "image-left" | "image-right";
};

const scrollAnimationFlyInLeft: ScrollAnimation = {
  initial: {
    opacity: 0,
    x: -100,
  },
  whileInView: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
  },
  viewport: {
    once: true,
  },
};

const scrollAnimationFlyInRight: ScrollAnimation = {
  initial: {
    opacity: 0,
    x: 100,
  },
  whileInView: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
  },
  viewport: {
    once: true,
  },
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
