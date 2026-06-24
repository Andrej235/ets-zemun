import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import HeroInfoCard from "@/components/hero-info-card/hero-info-card";
import Icon from "@/components/icon/icon";
import NewsPreview from "@/components/news-preview/news-preview";
import SchoolPreviewCard from "@/components/school-preview-card/school-preview-card";
import { Link } from "@/i18n/navigation";
import localeToLangCode from "@/lib/locale-to-lang-code";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import "./about.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { response: news } = await sendApiRequestSSR("/news", {
    method: "get",
    parameters: {
      languageCode: localeToLangCode(locale),
      limit: 3,
    },
  });

  if (!news) throw new Error("Failed to fetch news");

  const t = await getTranslations({ locale });

  return (
    <div id="about-page" data-search-key="o-nama">
      <section className="hero-space">
        <div className="hero-image">
          <Image
            src="/hero-image.webp"
            alt="student"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />

          <div className="text">
            <h1>{t("about.hero.title")}</h1>
            <h2>{t("about.hero.tagLine")}</h2>
          </div>
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
                src="/images/mission.webp"
                alt="Misija i vizija"
                height={300}
                width={300}
                fetchPriority="low"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="table-container">
          <table>
            <caption>
              Raspored razrednih ispita u junskom roku 2025/2026 godine
            </caption>

            <thead>
              <tr>
                <th>Predmet</th>
                <th>Datum</th>
                <th>Profesori</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Mrežni i operativni sistemi</td>
                <td>26.06.2026. 10h</td>
                <td>Merdžan Ibraimi, Biljana Živković, Saša Stošić</td>
              </tr>

              <tr>
                <td>Hemija</td>
                <td>26.06.2026. 12h</td>
                <td>Relja Ćurčin, Svetlana Pavlović, Valentina Ivanov</td>
              </tr>

              <tr>
                <td>Fizika</td>
                <td>30.06.2026. 10h</td>
                <td>
                  Svetlana Lazić, Jelena Prnjak, Aleksandra Gemović Stepić
                </td>
              </tr>

              <tr>
                <td>Matematika</td>
                <td>02.07.2026. 10h</td>
                <td>Svetlana Lazić, Zorica Lukić, Ljiljana Stanojčić</td>
              </tr>

              <tr>
                <td>Veb programiranje</td>
                <td>02.07.2026. 10h</td>
                <td>Zorica Lukić, Slaviša Simović, Marina Takov</td>
              </tr>

              <tr>
                <td>Srpski jezik i književnost</td>
                <td>29.06.2026. 10h</td>
                <td>Adriana Đurić, Nada Đurić, Vladimir Pavković</td>
              </tr>

              <tr>
                <td>Fizičko vaspitanje</td>
                <td>26.06.2026. 10h</td>
                <td>Svetlana Lazić, Srđan Lukač, Ivana Jovanović</td>
              </tr>

              <tr>
                <td>Ekologija</td>
                <td>26.06.2026. 10h</td>
                <td>Jovana Milovanović, Desanka Uzelac, Biserka Radenković</td>
              </tr>

              <tr>
                <td>Engleski jezik</td>
                <td>01.07.2026. 10h</td>
                <td>Jovana Milovanović, Dobrila Injac, Miljana Stojanović</td>
              </tr>

              <tr>
                <td>Računarski hardver</td>
                <td>01.07.2026. 10h</td>
                <td>Svetlana Lazić, Ivica Radisavljević, Dejan Stanković</td>
              </tr>

              <tr>
                <td>Programiranje</td>
                <td>02.07.2026. 10h</td>
                <td>Svetlana Lazić, Adriana Đurić, Dejan Vurdelja</td>
              </tr>

              <tr>
                <td>Pasivne i aktivne komponente</td>
                <td>01.07.2026. 10h</td>
                <td>Olivera Lužnjanin, Dragana Joksimović, Radovan Đurić</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="school-preview-cards-container">
        <SchoolPreviewCard
          count={75}
          image="/images/info-cards/teachers.webp"
          title={t("about.schoolPreviewCards.teachers.title")}
          description={t("about.schoolPreviewCards.teachers.description")}
          layout="image-left"
        />

        <SchoolPreviewCard
          count={750}
          image="/images/info-cards/students.webp"
          title={t("about.schoolPreviewCards.students.title")}
          description={t("about.schoolPreviewCards.students.description")}
          layout="image-right"
        />

        <SchoolPreviewCard
          count={60}
          title={t("about.schoolPreviewCards.classrooms.title")}
          image="/images/info-cards/samsung-classroom.webp"
          description={t("about.schoolPreviewCards.classrooms.description")}
          layout="image-left"
        />

        <SchoolPreviewCard
          count={25}
          title={t("about.schoolPreviewCards.awards.title")}
          image="/images/info-cards/trophy.webp"
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
