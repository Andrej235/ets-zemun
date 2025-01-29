import { ScrollAnimation } from "./scroll-animation-type";

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

export default scrollAnimationFlyInLeft;
