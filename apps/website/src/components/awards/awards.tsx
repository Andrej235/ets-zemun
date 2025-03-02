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
    <div
      className="awards-pages"
      searchKey={{
        id: "takmicenja-i-nagrade",
        keywords: "searchKey.awards.keywords",
        title: "searchKey.awards.title",
        url: "/takmicenja",
      }}
    >
      <h1>{t("awards.title")}</h1>
      <div className="awards-list">
        <LazyAwaitedList
          data={loaderData}
          success="200"
          skeleton={Array.from({ length: 9 }).map((_, i) => (
            <div className="award-card skeleton" key={"skeleton_" + i}></div>
          ))}
        >
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

                <div className="content">
                  <h3>Ucenik: {" " + award.student}</h3>
                  {award.teacherId && (
                    <Link to={`/nastavnici/${award.teacherId}`}>
                      <h3 className="teacher-link">
                        {" "}
                        Nastavnik: {" " + award.teacher.name}
                      </h3>
                    </Link>
                  )}
                  {award.description && <p>{award.description}</p>}
                </div>
              </div>
            </Link>
          )}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

