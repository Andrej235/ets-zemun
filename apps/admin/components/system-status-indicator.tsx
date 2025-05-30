"use client";
import { motion } from "motion/react";
import { ServiceStatus } from "./system-status";

type ServiceStatusIndicatorProps = {
  status: ServiceStatus;
  emptyThreshold?: number;
};

function lerpColor(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

export default function ServiceStatusIndicator({
  status,
  emptyThreshold = 5000,
}: ServiceStatusIndicatorProps) {
  const t =
    status.status === "down"
      ? 1
      : Math.min(Math.max(status.delay / emptyThreshold, 0), 1);

  const green = [14, 165, 14];
  const yellow = [255, 221, 0];
  const red = [241, 29, 29];

  const [r, g, b] =
    t < 0.5
      ? lerpColor(green, yellow, t / 0.5)
      : lerpColor(yellow, red, (t - 0.5) / 0.5);

  const bgColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <motion.div
      className="h-2 w-full origin-left rounded-full"
      style={{
        backgroundColor: bgColor,
      }}
      initial={{
        scaleX: 0,
      }}
      animate={{
        scaleX: status.status === "down" ? 1 : 1 - t,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
    />
  );
}
