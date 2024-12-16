import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import Icon from "../Icon/Icon";
import InfoCard from "../InfoCard/InfoCard";
import "./About.scss";
import ProfileOverview from "../ProfileOverview/ProfileOverview";
import { animate, motion, scroll } from "motion/react";
import { useEffect, useRef } from "react";
import NewsAndEventsPreviewContainer from "../NewsAndEventsPreviewContainer/NewsAndEventsPreviewContainer";
import * as data from "@data/profiles.json";
import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import scrollAnimationFlyInBottom from "../../motion-animation-presets/scroll-animation-fly-in-bottom";

export default function About() {
  const infoCardsContainerRef = useRef<OverlayScrollbarsComponentRef>(null);

  useEffect(() => {
    if (!infoCardsContainerRef.current) return;
    const infoCardsContainer = infoCardsContainerRef.current
      .getElement()!
      .querySelector("[data-overlayscrollbars-contents]")! as HTMLElement;

    for (let i = 0; i < infoCardsContainer.children.length; i++) {
      const card = infoCardsContainer.children[i];

      scroll(animate(card, { opacity: [0, 1, 1, 0] }, { ease: "linear" }), {
        axis: "x",
        target: card,
        container: infoCardsContainer,
        offset: ["start end", "end end", "start start", "end start"],
      });
    }
  }, []);

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

      <section>
        <div className="overview">
          <motion.h1 {...scrollAnimationFlyInBottom}>
            Lorem ipsum dolor sit amet.
          </motion.h1>

          <motion.p {...scrollAnimationFlyInBottom}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            possimus tempore accusantium facere earum ab eligendi repellendus
            perspiciatis vero, iste obcaecati sed. Inventore atque beatae ipsum.
            Distinctio doloribus, odio a ipsa corrupti neque officiis nulla
            dignissimos! Quia non placeat animi eum labore rem! Ullam ab,
            distinctio suscipit sequi, ut ipsum et incidunt blanditiis
            laboriosam veniam vitae aliquid! Sequi ea obcaecati et asperiores
            tempora alias rem rerum cumque laborum voluptas error nam, fuga
            temporibus a quod atque animi incidunt fugiat magnam odio maxime
            blanditiis minus vero nisi! Eligendi magni, odit quisquam neque a
            error, facilis qui minima debitis est officiis quos ullam labore
            perferendis repellat sunt, pariatur modi ipsum consectetur possimus
            rerum inventore saepe. Cum consequuntur suscipit, iusto deserunt in
            eveniet dolore blanditiis facilis sequi, soluta magnam numquam
            voluptatum corrupti, facere possimus ratione autem. Culpa mollitia
            voluptate autem deleniti quos quasi reiciendis veniam nisi numquam
            at alias, illum corrupti iste similique debitis velit harum
            aspernatur nobis dolorem libero quia, cupiditate iure fugiat
            necessitatibus. Et culpa ab sint eius magnam. Nesciunt adipisci,
            eveniet qui, laborum eum incidunt distinctio repellat officiis
            delectus voluptate omnis velit laboriosam repudiandae totam et,
            deleniti dolor voluptatum culpa ab minus? Itaque exercitationem
            tempore, odit eaque excepturi aliquid blanditiis.
          </motion.p>
        </div>

        <OverlayScrollbarsComponent
          className="info-cards-container"
          options={{
            scrollbars: {
              autoHide: "leave",
              autoHideDelay: 150,
            },
            overflow: {
              x: "scroll",
              y: "hidden",
            },
          }}
          ref={infoCardsContainerRef}
        >
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
        </OverlayScrollbarsComponent>
      </section>

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
