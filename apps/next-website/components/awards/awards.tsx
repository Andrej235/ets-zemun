import useLoader from "@/better-router/use-loader";
import LazyAwaitedList from "@/components/lazy-loaded-list/lazy-awaited-list";
import { PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";;
import awardsLoader from "./awards-loader";
import "./awards.scss";

export default function Awards() {
  const loaderData = useLoader<typeof awardsLoader>();
  const t = useTranslations();

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
        keywords: "searchKeys.awards.keywords",
        title: "searchKeys.awards.title",
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
            <Link
              className="award-card-link"
              href={award.externalLink ?? "/takmicenja"}
              key={award.id}
            >
              <div className="award-card" onPointerMove={handleMouseMove}>
                <img src={award.image} alt={award.title} />
                <div className="award-card-header">
                  <h2>{award.title}</h2>
                  <div className="award-card-header-line">
                    <p>{award.competition}</p>
                    <p>&nbsp;-&nbsp;</p>
                    <p>{award.dayOfAward}</p>
                  </div>
                </div>

                <div className="content">
                  <h3>Ucenik: {" " + award.student}</h3>
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
