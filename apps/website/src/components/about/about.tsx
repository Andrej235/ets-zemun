import { useMemo, useRef } from "react";
import Icon from "@components/icon/icon";
import "./about.scss";
import ProfileOverview from "@components/profile-preview/profile-preview";
import { motion } from "motion/react";
import NewsAndEventsPreviewContainer from "@components/news-and-events-preview-container/news-and-events-preview-container";
import data from "@data/profiles.json";
import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import scrollAnimationFlyInBottom from "../../motion-animation-presets/scroll-animation-fly-in-bottom";
import FluidCanvas from "../../fluid-canvas/fluid-canvas";
import HeroInfoCard from "./hero-info-card";

export default function About() {
  const heroSpaceRef = useRef<HTMLDivElement>(null);

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
    <div id="about-page">
      <section>
        <div className="hero-space">
          <motion.div className="hero-image">
            <img src="/hero-image.jpeg" alt="student" />
          </motion.div>

          <div className="hero-block" ref={heroSpaceRef}>
            {!fluidCanvas}

            <div className="hero-cards">
              <HeroInfoCard
                icon="trophy"
                title="Takmičenja i nagrade"
                description="Ovo je deskripcija!"
                url="/takmicenja"
              />

              <HeroInfoCard
                icon="chalkboard-teacher"
                title="Nastavnici"
                description="Ovo je deskripcija!"
                url="/nastavnici"
              />

              <HeroInfoCard
                icon="history"
                title="Istorija"
                description="Ovo je deskripcija!"
                url="/istorija"
              />

              <HeroInfoCard
                icon="pencil-alt"
                title="Upis i prijem"
                description="Ovo je deskripcija!"
                url="/upis"
              />
            </div>

            <div {...scrollAnimationFlyInBottom} className="overview">
              <div className="overview-info">
                <h1>Misija i Vizija</h1>
                <p>
                  Naša misija je da omogućimo obrazovanje i stvorimo buduće
                  stručnjake i naučne radnike iz oblasti koje obuhvata naš
                  školski program. Nastojimo da kod učenika probudimo želju za
                  usavršavanjem i sticanjem znanja, da su u stanju da samostalno
                  istražuju i obrađuju informacije do kojih dolaze uz korišćenje
                  svih dostupnih izvora.
                </p>
                <p>
                  Njihovo zadovoljstvo u sticanju znanja i bezbednost su nam
                  najveći prioriteti. Podstičemo kreativnost učenika kroz razne
                  vannastavne aktivnosti. Stvorili smo takvo okruženje da je
                  učenik u centru nastavnog procesa i učenja. Želimo da naša
                  deca postanu preduzimljive i savesne ličnosti. Pozivamo Vas da
                  zajedno sa nama menjamo sadašnjost i stvaramo svetliju
                  budućnost.
                </p>
              </div>
              <div className="overview-image">
                <img
                  src="/images/414bee0337a871bdd69bc69aadaf2c79.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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

