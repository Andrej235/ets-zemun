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

export default function About() {
  return (
    <div id="about-page">
      <section>
        <div className="hero-space">
          <motion.div className="hero-image">
            <img src="/hero-image.jpeg" alt="Picture of a student" />
          </motion.div>

          <div className="hero-image-overlay"></div>

          <motion.div className="hero-text" {...scrollAnimationFlyInBottom}>
            <h1>Elektrotehnička škola "Zemun"</h1>

            <p>Mi nečekamo budućnost, mi joj idemo u susret!</p>
          </motion.div>
        </div>
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

      <div className="profiles-overview-container">
        {data.profiles.map((profile, i) => (
          <ProfileOverview
            profile={profile as ProfileOverviewSchema}
            layout={i % 2 === 0 ? "image-left" : "image-right"}
            key={profile.name}
          />
        ))}
      </div>

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

