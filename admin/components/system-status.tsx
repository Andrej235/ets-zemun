import ServiceStatusIndicator from "./system-status-indicator";

type Status = "up" | "down";
export type ServiceStatus = {
  status: Status;
  delay: number;
};

export default async function SystemStatus() {
  async function getSystemStatus(url: string): Promise<ServiceStatus> {
    try {
      const now = performance.now();
      const response = await fetch(url, {
        method: "HEAD",
      });

      return {
        status: response.ok ? "up" : "down",
        delay: Math.round(performance.now() - now),
      };
    } catch {
      return {
        status: "down",
        delay: 0,
      };
    }
  }

  const urls = [
    "https://ets-zemun.edu.rs",
    "https://api.ets-zemun.edu.rs",
    "https://admin.ets-zemun.edu.rs",
  ];

  const [ets, api, admin] = await Promise.all(urls.map(getSystemStatus));

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Glavni sajt</p>
          <p
            className={`text-sm ${ets.status === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {ets.status === "up" ? `Radi (${ets.delay}ms)` : "Ne radi"}
          </p>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <ServiceStatusIndicator status={ets} emptyThreshold={3500} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">API</p>
          <p
            className={`text-sm ${api.status === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {api.status === "up" ? `Radi (${api.delay}ms)` : "Ne radi"}
          </p>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <ServiceStatusIndicator status={api} emptyThreshold={1000} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Admin panel</p>
          <p
            className={`text-sm ${admin.status === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {admin.status === "up" ? `Radi (${admin.delay}ms)` : "Ne radi"}
          </p>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <ServiceStatusIndicator status={admin} emptyThreshold={5000} />
        </div>
      </div>
    </div>
  );
}
