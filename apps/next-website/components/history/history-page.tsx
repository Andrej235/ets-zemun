"use client";
import { useMemo } from "react";
import History from "./history";
import HistorySegment from "./history-segment";
import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const t = useTranslations();

  const history = useMemo(
    () => (
      <History
        timelineConfig={{
          animateOnlyOnce: true,
          corderArcRadius: 15,
          timelineStyle: {
            "768px": "left",
          },
        }}
      >
        <HistorySegment date={"1887."}>
          <h1>{t("history.segments.0.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.0.description.0")}</p>
            <p>{t("history.segments.0.description.1")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1949."}>
          <h1>{t("history.segments.1.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.1.description.0")}</p>
            <p>{t("history.segments.1.description.1")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={new Date("05.10.1954.")}>
          <h1>{t("history.segments.2.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.2.description.0")}</p>
            <p>{t("history.segments.2.description.1")}</p>
            <p>{t("history.segments.2.description.2")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1960."}>
          <h1>{t("history.segments.3.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.3.description.0")}</p>
            <p>{t("history.segments.3.description.1")}</p>
            <p>{t("history.segments.3.description.2")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1980."}>
          <h1>{t("history.segments.4.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.4.description.0")}</p>
            <p>{t("history.segments.4.description.1")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1987."}>
          <h1>{t("history.segments.5.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.5.description.0")}</p>
            <p>{t("history.segments.5.description.1")}</p>
          </div>
        </HistorySegment>

        <HistorySegment date={new Date("01.04.2003")}>
          <h1>{t("history.segments.6.title")}</h1>
          <div className="history-segment-description">
            <p>{t("history.segments.6.description.0")}</p>
            <p>{t("history.segments.6.description.1")}</p>
            <p>{t("history.segments.6.description.2")}</p>
          </div>
        </HistorySegment>
      </History>
    ),
    [t]
  );

  return history;
}
