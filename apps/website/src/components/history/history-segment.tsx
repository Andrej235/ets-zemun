import { motion } from "motion/react";

type HistorySegmentProps = {
  readonly date: Date;
  readonly children: React.ReactNode;
};

export default function HistorySegment({
  date,
  children,
}: HistorySegmentProps) {
  return (
    <motion.div
      data-date={date.toLocaleDateString()}
      className="history-segment"
    >
      {children}
    </motion.div>
  );
}

