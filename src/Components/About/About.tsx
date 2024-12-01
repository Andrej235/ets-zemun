import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Icon from "../Icon/Icon";
import InfoCard from "../InfoCard/InfoCard";
import "./About.scss";
import ProfileOverview from "../ProfileOverview/ProfileOverview";
import NewsPreview from "../../NewsPreview/NewsPreview";

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

      <div className="news-container">
        <h1 className="news-section-title">Novosti</h1>

        <NewsPreview
          date={new Date()}
          title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, sapiente?"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quasi cumque enim dolores molestiae dolorum dolore accusamus! In, praesentium quibusdam."
          image="/mock-news-preview/1.png"
        />

        <NewsPreview
          date={new Date("2024-05-15")}
          title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elitadipisicing elit. Minus amet ea saepe corporis, quam labore officia obcaecati necessitatibus itaque quo optio? Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam doloremque voluptatum officiis magnam error dignissimos vitae excepturi temporibus maiores reiciendis veniam ipsam! Tempora nobis aliquid eligendi qui."
          image="/mock-news-preview/2.png"
        />

        <NewsPreview
          date={new Date("2024-01-23")}
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatibus beatae minima!"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam doloremque voluptatum officiis magnam error dignissimos vitae excepturi temporibus maiores reiciendis veniam ipsam! Tempora nobis aliquid eligendi qui."
          image="/mock-news-preview/3.png"
        />
      </div>
    </div>
  );
}
