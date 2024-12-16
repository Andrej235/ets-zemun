import { Target, Transition } from "motion/react";
import { RefObject } from "react";

export type ScrollAnimation = {
  initial: Target;
  whileInView: Target;
  transition: Transition;
  viewport: ViewportOptions;
};

export type ViewportOptions = {
  root?: RefObject<Element>;
  once?: boolean;
  margin?: string;
  amount?: "some" | "all" | number;
};
