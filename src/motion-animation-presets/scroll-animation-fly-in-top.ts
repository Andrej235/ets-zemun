import { ScrollAnimation } from "./scroll-animation-type";

const scrollAnimationFlyInTop: ScrollAnimation = {
  initial: {
    opacity: 0,
    y: -30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
  },
  viewport: {
    once: true,
  },
};

export default scrollAnimationFlyInTop;
