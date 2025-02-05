import { Link } from "react-router";
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
            {award.externalLink && (
              <Link
                className="external-link"
                to={award.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Saznaj vise
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

