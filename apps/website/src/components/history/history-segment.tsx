type HistorySegmentProps = {
  readonly date: Date;
  readonly children: React.ReactNode;
};

export default function HistorySegment({
  date,
  children,
}: HistorySegmentProps) {
  return (
    <div data-date={date.toLocaleDateString()} className="history-segment">
      {children}
    </div>
  );
}

