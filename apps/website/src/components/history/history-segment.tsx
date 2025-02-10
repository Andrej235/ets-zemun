import { motion } from "motion/react";

type HistorySegmentProps = {
  readonly date: Date | string;
  readonly children: React.ReactNode;
};

export default function HistorySegment({
  date,
  children,
}: HistorySegmentProps) {
  return (
    <motion.div
      data-date={typeof date === "string" ? date : date.toLocaleDateString()}
      className="history-segment"
    >
      {children}
    </motion.div>
  );
}

