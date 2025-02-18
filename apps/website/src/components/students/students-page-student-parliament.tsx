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

  const studentsData: StudentsData = useMemo(
    () =>
      t("students.sections.studentsParliament.data", {
        returnObjects: true,
      }) as StudentsData,
    [t]
  );

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

