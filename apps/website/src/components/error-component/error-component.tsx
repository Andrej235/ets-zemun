import { Link, useAsyncError, useRouteError } from "react-router";
import "./error-component.scss";
import AppHeader from "@components/app-header/app-header";

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
            <button className="error-homepage">Pocetna strana</button>
          </Link>
          <Link to="/">
            <button className="error-return">Prosla strana</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AsyncError({ error }: AsyncErrorProps) {
  return (
    <div className="async-error">
      <h1>Izgleda da je doslo do greske ({error.status})</h1>

      <Link to="0">Vrati se na pocetnu stranicu</Link>
    </div>
  );
}

