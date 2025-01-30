import Icon from "@components/icon/icon";
import "./app-footer.scss";

export default function AppFooter() {
  return (
    <footer id="app-footer">
      <div className="info">
        <div className="about">
          <h1>O nama</h1>

          <p>
            Sa ciljom da obezbedimo kvalitetno obrazovanje i podstaknemo
            samostalno učenje i razvoj učenika težimo tome da oni izrastu u
            odgovorne i preduzimljive ličnosti u sigurnom i podsticajnom
            okruženju
          </p>
        </div>

        <div className="contact">
          <h1>Kontakt</h1>

          <div className="column">
            <p>
              <Icon name="location-dot" />
              <span>Beograd – Zemun, Nade Dimić 4</span>
            </p>

            <p>
              <Icon name="phone" />
              <span>+381 11 316 1849</span>
            </p>

            <p>
              <Icon name="phone" />
              <span>+381 11 261 8155</span>
            </p>

            <p>
              <Icon name="envelope" />
              <span>{"skola@ets-zemun.edu.rs"}</span>
            </p>
          </div>

          <div className="column">
            <p>
              <Icon name="user-tie" />
              <span>{"direktor@ets-zemun.edu.rs"}</span>
            </p>

            <p>
              <Icon name="user-edit" />
              <span>{"sekretar@ets-zemun.edu.rs"}</span>
            </p>

            <p>
              <Icon name="calculator" />
              <span>{"rac@ets-zemun.edu.rs"}</span>
            </p>

            <p>
              <Icon name="users" />
              <span>{"ppsluzba@ets-zemun.edu.rs"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p className="copy">
          &copy; {" " + new Date().getFullYear() + " "} Elektrotehnička škola
          "Zemun"
        </p>

        <p className="credits">
          <span className="separator" />
          <span>{"Made by: "}</span>
          <a href={"https://github.com/andrej235"} target="_blank">
            {"Andrej Nenadić"}
          </a>
          <span>{"&"}</span>
          <a href={"https://github.com/andjelic-a"} target="_blank">
            {"Aleksa Andjelić"}
          </a>
        </p>

        <div className="social-media-links">
          <a
            href={"https://www.linkedin.com"}
            aria-label="Školski linkedin nalog"
          >
            <Icon name="linkedin" />
          </a>

          <a href={"https://www.x.com"} aria-label="Školski twitter nalog">
            <Icon name="twitter" />
          </a>

          <a
            href={"https://www.instagram.com"}
            aria-label="Školski instagram nalog"
          >
            <Icon name="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

