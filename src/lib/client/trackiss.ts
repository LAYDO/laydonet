import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

type Units = "metric" | "imperial";

interface IssPayload {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility?: string;
  timestamp: number;
}

const ISS_ENDPOINT = "https://api.wheretheiss.at/v1/satellites/25544";
const REFRESH_INTERVAL = 20000;

function formatCoordinate(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(4)}`;
}

function formatDistance(value: number, units: Units) {
  return units === "metric" ? `${value.toFixed(1)} km` : `${value.toFixed(1)} mi`;
}

function formatSpeed(value: number, units: Units) {
  return units === "metric" ? `${value.toFixed(0)} km/h` : `${value.toFixed(0)} mph`;
}

function formatTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(timestamp * 1000));
}

async function fetchIss(units: Units) {
  const url = new URL(ISS_ENDPOINT);
  url.searchParams.set("units", units);
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`ISS request failed with ${response.status}`);
  }

  return (await response.json()) as IssPayload;
}

export function initTrackIss(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const scope = root.ownerDocument;
  const mapHost = root.querySelector<HTMLElement>("[data-iss-map]");
  const status = root.querySelector<HTMLElement>("[data-iss-status]");
  const timestamp = root.querySelector<HTMLElement>("[data-iss-timestamp]");
  const visibility = root.querySelector<HTMLElement>("[data-iss-visibility]");
  const latitude = root.querySelector<HTMLElement>("[data-iss-latitude]");
  const longitude = root.querySelector<HTMLElement>("[data-iss-longitude]");
  const altitude = root.querySelector<HTMLElement>("[data-iss-altitude]");
  const velocity = root.querySelector<HTMLElement>("[data-iss-velocity]");
  const metricButton = scope?.querySelector<HTMLButtonElement>("[data-iss-metric]");
  const imperialButton = scope?.querySelector<HTMLButtonElement>("[data-iss-imperial]");

  if (!mapHost || !status || !timestamp || !visibility || !latitude || !longitude || !altitude || !velocity) {
    return;
  }

  let units: Units = "metric";
  let map: ReturnType<typeof L.map> | undefined;
  let marker: ReturnType<typeof L.circleMarker> | undefined;
  let refreshTimer: number | undefined;

  const setActiveUnits = () => {
    metricButton?.setAttribute("aria-pressed", String(units === "metric"));
    imperialButton?.setAttribute("aria-pressed", String(units === "imperial"));
  };

  const syncMap = (payload: IssPayload) => {
    if (!map) {
      map = L.map(mapHost, {
        zoomControl: false,
        worldCopyJump: true,
        minZoom: 2
      }).setView([payload.latitude, payload.longitude], 4);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      marker = L.circleMarker([payload.latitude, payload.longitude], {
        radius: 9,
        color: "#b31f34",
        weight: 3,
        fillColor: "#f35e6b",
        fillOpacity: 0.95
      }).addTo(map);
      return;
    }

    marker?.setLatLng([payload.latitude, payload.longitude]);
    map.setView([payload.latitude, payload.longitude], Math.max(map.getZoom(), 4), { animate: true });
  };

  const updateView = async () => {
    status.textContent = "Fetching live ISS telemetry...";
    setActiveUnits();

    try {
      const payload = await fetchIss(units);
      latitude.textContent = formatCoordinate(payload.latitude);
      longitude.textContent = formatCoordinate(payload.longitude);
      altitude.textContent = formatDistance(payload.altitude, units);
      velocity.textContent = formatSpeed(payload.velocity, units);
      visibility.textContent = payload.visibility ?? "unknown";
      timestamp.textContent = formatTimestamp(payload.timestamp);
      status.textContent = `Live data updated in ${units} units.`;
      syncMap(payload);
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Unable to load ISS telemetry.";
    }
  };

  metricButton?.addEventListener("click", () => {
    units = "metric";
    void updateView();
  });

  imperialButton?.addEventListener("click", () => {
    units = "imperial";
    void updateView();
  });

  void updateView();
  refreshTimer = window.setInterval(() => void updateView(), REFRESH_INTERVAL);

  window.addEventListener("beforeunload", () => {
    if (refreshTimer) {
      window.clearInterval(refreshTimer);
    }
    map?.remove();
  });
}
