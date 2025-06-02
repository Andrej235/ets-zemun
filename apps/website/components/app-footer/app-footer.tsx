import Icon from "@/components/icon/icon";
import { useTranslations } from "next-intl";
import "./app-footer.scss";

export default function AppFooter() {
  const t = useTranslations();

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
              <a href="mailto:skola@ets-zemun.edu.rs">
                <span>{"skola@ets-zemun.edu.rs"}</span>
              </a>
            </p>
          </div>

          <div className="column">
            <p>
              <Icon name="user-tie" />
              <a href="mailto:direktor@ets-zemun.edu.rs">
                <span>{"direktor@ets-zemun.edu.rs"}</span>
              </a>
            </p>

            <p>
              <Icon name="user-edit" />
              <a href="mailto:sekretar@ets-zemun.edu.rs">
                <span>{"sekretar@ets-zemun.edu.rs"}</span>
              </a>
            </p>

            <p>
              <Icon name="calculator" />
              <a href="mailto:rac@ets-zemun.edu.rs">
                <span>{"rac@ets-zemun.edu.rs"}</span>
              </a>
            </p>

            <p>
              <Icon name="users" />
              <a href="mailto:ppsluzba@ets-zemun.edu.rs">
                <span>{"ppsluzba@ets-zemun.edu.rs"}</span>
              </a>
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
              href={"https://www.nenadic.dev"}
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

        <p className="open-source">
          <span>{t("footer.openSource")}</span>
          <a
            href="https://github.com/andrej235/ets-zemun"
            target="_blank"
            aria-label="GitHub repository"
          >
            <span>GitHub{t("footer.githubSuffix")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}
