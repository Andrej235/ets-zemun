import "./teachers.scss";
import { teachersMockData } from "./teachers-mock-data";
import TeacherCard from "./teacher-card";

export default function Teachers() {
  return (
    <div className="teachers-page">

      <h1>Nastavnici</h1>
      
      <div className="teacher-cards-container">
        {teachersMockData.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

