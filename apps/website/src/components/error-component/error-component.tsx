import AppHeader from "@/components/app-header/app-header";
import Icon from "@/components/icon/icon";
import { Link, useAsyncError, useRouteError } from "react-router";
import "./error-component.scss";
import { useTranslation } from "react-i18next";

type RouteError = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: object;
};

type AsyncError = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: object;
};

type RouteErrorProps = {
  readonly error: RouteError;
};

type AsyncErrorProps = {
  readonly error: AsyncError;
};

export default function ErrorComponent() {
  const routeError = useRouteError() as RouteError | undefined;
  const asyncError = useAsyncError() as AsyncError | undefined;

  return (
    <div className="error-component-container">
      <AppHeader />
      {routeError && <RouteError error={routeError} />}
      {asyncError && <AsyncError error={asyncError} />}
    </div>
  );
}

function RouteError({ error }: RouteErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="route-error">
      <div className="route-error-info">
        <div className="error-status-text">
          <div className="error-status">{error.status}</div>
          {error.statusText}
        </div>

        <p>{t("errorPage.routeError.title")}</p>

        <div className="error-buttons">
          <Link to="/">
            <button className="error-homepage">
              <p>{t("errorPage.routeError.buttons.0")}</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
          <Link to={-1 as unknown as string}>
            <button className="error-return">
              <p>{t("errorPage.routeError.buttons.1")}</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AsyncError({ error }: AsyncErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="async-error">
      <div className="async-error-info">
        <div className="error-status-text">
          <div className="error-status">{error.status}</div>
          {error.statusText}
        </div>

        <p>{t("errorPage.asyncError.title")}</p>

        <div className="error-buttons">
          <Link to="/">
            <button className="error-homepage">
              <p>{t("errorPage.asyncError.buttons.0")}</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
          <Link to={-1 as unknown as string}>
            <button className="error-return">
              <p>{t("errorPage.asyncError.buttons.1")}</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

