import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import HeroInfoCard from "@/components/hero-info-card/hero-info-card";
import Icon from "@/components/icon/icon";
import NewsPreview from "@/components/news-preview/news-preview";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import "./about.scss";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { response: news } = await sendApiRequestSSR("/news", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: 3,
    },
  });

  if (!news) return <div className="error">Error loading news</div>;

  const t = await getTranslations();

  return (
    <div id="about-page" data-search-key="o-nama">
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>{t("about.hero.title")}</h1>
            <h2>{t("about.hero.tagLine")}</h2>
          </div>

          <Image src="/hero-image.jpg" alt="student" fill />
        </div>

        <div className="hero-block">
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

          <div className="overview" data-search-key="misija-i-vizija">
            <div className="overview-info">
              <h1>{t("about.overview.title")}</h1>
              <p>{t("about.overview.description.1")}</p>
              <p>{t("about.overview.description.2")}</p>
            </div>

            <div className="overview-image">
              <Image
                src="/images/mission.jpg"
                alt="Misija i vizija"
                height={300}
                width={300}
              />
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
            <Link href="/upis">
              <button className="primary">
                <p>{t("about.callToAction.buttons.1")}</p>
                <Icon name="arrow-right" className="button-icon" />
              </button>
            </Link>
            <a href="mailto:skola@ets-zemun.edu.rs">
              <button className="secondary">
                <p>{t("about.callToAction.buttons.2")}</p>
                <Icon name="arrow-right" className="button-icon" />
              </button>
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="news-wrapper">
          <h1 className="news-section-title">{t("about.news.title")}</h1>
          <section className="news-section">
            <div className="news-container">
              {news.items.map((x) => (
                <NewsPreview key={x.id} news={x} />
              ))}
            </div>

            <Link href="/novosti" className="view-all-link">
              <p>{t("about.news.viewAll")}</p>
              <Icon name="arrow-right" />
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}
