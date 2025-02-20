import HeroInfoCard from "@components/hero-info-card/hero-info-card";
import Icon from "@components/icon/icon";
import NewsPreviewContainer from "@components/news-preview-container/news-preview-container";
import SchoolPreviewCard from "@components/school-preview-card/school-preview-card";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import FluidCanvas from "../../fluid-canvas/fluid-canvas";
import "./about.scss";

export default function About() {
  const heroSpaceRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const fluidCanvas = useMemo(
    () => (
      <FluidCanvas
        containerToApplyEventListenersTo={heroSpaceRef}
        gridSize={[512, 256]}
      />
    ),
    []
  );

  return (
    <div
      id="about-page"
      searchKey={{
        id: "o-nama",
        title: "O Nama",
        keywords: ["o nama", "o skoli"],
        url: "/",
      }}
    >
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>{t("about.hero.title")}</h1>
            <h2>{t("about.hero.tagLine")}</h2>
          </div>

          <img src="/hero-image.jpg" alt="student" />
        </div>

        <div className="hero-block" ref={heroSpaceRef}>
          {!fluidCanvas}

          <div className="hero-cards">
            <HeroInfoCard
              icon="history"
              title={t("about.hero.heroCards.history.title")}
              description={t("about.hero.heroCards.history.description")}
              url="/istorija"
            />

            <HeroInfoCard
              icon="chalkboard-teacher"
              title={t("about.hero.heroCards.teachers.title")}
              description={t("about.hero.heroCards.teachers.description")}
              url="/nastavnici"
            />

            <HeroInfoCard
              icon="pencil-alt"
              title={t("about.hero.heroCards.enrollment.title")}
              description={t("about.hero.heroCards.enrollment.description")}
              url="/upis"
            />

            <HeroInfoCard
              icon="trophy"
              title={t("about.hero.heroCards.competitions.title")}
              description={t("about.hero.heroCards.competitions.description")}
              url="/takmicenja"
            />
          </div>

          <div
            className="overview"
            searchKey={{
              id: "misija-i-vizija",
              keywords: ["misija", "vizija", "misija i vizija"],
              title: "Misija i Vizija",
              url: "/",
            }}
          >
            <div className="overview-info">
              <h1>{t("about.overview.title")}</h1>
              <p>{t("about.overview.description.1")}</p>
              <p>{t("about.overview.description.2")}</p>
            </div>

            <div className="overview-image">
              <img src="/images/mission.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="school-preview-cards-container">
        <SchoolPreviewCard
          count={100}
          image="/images/info-cards/teachers.jpg"
          title={t("about.schoolPreviewCards.teachers.title")}
          description={t("about.schoolPreviewCards.teachers.description")}
          layout="image-left"
        />

        <SchoolPreviewCard
          count={750}
          image="/images/info-cards/students.jpg"
          title={t("about.schoolPreviewCards.students.title")}
          description={t("about.schoolPreviewCards.students.description")}
          layout="image-right"
        />

        <SchoolPreviewCard
          count={40}
          title={t("about.schoolPreviewCards.classrooms.title")}
          image="/images/info-cards/samsung-classroom.jpg"
          description={t("about.schoolPreviewCards.classrooms.description")}
          layout="image-left"
        />

        <SchoolPreviewCard
          count={25}
          title={t("about.schoolPreviewCards.awards.title")}
          image="/images/info-cards/trophy.jpg"
          description={t("about.schoolPreviewCards.awards.description")}
          layout="image-right"
        />
      </section>

      <section className="call-to-action-section">
        <div className="call-to-action">
          <h1>{t("about.callToAction.title")}</h1>

          <p>{t("about.callToAction.description")}</p>

          <div className="call-to-action-buttons">
            <button className="primary">
              <p>{t("about.callToAction.buttons.1")}</p>
              <Icon name="arrow-right" className="button-icon" />
            </button>
            <button className="secondary">
              <p>{t("about.callToAction.buttons.2")}</p>
              <Icon name="arrow-right" className="button-icon" />
            </button>
          </div>
        </div>
      </section>

      <section>
        <NewsPreviewContainer />
      </section>
    </div>
  );
}

