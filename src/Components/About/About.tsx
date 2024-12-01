import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Icon from "../Icon/Icon";
import InfoCard from "../InfoCard/InfoCard";
import "./About.scss";

export default function About() {
  return (
    <div id="about-page">
      <div className="hero-space">
        <div className="hero-image">
          <img src="/hero-image.png" alt="Picture of a student" />
        </div>

        <div className="hero-text">
          <h1>Dobrodošli u Elektrotehničku školu "Zemun"</h1>

          <p>
            U srcu Zemuna, naša škola pruža vrhunsko obrazovanje u oblasti
            elektrotehnike i računarstva. Sa modernim učionicama, vrhunskim
            nastavnicima i inovativnim pristupom učenju, pripremamo naše učenike
            za izazove budućnosti. Postanite deo naše zajednice i započnite
            svoje putovanje ka uspehu u svetu tehnologije!
          </p>

          <div className="hero-search-container">
            <Icon name="magnifying-glass" />
            <input type="text" placeholder="Pretrazite nas" />
            <button>Pretrazi</button>
          </div>
        </div>
      </div>

      <div className="overview">
        <h1>Lorem ipsum dolor sit amet.</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          possimus tempore accusantium facere earum ab eligendi repellendus
          perspiciatis vero, iste obcaecati sed. Inventore atque beatae ipsum.
          Distinctio doloribus, odio a ipsa corrupti neque officiis nulla
          dignissimos! Quia non placeat animi eum labore rem! Ullam ab,
          distinctio suscipit sequi, ut ipsum et incidunt blanditiis laboriosam
          veniam vitae aliquid! Sequi ea obcaecati et asperiores tempora alias
          rem rerum cumque laborum voluptas error nam, fuga temporibus a quod
          atque animi incidunt fugiat magnam odio maxime blanditiis minus vero
          nisi! Eligendi magni, odit quisquam neque a error, facilis qui minima
          debitis est officiis quos ullam labore perferendis repellat sunt,
          pariatur modi ipsum consectetur possimus rerum inventore saepe. Cum
          consequuntur suscipit, iusto deserunt in eveniet dolore blanditiis
          facilis sequi, soluta magnam numquam voluptatum corrupti, facere
          possimus ratione autem. Culpa mollitia voluptate autem deleniti quos
          quasi reiciendis veniam nisi numquam at alias, illum corrupti iste
          similique debitis velit harum aspernatur nobis dolorem libero quia,
          cupiditate iure fugiat necessitatibus. Et culpa ab sint eius magnam.
          Nesciunt adipisci, eveniet qui, laborum eum incidunt distinctio
          repellat officiis delectus voluptate omnis velit laboriosam
          repudiandae totam et, deleniti dolor voluptatum culpa ab minus? Itaque
          exercitationem tempore, odit eaque excepturi aliquid blanditiis.
        </p>
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
      >
        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />

        <InfoCard
          icon="history"
          link="/history"
          text={`Sa tradicijom dugom više od 130 godina, škola nudi savremene programe u skladu sa potrebama 21. veka.`}
          title="Istorija"
        />
      </OverlayScrollbarsComponent>
    </div>
  );
}
