import { useTranslations } from "next-intl";
import { useMemo } from "react";

type StudentsData = {
  grade: string;
  classes: {
    className: string;
    students: string[];
  }[];
}[];

export default function StudentsPageStudentParliament() {
  const t = useTranslations();

  const studentsData: StudentsData = useMemo(
    () => t.raw("students.sections.studentsParliament.data") as StudentsData,
    [t]
  );

  return (
    <div className="parliament-container" data-search-key="ucenicki-parlament">
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
