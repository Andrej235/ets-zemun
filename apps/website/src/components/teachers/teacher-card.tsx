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

      <div className="teacher-card-header">
        <h2>{teacher.name}</h2>
        <p>{teacher.title}</p>
      </div>

      <div className="basic-info">
        <p>{teacher.bio}</p>
        <ul className="subjects">
          <p>Predmeti: </p>
          {teacher.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>

      <a className="email" href={`mailto:${teacher.email}`}>
        {teacher.email}
      </a>
    </div>
  );
};

export default TeacherCard;

