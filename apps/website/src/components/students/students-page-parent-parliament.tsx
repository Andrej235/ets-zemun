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

  const parentData: ParentData = useMemo(() => {
    const data: ParentData = [];

    for (let i = 0; i < 4; i++) {
      const base = `students.sections.parentParliament.data.${i}`;

      const classes: ParentData[number]["classes"] = [];

      for (let j = 0; j < (i !== 3 ? 8 : 7); j++) {
        classes.push({
          className: t(base + `.classes.${j}.className`),
          parent: t(base + `.classes.${j}.parent`),
        });
      }

      data.push({
        grade: t(base + ".grade"),
        classes: classes,
      });
    }

    return data;
  }, [t]);

  return (
    <div className="parliament-container">
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

