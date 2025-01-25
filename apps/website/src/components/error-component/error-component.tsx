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
      {routeError && <RouteError error={routeError} />}
      {asyncError && <AsyncError error={asyncError} />}
    </div>
  );
}

function RouteError({ error }: RouteErrorProps) {
  return (
    <div className="route-error">
      <h1>
        Izgleda da ste pokusali da pristupite ne postojecem linku (
        {error.status})
      </h1>

      <Link to="/">Vrati se na pocetnu stranicu</Link>
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

