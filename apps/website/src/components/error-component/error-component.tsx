import AppHeader from "@components/app-header/app-header";
import Icon from "@components/icon/icon";
import { Link, useAsyncError, useRouteError } from "react-router";
import "./error-component.scss";

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
  return (
    <div className="route-error">
      <div className="route-error-info">
        <div className="error-status-text">
          <div className="error-status">{error.status}</div>
          {error.statusText}
        </div>

        <p>Nismo mogli da pronadjemo stranu koju ste trazili.</p>

        <div className="error-buttons">
          <Link to="/">
            <button className="error-homepage">
              <p>Pocetna strana</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
          <Link to={-1 as unknown as string}>
            <button className="error-return">
              <p>Prosla strana</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AsyncError({ error }: AsyncErrorProps) {
  return (
    <div className="async-error">
      <div className="async-error-info">
        <div className="error-status-text">
          <div className="error-status">{error.status}</div>
          {error.statusText}
        </div>

        <p>Nismo mogli da pronadjemo stranu koju ste trazili.</p>

        <div className="error-buttons">
          <Link to="/">
            <button className="error-homepage">
              <p>Pocetna strana</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
          <Link to={-1 as unknown as string}>
            <button className="error-return">
              <p>Prosla strana</p>
              <Icon name="arrow-right" className="error-icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

