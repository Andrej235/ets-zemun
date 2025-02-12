import Expander from "@components/expander/expander";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import HeroInfoCard from "@components/about/hero-info-card";

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
            <HeroInfoCard
              icon="history"
              title="Istorija"
              description="Pregled istorije naše škole i značajnih trenutaka."
              url={"/istorija"}
            />

            <HeroInfoCard
              icon="chalkboard-teacher"
              title="Nastavnici"
              description="Saznajte više o našim nastavnicima i njihovim kvalifikacijama."
              url={"/nastavnici"}
            />

            <HeroInfoCard
              icon="pencil-alt"
              title="Upis i prijem"
              description="Detalji o procesu upisa i prijemnom ispitu."
              url={"/upis"}
            />

            <HeroInfoCard
              icon="trophy"
              title="Takmičenja i nagrade"
              description="Informacije o svim takmičenjima i osvojenim nagradama."
              url={"/takmicenja"}
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
          ></div>
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

