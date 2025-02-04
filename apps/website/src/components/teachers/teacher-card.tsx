import { Faculty } from "./teachers-mock-data";
import { motion } from "motion/react";

type TeacherCardProps = {
  teacher: Faculty;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <motion.div
      layout
      layoutId={teacher.id}
      className="teacher-card"
      initial={{
        opacity: 0,
        x: -100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      viewport={{
        once: true,
      }}
    >
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
    </motion.div>
  );
};

export default TeacherCard;

