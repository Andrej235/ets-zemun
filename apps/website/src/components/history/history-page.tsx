import History from "./history";
import HistorySegment from "./history-segment";

export default function HistoryPage() {
  return (
    <History>
      <HistorySegment date={new Date()}>
        <h1>History segment 1</h1>
      </HistorySegment>

      <HistorySegment date={new Date()}>
        <h1>History segment 2</h1>
      </HistorySegment>

      <HistorySegment date={new Date()}>
        <h1>History segment 3</h1>
      </HistorySegment>
    </History>
  );
}

