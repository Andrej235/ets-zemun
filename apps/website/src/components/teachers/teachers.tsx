import { animate } from "motion";
import { useEffect, useState } from "react";
import "./teachers.scss";
import { teachersMockData } from "./teachers-mock-data";
import TeacherCard from "./teacher-card";

export default function Teachers() {
  return (
    <div className="teachers-page">
      <div className="hero">
        <div className="image-container">
          <img
            src="/images/info-cards/teachers.jpg"
            alt="Our team of teachers"
          />
        </div>

        <div className="info">
          <h1>Vodimo buduće inovatore u elektrotehnici</h1>

          <div className="cards">
            <Card count={100} title="Profesora" />
            <Card count={1000} title="Godina iskustva" />
          </div>
        </div>
      </div>

      <div className="teacher-cards-container">
        {teachersMockData.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

function Card({
  count,
  title,
}: {
  readonly count: number;
  readonly title: string;
}) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    animate(0, count, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCurrentCount(Math.floor(latest));
      },
    });
  }, [count]);

  return (
    <div className="card">
      <h2>{currentCount}+</h2>
      <p>{title}</p>
    </div>
  );
}

