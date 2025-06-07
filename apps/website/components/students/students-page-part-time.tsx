import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

type Deadlines = {
  term: string;
  registration: string;
  exam: string;
}[];

type PriceLists = {
  itemName: string;
  itemPrice: string;
}[];

type Props = {
  exams: Schema<"ExamResponseDto">[];
  examTitle: string;
};

export default function StudentsPagePartTime({ exams, examTitle }: Props) {
  const t = useTranslations();

  const deadlines: Deadlines = useMemo(
    () => t.raw("students.sections.partTime.deadlines") as Deadlines,
    [t]
  );

  const priceList: PriceLists = useMemo(
    () => t.raw("students.sections.partTime.priceList") as PriceLists,
    [t]
  );

  return (
    <div className="part-time-container" data-search-key="vanredni-ucenici">
      <h1>{t("students.sections.partTime.title")}</h1>

      <div className="image-container">
        <Image
          src="/images/students/part-time.webp"
          alt="part-time"
          width={600}
          height={400}
        />
      </div>

      <div className="table-container">
        <table>
          <caption>{t("students.sections.partTime.deadlinesCaption")}</caption>
          <thead>
            <tr>
              <th>{t("students.sections.partTime.deadlinesHeaders.0")}</th>
              <th>{t("students.sections.partTime.deadlinesHeaders.1")}</th>
              <th>{t("students.sections.partTime.deadlinesHeaders.2")}</th>
            </tr>
          </thead>
          <tbody>
            {deadlines.map((deadline) => (
              <tr key={deadline.term}>
                <td>{deadline.term}</td>
                <td>{deadline.registration}</td>
                <td>{deadline.exam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="price-list">
        <h2>{t("students.sections.partTime.priceListTitle")}</h2>
        {priceList.map((item) => (
          <div className="price-list-item" key={item.itemName}>
            <div className="item-name">{item.itemName}</div>
            <div className="item-price">{item.itemPrice}</div>
          </div>
        ))}
      </div>

      <div className="payment-method">
        <h2>{t("students.sections.partTime.paymentMethod.title")}</h2>
        <Image
          className="payment-image"
          src="/images/students/payment.webp"
          alt="payment"
          width={684}
          height={291}
        />
      </div>

      <div className="table-container" data-search-key="ispiti">
        <table className="part-time-table">
          <caption>{examTitle}</caption>
          <thead>
            <tr>
              <th>{t("students.sections.partTime.examDataHeaders.0")}</th>
              <th>{t("students.sections.partTime.examDataHeaders.1")}</th>
              <th>{t("students.sections.partTime.examDataHeaders.2")}</th>
              <th>{t("students.sections.partTime.examDataHeaders.3")}</th>
              <th>{t("students.sections.partTime.examDataHeaders.4")}</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => (
              <tr key={i}>
                <td>{exam.subject.name}</td>
                <td>{exam.commission.map((c) => c.name).join(", ")}</td>
                <td>{format(exam.startTime, "dd.MM.yyyy")}</td>
                <td>{format(exam.startTime, "HH:mm")}</td>
                <td>{exam.cabinet || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
