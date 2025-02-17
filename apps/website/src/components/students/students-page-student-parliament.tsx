import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type StudentsData = {
  grade: string;
  classes: {
    className: string;
    students: string[];
  }[];
}[];

export default function StudentsPageStudentParliament() {
  const { t } = useTranslation();

  const studentsData: StudentsData = useMemo(() => {
    const data: StudentsData = [];

    for (let i = 0; i < 4; i++) {
      const base = `students.sections.studentsParliament.data.${i}`;

      const classes: StudentsData[number]["classes"] = [];

      for (let j = 0; j < (i !== 3 ? 8 : 7); j++) {
        classes.push({
          className: t(base + `.classes.${j}.className`),
          students: [
            t(base + `.classes.${j}.students.0`),
            t(base + `.classes.${j}.students.1`),
          ],
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
      <h1>{t("students.sections.studentsParliament.title")}</h1>

      {studentsData.map((gradeData) => (
        <div className="table-container" key={gradeData.grade}>
          <table>
            <caption>{gradeData.grade}</caption>
            <thead>
              <tr>
                <th>{t("students.sections.studentsParliament.headers.0")}</th>
                <th>{t("students.sections.studentsParliament.headers.1")}</th>
                <th>{t("students.sections.studentsParliament.headers.2")}</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.classes.map((classData) => (
                <tr key={classData.className}>
                  <td>{classData.className}</td>
                  <td>{classData.students[0]}</td>
                  <td>{classData.students[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

