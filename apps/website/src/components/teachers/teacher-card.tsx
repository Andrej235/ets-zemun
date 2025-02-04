import React from "react";
import { Faculty } from "./teachers-mock-data";

type TeacherCardProps = {
  teacher: Faculty;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <img
        src={teacher.imageUrl}
        alt={teacher.name}
        className="teacher-image"
      />

      <div className="basic-info">
        <h2>{teacher.name}</h2>
        <h3>{teacher.title}</h3>
        <p>{teacher.bio}</p>
      </div>

      <ul className="subjects">
        {teacher.subjects.map((subject) => (
          <li key={subject}>{subject}</li>
        ))}
      </ul>

      <a className="email" href={`mailto:${teacher.email}`}>
        {teacher.email}
      </a>
    </div>
  );
};

export default TeacherCard;

