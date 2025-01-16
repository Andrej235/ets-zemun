import { useMemo, useRef, useState } from "react";
import CustomSwiper from "../custom-swiper/custom-swiper";
import Icon from "@components/icon/icon";
import InfoCard from "@components/info-card/info-card";
import "./about.scss";
import ProfileOverview from "@components/profile-preview/profile-preview";
import { motion } from "motion/react";
import NewsAndEventsPreviewContainer from "@components/news-and-events-preview-container/news-and-events-preview-container";
import data from "@data/profiles.json";
import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import scrollAnimationFlyInBottom from "../../motion-animation-presets/scroll-animation-fly-in-bottom";
import FluidCanvas from "src/fluid-canvas/fluid-canvas";

export default function About() {
  const heroSpaceRef = useRef<HTMLDivElement>(null);

  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  const fluidCanvas = useMemo(
    () => (
      <FluidCanvas
        containerToApplyEventListenersTo={heroSpaceRef}
        gridSize={[256, 256]}
      />
    ),
    [],
  );

  return (
    <div id="about-page">
      <section>
        <div className="hero-space">
          <motion.div className="hero-image">
            <img src="/hero-image.jpeg" alt="Picture of a student" />
          </motion.div>

          <div className="hero-block" ref={heroSpaceRef}>
            {fluidCanvas}

            <div className="hero-cards">
              <div
                className={`hero-block-element${hoveredElement === 1 ? " block-element-hovered" : ""}`}
                onMouseEnter={() => setHoveredElement(1)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Icon name="brain" className="hero-block-icon" />
                <div className="hero-block-info">
                  <div className="hero-block-header">Naslov</div>
                  <div className="hero-block-description">
                    <p>Ovo je deskripcija!</p>
                    <button className="hero-block-button">
                      <span>Saznaj vise</span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`hero-block-element${hoveredElement === 2 ? " block-element-hovered" : ""}`}
                onMouseEnter={() => setHoveredElement(2)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Icon name="school" className="hero-block-icon" />
                <div className="hero-block-info">
                  <div className="hero-block-header">Naslov</div>
                  <div className="hero-block-description">
                    <p>Ovo je deskripcija!</p>
                    <button className="hero-block-button">
                      <span>Saznaj vise</span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`hero-block-element${hoveredElement === 3 ? " block-element-hovered" : ""}`}
                onMouseEnter={() => setHoveredElement(3)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Icon name="book" className="hero-block-icon" />
                <div className="hero-block-info">
                  <div className="hero-block-header">Naslov</div>
                  <div className="hero-block-description">
                    <p>Ovo je deskripcija!</p>
                    <button className="hero-block-button">
                      <span>Saznaj vise</span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`hero-block-element${hoveredElement === 4 ? " block-element-hovered" : ""}`}
                onMouseEnter={() => setHoveredElement(4)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Icon name="scroll" className="hero-block-icon" />
                <div className="hero-block-info">
                  <div className="hero-block-header">Naslov</div>
                  <div className="hero-block-description">
                    <p>Ovo je deskripcija!</p>
                    <button className="hero-block-button">
                      <span>Saznaj vise</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div className="hero-text" {...scrollAnimationFlyInBottom}>
            <h1>Elektrotehnička škola "Zemun"</h1>

            <p>Mi ne čekamo budućnost, mi joj idemo u susret!</p>
          </motion.div>
        </div>
      </section>

      <motion.div {...scrollAnimationFlyInBottom} className="overview">
        <div className="overview-element">
          <h1>Misija i Vizija</h1>
          <p>
            Naša misija je da omogućimo obrazovanje i stvorimo buduće stručnjake
            i naučne radnike iz oblasti koje obuhvata naš školski program.
            Nastojimo da kod učenika probudimo želju za usavršavanjem i
            sticanjem znanja, da su u stanju da samostalno istražuju i obrađuju
            informacije do kojih dolaze uz korišćenje svih dostupnih izvora.
            <br />
            Njihovo zadovoljstvo u sticanju znanja i bezbednost su nam najveći
            prioriteti. Podstičemo kreativnost učenika kroz razne vannastavne
            aktivnosti. Stvorili smo takvo okruženje da je učenik u centru
            nastavnog procesa i učenja. Želimo da naša deca postanu
            preduzimljive i savesne ličnosti. Pozivamo Vas da zajedno sa nama
            menjamo sadašnjost i stvaramo svetliju budućnost.
          </p>
        </div>
        <div className="overview-image">
          <img src="/images/414bee0337a871bdd69bc69aadaf2c79.png" alt="" />
        </div>
      </motion.div>

      <section>
        <div className="profiles-overview-container">
          {data.profiles.map((profile, i) => (
            <ProfileOverview
              profile={profile as ProfileOverviewSchema}
              layout={i % 2 === 0 ? "image-left" : "image-right"}
              key={profile.name}
            />
          ))}
        </div>
      </section>

      <section>
        <NewsAndEventsPreviewContainer />
      </section>

      <CustomSwiper>
        <InfoCard
          icon="history"
          title="Istorija škole"
          link="/istorija"
          text="Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka."
        />

        <InfoCard
          icon="graduation-cap"
          title="Programi obrazovanja"
          link="/programi"
          text="Nudimo širok spektar tehničkih i stručnih smerova koji pripremaju učenike za uspeh u industriji."
        />

        <InfoCard
          icon="building"
          title="Infrastruktura i oprema"
          link="/infrastruktura"
          text="Moderne učionice i specijalizovane laboratorije omogućavaju učenicima kvalitetno obrazovanje i praktičan rad."
        />

        <InfoCard
          icon="chalkboard-teacher"
          title="Nastavnici"
          link="/nastavnici"
          text="Naši nastavnici su iskusni profesionalci koji inspirišu i podržavaju razvoj učenika kroz inovativne metode nastave."
        />

        <InfoCard
          icon="trophy"
          title="Takmičenja i nagrade"
          link="/takmicenja"
          text="Škola je ponosna na brojne nagrade i priznanja koja su naši učenici osvojili na domaćim i međunarodnim takmičenjima."
        />

        <InfoCard
          icon="lightbulb"
          title="Mentorski programi"
          link="/mentori"
          text="Naši mentori pomažu učenicima da razvijaju veštine i planiraju svoj profesionalni put uz podršku kroz različite aktivnosti."
        />

        <InfoCard
          icon="pencil-alt"
          title="Upis i prijem"
          link="/upis"
          text="Jednostavan proces upisa i pomoć u odabiru smera omogućavaju lakše snalaženje budućim studentima."
        />

        <InfoCard
          icon="headset"
          title="Podrška učenicima"
          link="/podrska"
          text="Naša psihološko-pedagoška služba pruža podršku učenicima i roditeljima u svim izazovima, uključujući prevenciju nasilja i krizne intervencije."
        />

        <InfoCard
          icon="gavel"
          title="Pravni akte"
          link="/pravni-akte"
          text="Škola se pridržava svih zakonskih propisa i pravnih akata, garantujući pravo svakog učenika na sigurno i kvalitetno obrazovanje."
        />
      </CustomSwiper>

      <div className="footer">
        <div className="social-media-icons-container">
          <a href="https://www.linkedin.com">
            <Icon name="linkedin" />
          </a>

          <a href="https://www.youtube.com">
            <Icon name="youtube" />
          </a>

          <a href="https://www.x.com">
            <Icon name="twitter" />
          </a>

          <a href="https://www.facebook.com">
            <Icon name="facebook" />
          </a>

          <a href="https://www.instagram.com">
            <Icon name="instagram" />
          </a>
        </div>

        <h1 className="footer-title">
          &copy; 2024 Elektrotehnička škola "Zemun"
        </h1>
      </div>
    </div>
  );
}

