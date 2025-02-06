import "./awards.scss";
import { awards } from "./mock-awards-data";
import { PointerEvent } from "react";

export default function Awards() {
  const handleMouseMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;

    const target = e.currentTarget as HTMLAnchorElement;
    const { top, left } = target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="awards-pages">
      <div className="hero">
        <div className="image-container">
          <img src="/images/awards-hero.jpg" alt="students holding diplomas" />
        </div>
        <h1>Zlatni Standard: 25+ Nagrada kao Dokaz Kvaliteta!</h1>
      </div>
      <div className="awards-list">
        {awards.map((award) => (
          <div
            key={award.id}
            className="award-card"
            onPointerMove={handleMouseMove}
          >
            <img src={award.image} alt={award.title} />
            <div className="award-card-header">
              <h2>{award.title}</h2>
              <p>
                {award.competition} - {award.year}
              </p>
            </div>
            <div className="content">
              <p>Kategorija:{" " + award.category}</p>
              {award.projectSummary && <p>{award.projectSummary}</p>}
              <p>{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

