import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import Icon from "../Icon/Icon";
import InfoCard from "../InfoCard/InfoCard";
import "./About.scss";
import ProfileOverview from "../ProfileOverview/ProfileOverview";
import { animate, motion, scroll, Target, Transition } from "motion/react";
import { useEffect, useRef } from "react";
import NewsAndEventsPreviewContainer from "../NewsAndEventsPreviewContainer/NewsAndEventsPreviewContainer";

export type ScrollAnimation = {
  initial: Target;
  whileInView: Target;
  transition: Transition;
  viewport: {
    once: boolean;
  };
};

const scrollAnimationFlyInTop: ScrollAnimation = {
  initial: {
    opacity: 0,
    y: -100,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
  },
  viewport: {
    once: true,
  },
};

const delay: Transition = {
  duration: 0.5,
  delay: 0.2,
};

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
  }, [infoCardsContainerRef.current]);

  return (
    <div id="about-page">
      <section>
        <div className="hero-space">
          <motion.div className="hero-image" {...scrollAnimationFlyInTop}>
            <img src="/hero-image.png" alt="Picture of a student" />
          </motion.div>

          <motion.div className="hero-text" {...scrollAnimationFlyInTop}>
            <h1>Dobrodošli u Elektrotehničku školu "Zemun"</h1>

            <p>
              U srcu Zemuna, naša škola pruža vrhunsko obrazovanje u oblasti
              elektrotehnike i računarstva. Sa modernim učionicama, vrhunskim
              nastavnicima i inovativnim pristupom učenju, pripremamo naše
              učenike za izazove budućnosti. Postanite deo naše zajednice i
              započnite svoje putovanje ka uspehu u svetu tehnologije!
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="overview">
          <motion.h1 {...scrollAnimationFlyInTop}>
            Lorem ipsum dolor sit amet.
          </motion.h1>

          <motion.p {...scrollAnimationFlyInTop} {...delay}>
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

      <section>
        <div className="profiles-overview-container">
          <ProfileOverview
            name="Elektrotehničar informacionih tehnologija"
            briefDescription="Elektrotehničar informacionih tehnologija je obrazovni profil koji priprema učenike za rad u oblasti IT industrije. Fokusira se na razvoj softverskih aplikacija, kreiranje baza podataka, kao i dizajn i implementaciju statičkih i dinamičkih web stranica. Učenici se takođe osposobljavaju za održavanje i zaštitu informacionih sistema, što ih čini konkurentnim na tržištu rada u sektoru tehnologije i digitalnih rešenja."
            image="/profile-representations/it.png"
            layout="image-left"
          />

          <ProfileOverview
            name="Administrator računarskih mreža"
            briefDescription="Ovaj obrazovni profil omogućava učenicima da steknu veštine u oblasti administracije računarskih mreža. Uči ih kako da postavljaju, održavaju i nadgledaju mrežnu opremu, kao i kako da obezbede sigurnost mrežnih sistema. Takođe, učenici se osposobljavaju za rad sa različitim operativnim sistemima i dijagnostiku mrežnih problema, što je ključno za rad u firmama koje koriste računarske mreže i internet servise."
            image="/profile-representations/mreze.png"
            layout="image-right"
          />

          <ProfileOverview
            name="Elektrotehničar računara"
            briefDescription="Profil elektrotehničara računara obuhvata rad sa računarima, kako na hardverskom, tako i na softverskom nivou. Učenici se obučavaju za konfiguraciju računarskih sistema, programiranje na različitim jezicima, kao i za rad sa bazama podataka i računarima povezanim u mreže. Ovaj profil pruža znanja koja omogućavaju rad u industriji, nauci, medicini i drugim sektorima gde su računari ključni za obradnu i analizu podataka."
            image="/profile-representations/racunari.png"
            layout="image-left"
          />

          <ProfileOverview
            name="Elektrotehničar automatike"
            briefDescription="Elektrotehničar automatike je profil koji priprema učenike za rad sa automatizovanim sistemima u industriji. Učenici stiču znanje o projektovanju, održavanju i nadzoru industrijskih automatizovanih sistema, upravljanju mašinama i robotima, kao i kontroli proizvodnih procesa. Ovaj smer je ključan za industrije koje se bave proizvodnjom, energetikom i drugim oblastima gde je potrebna visoka preciznost i efikasnost u radu."
            image="/profile-representations/automatika.png"
            layout="image-right"
          />

          <ProfileOverview
            name="Elektromehaničar za rashladne i termičke uređaje"
            briefDescription="Elektromehaničar za rashladne i termičke uređaje obučava učenike za rad sa različitim vrstama rashladnih i klimatskih uređaja, kao i za montažu, održavanje i popravku ovih sistema. Učenici stiču znanja o električnim instalacijama, termalnim procesima i uređajima koji koriste termalne i rashladne sisteme. Ovaj profil pruža praktične veštine za rad u industriji, domaćinstvima i servisima za klimatizaciju i hlađenje."
            image="/profile-representations/klime.png"
            layout="image-left"
          />
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
