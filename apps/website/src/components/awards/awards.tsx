import "./awards.scss";
import { awards } from "./mock-awards-data";

export default function Awards() {
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
          <div key={award.id} className="award-card">
            <img src={award.image} alt={award.title} />
            <h2>{award.title}</h2>
            <p>
              {award.competition} - {award.year}
            </p>
            <p>{award.category}</p>
            <p>{award.description}</p>
            {award.projectSummary && <p>{award.projectSummary}</p>}
            {award.externalLink && (
              <a
                href={award.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

