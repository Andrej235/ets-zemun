import { useState, useEffect, useRef } from "react";
import HeroInfoCard from "@components/hero-info-card/hero-info-card";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";
import { useTranslation } from "react-i18next";

export default function Students() {
  const [activeSection, setActiveSection] =
    useState<string>("ucenicki-parlament");
  const { t } = useTranslation();

  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const handleCardClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  useEffect(() => {
    if (!isInitialRender && contentContainerRef.current) {
      contentContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setIsInitialRender(false);
    }
  }, [activeSection]);

  return (
    <div className="students-page-container">
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
        {activeSection === "ucenicki-parlament" && (
          <StudentsPageStudentParliament />
        )}
        {activeSection === "savet-roditelja" && (
          <StudentsPageParentParliament />
        )}
        {activeSection === "vanredni-ucenici" && <StudentsPagePartTime />}
        {activeSection === "pp-sluzba" && <StudentsPagePPService />}
        {activeSection === "nasilje" && <StudentsPageAntiBullying />}
        {activeSection === "mentalno-zdravlje" && <StudentsPageMentalHealth />}
      </div>
    </div>
  );
}

