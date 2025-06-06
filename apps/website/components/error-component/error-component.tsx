"use client";
import Icon from "@/components/icon/icon";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import "./error-component.scss";

export default function ErrorComponent() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="error-component-container">
      <div className="route-error">
        <div className="route-error-info">
          <div className="error-status-text">
            <div className="error-status">404</div>
            Not Found
          </div>

          <p>{t("errorPage.routeError.title")}</p>

          <div className="error-buttons">
            <Link href="/">
              <button className="error-homepage">
                <p>{t("errorPage.routeError.buttons.0")}</p>
                <Icon name="arrow-right" className="error-icon" />
              </button>
            </Link>
            <button className="error-return" onClick={() => router.back()}>
              <p>{t("errorPage.routeError.buttons.1")}</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
