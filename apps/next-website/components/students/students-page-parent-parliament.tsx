import { useMemo } from "react";
import { useTranslations } from "next-intl";

type ParentData = {
  grade: string;
  classes: {
    className: string;
    parent: string;
  }[];
}[];

export default function StudentsPageParentParliament() {
  const t = useTranslations();

  const parentData: ParentData = useMemo(
    () => t.raw("students.sections.parentParliament.data") as ParentData,
    [t],
  );

  return (
    <div className="parliament-container" data-search-key="savet-roditelja">
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
