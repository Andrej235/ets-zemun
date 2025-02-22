import Icon from "@components/icon/icon";
import NewsPreview from "@components/news-preview/news-preview";
import { Link } from "react-router";
import "./news-preview-container.scss";

export default function NewsPreviewContainer() {
  return (
    <div className="news-wrapper">
      <h1 className="news-section-title">Novosti</h1>
      <section className="news-section">
        <div className="news-container">
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
    </div>
  );
}

