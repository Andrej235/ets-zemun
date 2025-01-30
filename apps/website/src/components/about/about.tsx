import { useMemo, useRef } from "react";
import "./about.scss";
import NewsAndEventsPreviewContainer from "@components/news-and-events-preview-container/news-and-events-preview-container";
import FluidCanvas from "../../fluid-canvas/fluid-canvas";
import HeroInfoCard from "./hero-info-card";
import SchoolPreviewCard from "@components/school-preview-card/school-preview-card";

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
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>Elektrotehnička škola "Zemun"</h1>
            <h2>Mi ne čekamo budućnost, mi joj idemo u susret!</h2>
          </div>

          <img src="/hero-image.jpeg" alt="student" />
        </div>

        <div className="hero-block" ref={heroSpaceRef}>
          {!fluidCanvas}

          <div className="hero-cards">
            <HeroInfoCard
              icon="trophy"
              title="Takmičenja i nagrade"
              description="Ovo je deskripcija!"
              url={"/takmicenja"}
            />

            <HeroInfoCard
              icon="chalkboard-teacher"
              title="Nastavnici"
              description="Ovo je deskripcija!"
              url={"/nastavnici"}
            />

            <HeroInfoCard
              icon="history"
              title="Istorija"
              description="Ovo je deskripcija!"
              url={"/istorija"}
            />

            <HeroInfoCard
              icon="pencil-alt"
              title="Upis i prijem"
              description="Ovo je deskripcija!"
              url={"/upis"}
            />
          </div>

          <div className="overview">
            <div className="overview-info">
              <h1>Misija i Vizija</h1>
              <p>
                Naša misija je da omogućimo obrazovanje i stvorimo buduće
                stručnjake i naučne radnike iz oblasti koje obuhvata naš školski
                program. Nastojimo da kod učenika probudimo želju za
                usavršavanjem i sticanjem znanja, da su u stanju da samostalno
                istražuju i obrađuju informacije do kojih dolaze uz korišćenje
                svih dostupnih izvora.
              </p>
              <p>
                Njihovo zadovoljstvo u sticanju znanja i bezbednost su nam
                najveći prioriteti. Podstičemo kreativnost učenika kroz razne
                vannastavne aktivnosti. Stvorili smo takvo okruženje da je
                učenik u centru nastavnog procesa i učenja. Želimo da naša deca
                postanu preduzimljive i savesne ličnosti. Pozivamo Vas da
                zajedno sa nama menjamo sadašnjost i stvaramo svetliju
                budućnost.
              </p>
            </div>

            <div className="overview-image">
              <img src="/images/414bee0337a871bdd69bc69aadaf2c79.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="school-preview-cards-container">
        <SchoolPreviewCard
          count={100}
          image="/mock-news-preview/1.png"
          title="Iskusnih nastavnika"
          description="Naš tim čine preko 100 stručnih nastavnika sa bogatim iskustvom i visokim kvalifikacijama. Kroz individualni pristup, interaktivne metode i stalno usavršavanje, oni podstiču kritičko razmišljanje i ljubav prema učenju. Svaki nastavnik radi na tome da učenici postanu samouvereni, kreativni i spremni za izazove 21. veka."
          layout="image-left"
        />

        <SchoolPreviewCard
          count={750}
          image="/mock-news-preview/2.png"
          title="Učenika u dinamičnoj zajednici"
          description="Škola okuplja preko 750 učenika različitih interesa i potencijala. Kroz timske projekte, umetničke radionice, sportske aktivnosti i volontirske programe, gradimo zajednicu gde svako nalazi svoje mesto. Podržavamo učenike da razviju ne samo znanje već i emocionalnu inteligenciju i društvene veštine."
          layout="image-right"
        />

        <SchoolPreviewCard
          count={40}
          title="Moderno opremljenih kabineta"
          image="/mock-news-preview/3.png"
          description="Raspolažemo sa više od 40 specijalizovanih kabineta opremljenih digitalnim tablama, laboratorijskim instrumentima i inovativnim softverom. Prostorije su dizajnirane da podrže timski rad, eksperimente i multidisciplinarne projekte, omogućavajući učenicima da istražuju i stvaraju u inspirativnom okruženju."
          layout="image-left"
        />

        <SchoolPreviewCard
          count={15}
          title="Osvojenih nagrada"
          image="/mock-news-preview/1.png"
          description="Naš rad prepoznat je kroz brojne nagrade u oblastima digitalne obrazovanja, naučnih olimpijada i društveno korisnih projekata. Ova priznanja su rezultat posvećenosti celog tima da kroz napredak i etički pristup budimo najbolje u svakom učeniku."
          layout="image-right"
        />
      </section>

      <section className="call-to-action">
        <h1>Pridružite se našoj obrazovnoj porodici!</h1>

        <p>
          Otvorite vrata ka budućnosti gde se tradicija kombinuje sa
          tehnologijom, a svaki učenik je deo priče o uspehu. Posetite nas i
          saznajte kako gradimo svet koji inspiriše!
        </p>

        <div className="call-to-action-buttons">
          <button className="primary">Prijavite se</button>
          <button className="secondary">Zakazite sastanak</button>
        </div>

        <div className="orientation-test">
          <h2>I dalje niste sigurni?</h2>

          <div>
            <p>
              Odratite kratak test da vidite da li bi vam bas nasa skola
              odgovarala!
            </p>

            <button className="secondary">Probajte test</button>
          </div>
        </div>
      </section>

      <section>
        <NewsAndEventsPreviewContainer />
      </section>
    </div>
  );
}

