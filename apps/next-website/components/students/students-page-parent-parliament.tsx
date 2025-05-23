import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type ParentData = {
  grade: string;
  classes: {
    className: string;
    parent: string;
  }[];
}[];

export default function StudentsPageParentParliament() {
  const { t } = useTranslation();

  const parentData: ParentData = useMemo(
    () =>
      t("students.sections.parentParliament.data", {
        returnObjects: true,
      }) as ParentData,
    [t],
  );

  return (
    <div
      className="parliament-container"
      searchKey={{
        id: "savet-roditelja",
        keywords: "searchKeys.parentParliament.keywords",
        title: "searchKeys.parentParliament.title",
        url: "/ucenici",
      }}
    >
      <h1>{t("students.sections.parentParliament.title")}</h1>

      {parentData.map((gradeData) => (
        <div className="table-container" key={gradeData.grade}>
          <table>
            <caption>{gradeData.grade}</caption>
            <thead>
              <tr>
                <th>{t("students.sections.parentParliament.headers.0")}</th>
                <th>{t("students.sections.parentParliament.headers.1")}</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.classes.map((classData) => (
                <tr key={classData.className}>
                  <td>{classData.className}</td>
                  <td>{classData.parent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
