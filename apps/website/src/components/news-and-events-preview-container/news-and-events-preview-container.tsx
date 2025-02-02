import { useState } from "react";
import NewsPreview from "@components/news-preview/news-preview";
import "./news-and-events-preview-container.scss";
import { motion } from "motion/react";
import Icon from "@components/icon/icon";
import { Link } from "react-router";

export default function NewsAndEventsPreviewContainer() {
  const [selectedTab, setSelectedTab] = useState<"news" | "events">("news");

  return (
    <div className="news-container">
      <h1 className="news-section-title">Novosti i dogadjanja</h1>
      <div className="options-container">
        <button
          className={`option-button${
            selectedTab === "news" ? " selected-tab" : ""
          }`}
          onClick={() => setSelectedTab("news")}
        >
          <p>Novosti</p>

          {selectedTab === "news" && (
            <motion.div
              className="underline"
              layoutId="underline"
              layoutDependency={selectedTab}
            />
          )}
        </button>

        <button
          className={`option-button${
            selectedTab === "events" ? " selected-tab" : ""
          }`}
          onClick={() => setSelectedTab("events")}
        >
          <p>Dogadjanja</p>

          {selectedTab === "events" && (
            <motion.div
              className="underline"
              layoutId="underline"
              layoutDependency={selectedTab}
            />
          )}
        </button>
      </div>

      {selectedTab === "news" ? (
        <section className="news-and-events-section">
          <div className="news-events-container">
            <NewsPreview
              date={new Date("2024-10-28")}
              title="Beograd ispod Beograda"
              description="Odeljenje 2/4 sa razrednim starešinom Marinom Ristanović danas je istražilo tajne podzemnog Beograda. U pratnji stručnog vodiča, posetili su Karađorđevu kapiju, bunker iz 1948, Rimski bunar i barutanu sa rimskim sarkofazima. Obilazak je započet kod spomenika Francuskoj na Kalemegdanu, a završen u Donjem gradu uz priču o majoru Gavriloviću i Fransisu Makenziju. Nezaboravno putovanje kroz istoriju!"
              image="/images/news/underground.jpg"
            />

            <NewsPreview
              date={new Date("2024-10-15")}
              title="Dan škole 2024"
              description="Svečana sala škole pretvorila se 5. oktobra u pozornicu mladih umetnika. Učenici su kroz kombinovanu predstavu — od klasičnih pozorišnih scena do modernih koreografija i horskog pevanja — proslavili Dan škole. Nastup je uključivao i multimedijalne projekcije, oslikavajući istoriju škole i njene vrednosti. 'Ovo je dan kada škola sija kroz svoje učenike', istakla je direktorka."
              image="/images/news/school-day.jpg"
            />

            <NewsPreview
              date={new Date("2024-02-24")}
              title="Poezija uživo!"
              description="Šesti ciklus 'Poezija uživo!' Radio Beograda 2 i Zadužbine Kolarca posvećen je Srđanu Gagiću, pesniku i profesoru. U subotu, 24. februara u 19:00, u Kolarčevoj zadužbini oživeće njegove stihove uz direktan prenos na radiju. Gagić, dobitnik Brankove nagrade za knjigu Deca u izlogu, deliće svoju poeziju sa publikom. Ulaznice su dostupne na blagajni Zadužbine."
              image="/images/news/live-poetry.jpg"
            />
          </div>

          <Link to="/novosti" className="view-all-link">
            <p>Sve Novosti</p>
            <Icon name="arrow-right" />
          </Link>
        </section>
      ) : (
        <section className="news-and-events-section">
          <div className="news-events-container">
            <NewsPreview
              date={new Date()}
              title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, sapiente?"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quasi cumque enim dolores molestiae dolorum dolore accusamus! In, praesentium quibusdam."
              image="/mock-news-preview/1.jpg"
            />
            <NewsPreview
              date={new Date("2024-05-15")}
              title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elitadipisicing elit. Minus amet ea saepe corporis, quam labore officia obcaecati necessitatibus itaque quo optio? Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam ."
              image="/mock-news-preview/2.jpg"
            />
            <NewsPreview
              date={new Date("2024-01-23")}
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatibus beatae minima!"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam doloremque voluptatum officiis magnam error dignissimos vitae excepturi temporibus maiores reiciendis veniam ipsam! Tempora nobis aliquid eligendi qui."
              image="/mock-news-preview/3.jpg"
            />
          </div>

          <Link to="/novosti" className="view-all-link">
            <p>Sve Novosti</p>
            <Icon name="arrow-right" />
          </Link>
        </section>
      )}
    </div>
  );
}

