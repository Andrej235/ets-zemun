import Icon from "../Icon/Icon";
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
    </div>
  );
}
