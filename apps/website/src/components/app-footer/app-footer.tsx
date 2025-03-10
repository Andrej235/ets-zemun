import Icon from "@components/icon/icon";
import { useTranslation } from "react-i18next";
import "./app-footer.scss";

export default function AppFooter() {
  const { t } = useTranslation();

  return (
    <footer id="app-footer">
      <div className="info">
        <div className="about">
          <h1>{t("footer.about.title")}</h1>

          <p>{t("footer.about.description")}</p>
        </div>

        <div className="contact">
          <h1>{t("footer.contact.title")}</h1>

          <div className="column">
            <p>
              <Icon name="location-dot" />
              <span>{t("footer.contact.address")}</span>
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
        <div className="copy-container">
          <p className="copy">
            &copy; {" " + new Date().getFullYear() + " "}{" "}
            {t("footer.copyright")}
          </p>

          <p className="credits">
            <span className="separator" />
            <span>{t("footer.credits.createdBy")}</span>
            <a
              href={"https://github.com/andrej235"}
              target="_blank"
              aria-label={t("footer.credits.prefix")}
            >
              {t("footer.credits.andrej")}
            </a>
            <span>{"&"}</span>
            <a
              href={"https://github.com/andjelic-a"}
              target="_blank"
              aria-label={t("footer.credits.prefix")}
            >
              {t("footer.credits.aleksa")}
            </a>
          </p>
        </div>

        <div className="social-media-links">
          <a
            href={"https://www.linkedin.com"}
            aria-label={t("footer.socialMedia.0")}
          >
            <Icon name="linkedin" />
          </a>

          <a href={"https://www.x.com"} aria-label={t("footer.socialMedia.1")}>
            <Icon name="twitter" />
          </a>

          <a
            href={"https://www.instagram.com"}
            aria-label={t("footer.socialMedia.2")}
          >
            <Icon name="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

