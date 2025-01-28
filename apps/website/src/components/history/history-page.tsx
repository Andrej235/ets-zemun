import { useMemo } from "react";
import History from "./history";
import HistorySegment from "./history-segment";

export default function HistoryPage() {
  const history = useMemo(
    () => (
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

        <HistorySegment date={new Date()}>
          <h1>History segment 4</h1>
        </HistorySegment>

        <HistorySegment date={new Date()}>
          <h1>History segment 5</h1>
        </HistorySegment>

        <HistorySegment date={new Date()}>
          <h1>History segment 6</h1>
        </HistorySegment>

        <HistorySegment date={new Date()}>
          <h1>History segment 7</h1>
        </HistorySegment>

        <HistorySegment date={new Date()}>
          <h1>History segment 8</h1>
        </HistorySegment>

        <HistorySegment date={new Date()}>
          <h1>History segment 9</h1>
        </HistorySegment>
      </History>
    ),
    []
  );

  return history;
}

