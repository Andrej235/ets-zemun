import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Deadlines = {
  term: string;
  registration: string;
  exam: string;
}[];

type PriceLists = {
  itemName: string;
  itemPrice: string;
}[];

type ExamData = {
  subject: string;
  commission: string[];
  date: string;
  time: string;
  cabinet: string;
}[];

export default function StudentsPagePartTime() {
  const { t } = useTranslation();

  const deadlines: Deadlines = useMemo(
    () =>
      t("students.sections.partTime.deadlines", {
        returnObjects: true,
      }) as Deadlines,
    [t],
  );

  const priceList: PriceLists = useMemo(
    () =>
      t("students.sections.partTime.priceList", {
        returnObjects: true,
      }) as PriceLists,
    [t],
  );

  const examData: ExamData = useMemo(
    () =>
      t("students.sections.partTime.examData", {
        returnObjects: true,
      }) as ExamData,
    [t],
  );

  return (
    <div
      className="part-time-container"
      searchKey={{
        id: "vanredni-ucenici",
        keywords: "searchKeys.partTimeStundents.keywords",
        title: "searchKeys.partTimeStundents.title",
        url: "/ucenici",
      }}
    >
      <h1>{t("students.sections.partTime.title")}</h1>

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
        <p>840-31302845-09</p>
        <p>{t("students.sections.partTime.paymentMethod.description.0")}:</p>
        <p>{t("students.sections.partTime.paymentMethod.description.1")}</p>
        <p>97 06601832040174231700</p>
      </div>

      <div className="table-container">
        <table className="part-time-table">
          <caption>{t("students.sections.partTime.examDataCaption")}</caption>
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
            {examData.map((exam) => (
              <tr key={exam.commission + exam.subject}>
                <td>{exam.subject}</td>
                <td>{exam.commission.join(", ")}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.cabinet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
