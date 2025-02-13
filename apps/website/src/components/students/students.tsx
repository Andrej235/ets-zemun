import { useState } from "react";
import HeroInfoCard from "@components/hero-info-card/hero-info-card";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";

export default function Students() {
  const [activeSection, setActiveSection] = useState<string>("ucenicki-parlament");

  const handleCardClick = (sectionName: string) => {
      setActiveSection(sectionName);
  };

  return (
    <div className="students-page-container">
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>Elektrotehnička škola "Zemun"</h1>
            <h2>Mi ne čekamo budućnost, mi joj idemo u susret!</h2>
          </div>

          <img src="/hero-image.jpg" alt="student" />
        </div>

        <div className="hero-block">
          <div className="hero-cards">
            <HeroInfoCard
              icon="graduation-cap"
              title="Ucenicki parlament"
              onClick={handleCardClick}
              sectionName="ucenicki-parlament"
              isActive={activeSection === "ucenicki-parlament"}
            />
            <HeroInfoCard
              icon="people-roof"
              title="Savet roditelja"
              onClick={handleCardClick}
              sectionName="savet-roditelja"
              isActive={activeSection === "savet-roditelja"}
            />
            <HeroInfoCard
              icon="house-user"
              title="Vanredni učenici"
              onClick={handleCardClick}
              sectionName="vanredni-ucenici"
              isActive={activeSection === "vanredni-ucenici"}
            />
            <HeroInfoCard
              icon="pied-piper-pp"
              title="PP služba"
              onClick={handleCardClick}
              sectionName="pp-sluzba"
              isActive={activeSection === "pp-sluzba"}
            />
            <HeroInfoCard
              icon="face-angry"
              title="Nasilje"
              onClick={handleCardClick}
              sectionName="nasilje"
              isActive={activeSection === "nasilje"}
            />
            <HeroInfoCard
              icon="brain"
              title="Mentalno Zdravlje"
              onClick={handleCardClick}
              sectionName="mentalno-zdravlje"
              isActive={activeSection === "mentalno-zdravlje"}
            />
          </div>
        </div>
      </section>

      <div className="content-container">
        {activeSection === "ucenicki-parlament" && <StudentsPageStudentParliament />}
        {activeSection === "savet-roditelja" && <StudentsPageParentParliament />}
        {activeSection === "vanredni-ucenici" && <StudentsPagePartTime />}
        {activeSection === "pp-sluzba" && <StudentsPagePPService />}
        {activeSection === "nasilje" && <StudentsPageAntiBullying />}
        {activeSection === "mentalno-zdravlje" && <StudentsPageMentalHealth />}
      </div>
    </div>
  );
}

