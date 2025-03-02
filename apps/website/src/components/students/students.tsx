import HeroInfoCard from "@components/hero-info-card/hero-info-card";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";

export default function Students() {
  const { t } = useTranslation();

  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchParams] = useSearchParams();

  const sections = [
    { id: "ucenicki-parlament", component: <StudentsPageStudentParliament /> },
    { id: "savet-roditelja", component: <StudentsPageParentParliament /> },
    { id: "vanredni-ucenici", component: <StudentsPagePartTime /> },
    { id: "pp-sluzba", component: <StudentsPagePPService /> },
    { id: "nasilje", component: <StudentsPageAntiBullying /> },
    { id: "mentalno-zdravlje", component: <StudentsPageMentalHealth /> },
  ];

  useEffect(() => {
    const searchKey = searchParams.get("searchKey");
    if (!searchKey) return;

    setActiveSection(searchKey);
    contentContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  const handleCardClick = (sectionName: string) => {
    contentContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionName);
  };

  const activeComponent = sections.find(
    (section) => section.id === activeSection
  )?.component;

  return (
    <div
      className="students-page-container"
      searchKey={{
        id: "ucenici",
        keywords: "searchKeys.students.keywords",
        title: "searchKeys.students.title",
        url: "/ucenici",
      }}
    >
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>{t("students.hero.title")}</h1>
            <h2>{t("students.hero.tagLine")}</h2>
          </div>

          <img src="/hero-image.jpg" alt="student" />
        </div>

        <div className="hero-block">
          <div className="hero-cards">
            <HeroInfoCard
              icon="graduation-cap"
              title={t("students.hero.cards.0")}
              onClick={handleCardClick}
              sectionName="ucenicki-parlament"
              isActive={activeSection === "ucenicki-parlament"}
            />
            <HeroInfoCard
              icon="people-roof"
              title={t("students.hero.cards.1")}
              onClick={handleCardClick}
              sectionName="savet-roditelja"
              isActive={activeSection === "savet-roditelja"}
            />
            <HeroInfoCard
              icon="house-user"
              title={t("students.hero.cards.2")}
              onClick={handleCardClick}
              sectionName="vanredni-ucenici"
              isActive={activeSection === "vanredni-ucenici"}
            />
            <HeroInfoCard
              icon="pied-piper-pp"
              title={t("students.hero.cards.3")}
              onClick={handleCardClick}
              sectionName="pp-sluzba"
              isActive={activeSection === "pp-sluzba"}
            />
            <HeroInfoCard
              icon="face-angry"
              title={t("students.hero.cards.4")}
              onClick={handleCardClick}
              sectionName="nasilje"
              isActive={activeSection === "nasilje"}
            />
            <HeroInfoCard
              icon="brain"
              title={t("students.hero.cards.5")}
              onClick={handleCardClick}
              sectionName="mentalno-zdravlje"
              isActive={activeSection === "mentalno-zdravlje"}
            />
          </div>
        </div>
      </section>

      <div className="content-container" ref={contentContainerRef}>
        {activeComponent}
      </div>
    </div>
  );
}

