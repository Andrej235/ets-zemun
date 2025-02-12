import Expander from "@components/expander/expander";
import HeroInfoCard from "@components/hero-info-card/hero-info-card";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";

export default function Students() {
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
            <HeroInfoCard icon="history" title="" />

            <HeroInfoCard icon="chalkboard-teacher" title="" />

            <HeroInfoCard icon="pencil-alt" title="" />

            <HeroInfoCard icon="trophy" title="" />
          </div>
        </div>
      </section>
      <div className="parliaments-container">
        <Expander title="Ucenicki parlament">
          <StudentsPageStudentParliament />
        </Expander>

        <Expander title="Savet roditelja">
          <StudentsPageParentParliament />
        </Expander>
      </div>

      <Expander title="Vanredni učenici">
        <StudentsPagePartTime />
      </Expander>

      <Expander title="Psihološko-pedagoška (PP) služba" initiallyOpen>
        <StudentsPagePPService />
      </Expander>

      <Expander title="Nasilje" initiallyOpen>
        <StudentsPageAntiBullying />
      </Expander>

      <Expander title="Mentalno Zdravlje" initiallyOpen>
        <StudentsPageMentalHealth />
      </Expander>
    </div>
  );
}

