import { motion } from "motion/react";

type HistorySegmentProps = {
  readonly date: Date;
  readonly children: React.ReactNode;
};

export default function HistorySegment({
  date,
  children,
  ...props
}: HistorySegmentProps) {
  return (
    <motion.div
      data-date={date.toLocaleDateString()}
      animate={{
        opacity: 0,
        x: "even" in props && props.even ? -200 : 200,
      }}
      className="history-segment"
    >
      {children}
    </motion.div>
  );
}

