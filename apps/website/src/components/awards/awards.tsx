import useLoader from "@better-router/use-loader";
import LazyAwaitedList from "@components/lazy-loaded-list/lazy-awaited-list";
import { PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import awardsLoader from "./awards-loader";
import "./awards.scss";

export default function Awards() {
  const loaderData = useLoader<typeof awardsLoader>();
  const { t } = useTranslation();

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
      <h1>{t("awards.title")}</h1>
      <div className="awards-list">
        <LazyAwaitedList data={loaderData} success="OK">
          {(award) => (
            <Link to={award.externalLink ?? "/takmicenja"} key={award.id}>
              <div className="award-card" onPointerMove={handleMouseMove}>
                <img src={award.image} alt={award.title} />
                <div className="award-card-header">
                  <h2>{award.title}</h2>
                  <p>
                    {award.competition} - {award.dayOfAward}
                  </p>
                </div>

                <h3>{award.student}</h3>
                {award.teacherId && (
                  <Link to={`/nastavnici/${award.teacherId}`}>
                    {award.teacher.name}
                  </Link>
                )}

                <div className="content">
                  {award.description && <p>{award.description}</p>}
                </div>
                {award.externalLink && (
                  <div className="external-link">
                    <a
                      href={award.externalLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {award.externalLink}
                    </a>
                  </div>
                )}
              </div>
            </Link>
          )}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

