import * as L from "leaflet";
import * as SunCalc from "suncalc";
import "leaflet/dist/leaflet.css";

type UnitSystem = "imperial" | "metric";

type GeocodingResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
};

type ReverseGeocodingResult = {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    hamlet?: string;
    locality?: string;
    suburb?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  display_name?: string;
};

type OpenMeteoWeather = {
  timezone?: string;
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
    wind_direction_10m?: number;
    relative_humidity_2m?: number;
    visibility?: number;
    precipitation?: number;
    rain?: number;
    showers?: number;
    snowfall?: number;
    weather_code?: number;
    cloud_cover?: number;
    surface_pressure?: number;
    uv_index?: number;
    is_day?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    weather_code?: number[];
    precipitation_probability?: number[];
    cloud_cover?: number[];
  };
  daily?: {
    time?: string[];
    sunrise?: string[];
    sunset?: string[];
    daylight_duration?: number[];
    sunshine_duration?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
  };
};

type AirQualityData = {
  current?: {
    us_aqi?: number;
    pm2_5?: number;
    pm10?: number;
    ozone?: number;
    nitrogen_dioxide?: number;
    sulphur_dioxide?: number;
    carbon_monoxide?: number;
  };
};

type WeatherPayload = {
  aqi: AirQualityData;
  city: GeocodingResult;
  unit: UnitSystem;
  weather: OpenMeteoWeather;
};

type WeatherRequest =
  | { kind: "city"; cityName: string }
  | { kind: "coordinates"; latitude: number; longitude: number; label: string; timezone?: string };

type WeatherKind = "clear" | "partly" | "cloud" | "fog" | "rain" | "snow" | "storm";
type WeatherLight = "day" | "night";
type CelestialKind = "sunrise" | "sunset" | "moonrise" | "moonset";

type CelestialEvent = {
  kind: CelestialKind;
  time: Date;
  previousTime?: Date;
};

const unitStorageKey = "laydonet-weather-unit";
const hourMs = 60 * 60 * 1000;

const weatherCodes: Record<number, { kind: WeatherKind; label: string }> = {
  0: { kind: "clear", label: "Clear sky" },
  1: { kind: "partly", label: "Mainly clear" },
  2: { kind: "partly", label: "Partly cloudy" },
  3: { kind: "cloud", label: "Overcast" },
  45: { kind: "fog", label: "Fog" },
  48: { kind: "fog", label: "Rime fog" },
  51: { kind: "rain", label: "Light drizzle" },
  53: { kind: "rain", label: "Drizzle" },
  55: { kind: "rain", label: "Dense drizzle" },
  56: { kind: "rain", label: "Freezing drizzle" },
  57: { kind: "rain", label: "Freezing drizzle" },
  61: { kind: "rain", label: "Slight rain" },
  63: { kind: "rain", label: "Rain" },
  65: { kind: "rain", label: "Heavy rain" },
  66: { kind: "rain", label: "Freezing rain" },
  67: { kind: "rain", label: "Freezing rain" },
  71: { kind: "snow", label: "Light snow" },
  73: { kind: "snow", label: "Snow" },
  75: { kind: "snow", label: "Heavy snow" },
  77: { kind: "snow", label: "Snow grains" },
  80: { kind: "rain", label: "Rain showers" },
  81: { kind: "rain", label: "Heavy showers" },
  82: { kind: "rain", label: "Violent showers" },
  85: { kind: "snow", label: "Snow showers" },
  86: { kind: "snow", label: "Heavy snow showers" },
  95: { kind: "storm", label: "Thunderstorm" },
  96: { kind: "storm", label: "Thunderstorm with hail" },
  99: { kind: "storm", label: "Thunderstorm with hail" }
};

const query = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector);

const setText = (selector: string, text: string) => {
  const el = query(selector);
  if (el) el.textContent = text;
};

const clearChildren = (element: HTMLElement | null) => {
  element?.replaceChildren();
};

const safeNumber = (value: number | undefined) => typeof value === "number" && Number.isFinite(value);

const round = (value: number | undefined, digits = 0) => {
  if (!safeNumber(value)) return "--";
  return value!.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  });
};

const formatTemperature = (value: number | undefined) => (safeNumber(value) ? `${Math.round(value!)}°` : "--");

const formatMainTemperature = (value: number | undefined, unit: UnitSystem) =>
  safeNumber(value) ? `${Math.round(value!)}° ${unit === "imperial" ? "F" : "C"}` : "--";

const formatPercent = (value: number | undefined) => (safeNumber(value) ? `${Math.round(value!)}%` : "--");

const formatPressure = (value: number | undefined) => (safeNumber(value) ? `${Math.round(value!)} hPa` : "--");

const formatWind = (value: number | undefined, unit: UnitSystem) => {
  if (!safeNumber(value)) return "--";
  return `${Math.round(value!)} ${unit === "imperial" ? "mph" : "km/h"}`;
};

const formatVisibility = (value: number | undefined, unit: UnitSystem) => {
  if (!safeNumber(value)) return "--";
  if (unit === "imperial") {
    return `${round(value! / 5280, 1)}\u00a0mi`;
  }
  return `${round(value! / 1000, 1)}\u00a0km`;
};

const formatPrecip = (value: number | undefined, unit: UnitSystem) => {
  if (!safeNumber(value)) return "--";
  return `${round(value, unit === "imperial" ? 2 : 1)} ${unit === "imperial" ? "in" : "mm"}`;
};

const formatTime = (value: string | Date | undefined, timezone?: string) => {
  if (!value) return "--";
  if (typeof value === "string") {
    const match = value.match(/T(\d{2}):(\d{2})/);
    if (match) {
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(2000, 0, 1, Number(match[1]), Number(match[2])));
    }
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone
  }).format(date);
};

const formatHour = (value: string) => {
  const match = value.match(/T(\d{2}):/);
  if (match) {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric"
    }).format(new Date(2000, 0, 1, Number(match[1]), 0));
  }
  return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(new Date(value));
};

const formatDay = (value: string, index: number) => {
  if (index === 0) return "Today";
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short"
    }).format(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  }
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short"
  }).format(new Date(`${value}T12:00:00`));
};

const formatDuration = (seconds: number | undefined) => {
  if (!safeNumber(seconds)) return "--";
  const hours = Math.floor(seconds! / 3600);
  const minutes = Math.round((seconds! % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
};

const formatCountdown = (from: Date, to: Date | undefined) => {
  if (!to || Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return "--";
  const totalSeconds = Math.max(0, Math.ceil((to.getTime() - from.getTime()) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
};

const aqLabel = (value: number | undefined) => {
  if (!safeNumber(value)) return "Unavailable";
  if (value! <= 50) return "Good";
  if (value! <= 100) return "Moderate";
  if (value! <= 150) return "Sensitive";
  if (value! <= 200) return "Unhealthy";
  if (value! <= 300) return "Very unhealthy";
  return "Hazardous";
};

const uvLabel = (value: number | undefined) => {
  if (!safeNumber(value)) return "Low";
  if (value! <= 2) return "Low";
  if (value! <= 5) return "Moderate";
  if (value! <= 7) return "High";
  if (value! <= 10) return "Very high";
  return "Extreme";
};

const weatherInfo = (code: number | undefined) => {
  if (!safeNumber(code)) return { kind: "cloud" as WeatherKind, label: "Weather unavailable" };
  return weatherCodes[code!] ?? { kind: "cloud" as WeatherKind, label: `Weather code ${code}` };
};

const dominantPrecip = (current: OpenMeteoWeather["current"]) =>
  current?.precipitation ?? current?.rain ?? current?.showers ?? current?.snowfall;

const fetchJson = async <T,>(url: string, signal?: AbortSignal) => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

let map: L.Map | null = null;
let marker: L.CircleMarker | null = null;
let activeRequest = 0;
let activeController: AbortController | null = null;
let celestialTimer: number | undefined;
let lastCity = "Chicago";
let lastRequest: WeatherRequest = { kind: "city", cityName: lastCity };
let currentUnit: UnitSystem = "imperial";

const renderMap = (latitude: number, longitude: number, label: string) => {
  const mapElement = document.getElementById("weather-map");
  if (!mapElement) return;

  if (!map) {
    map = L.map(mapElement, {
      scrollWheelZoom: false,
      zoomControl: true
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  }

  marker?.remove();
  marker = L.circleMarker([latitude, longitude], {
    color: "#000020",
    fillColor: "#5fb6df",
    fillOpacity: 0.95,
    radius: 8,
    weight: 2
  }).addTo(map);
  marker.bindTooltip(label, { permanent: false });
  map.setView([latitude, longitude], 9);
  window.setTimeout(() => map?.invalidateSize(), 0);
};

const weatherGlyph = (kind: WeatherKind, compact = false, light: WeatherLight = "day") => {
  const className = `weather-glyph${compact ? " weather-glyph--small" : ""} weather-glyph--${light}`;
  const sun = `
    <g class="weather-glyph__sun-group">
      <circle class="weather-glyph__sun" cx="58" cy="50" r="18" />
      <g class="weather-glyph__ray">
        <path d="M58 15v12M58 73v12M23 50h12M81 50h12M33.3 25.3l8.4 8.4M74.3 66.3l8.4 8.4M82.7 25.3l-8.4 8.4M41.7 66.3l-8.4 8.4" />
      </g>
    </g>`;
  const cloud = `
    <g class="weather-glyph__cloud-group">
      <path class="weather-glyph__cloud weather-glyph__cloud--back" d="M30 72h58c13 0 22-8 22-20 0-10-8-18-19-19-5-13-17-21-32-21-16 0-28 10-31 25-13 2-21 11-21 23 0 8 4 12 10 12h13Z" />
      <path class="weather-glyph__cloud weather-glyph__cloud--front" d="M29 87h54c13 0 23-8 23-20 0-10-8-18-19-19-5-12-17-20-31-20-15 0-27 9-31 23-13 2-22 11-22 23 0 8 5 13 13 13h13Z" />
    </g>
  `;
  const moon = `
    <g class="weather-glyph__night-moon">
      <path class="weather-glyph__moon-crescent" d="M76 23c-13 6-22 19-22 34s9 28 22 34c-4 2-9 3-14 3-21 0-38-17-38-38s17-38 38-38c5 0 10 1 14 3Z" />
    </g>`;
  const rain = `<g class="weather-glyph__rain"><path d="M34 88l-8 18M57 88l-8 18M80 88l-8 18" /></g>`;
  const snow = `<g class="weather-glyph__snow"><path d="M34 92h16M42 84v16M70 92h16M78 84v16" /></g>`;
  const storm = `<path class="weather-glyph__bolt" d="M58 70 43 98h15l-5 22 24-34H62l8-16Z" />`;
  const fog = `<g class="weather-glyph__fog"><path d="M16 78h80M26 92h64M18 106h82" /></g>`;

  const content: Record<WeatherKind, string> = {
    clear: light === "night" ? moon : sun,
    partly:
      light === "night"
        ? `<g transform="translate(-9 -7) scale(.82)">${moon}</g><g transform="translate(9 18) scale(.84)">${cloud}</g>`
        : `${sun}<g transform="translate(6 14) scale(.86)">${cloud}</g>`,
    cloud,
    fog: `${cloud}${fog}`,
    rain: `${cloud}${rain}`,
    snow: `${cloud}${snow}`,
    storm: `${cloud}${storm}`
  };

  return `<svg class="${className}" viewBox="0 0 120 120" aria-hidden="true">${content[kind]}</svg>`;
};

const forecastIcon = (kind: WeatherKind, light: WeatherLight = "day") => {
  const sun = `
    <g class="weather-forecast-icon__sun">
      <circle cx="31" cy="20" r="7" />
      <path d="M31 5v5M31 30v5M16 20h5M41 20h5M20.4 9.4l3.5 3.5M38.1 27.1l3.5 3.5M41.6 9.4l-3.5 3.5M23.9 27.1l-3.5 3.5" />
    </g>
  `;
  const moon = `
    <g class="weather-forecast-icon__moon">
      <path d="M36 9c-7 3-12 10-12 18s5 15 12 18c-2 1-4 1.5-7 1.5-10.8 0-19.5-8.7-19.5-19.5S18.2 7.5 29 7.5c3 0 5 .5 7 1.5Z" />
    </g>
  `;
  const cloud = `
    <g class="weather-forecast-icon__cloud">
      <path class="weather-forecast-icon__cloud-shape" d="M15.8 42h30.5c7 0 12-4.8 12-10.8 0-5.6-4.4-10-10-10.7-2.3-8.7-9.8-15-19-15-9 0-16.2 5.7-18.2 14C5.4 21.4 1.6 26.2 1.6 32c0 6 5.2 10 14.2 10Z" />
    </g>
  `;
  const rain = `<g class="weather-forecast-icon__rain"><path d="M18 45l-4 8M29 45l-4 8M40 45l-4 8" /></g>`;
  const snow = `<g class="weather-forecast-icon__snow"><path d="M17 47h8M21 43v8M36 47h8M40 43v8" /></g>`;
  const fog = `<g class="weather-forecast-icon__fog"><path d="M8 39h45M15 45h35" /></g>`;
  const storm = `<path class="weather-forecast-icon__bolt" d="M32 34 24 49h8l-3 11 13-19h-8l5-7Z" />`;

  const content: Record<WeatherKind, string> = {
    clear: light === "night" ? moon : sun,
    partly:
      light === "night"
        ? `<g transform="translate(1 0) scale(.82)">${moon}</g><g transform="translate(8 12) scale(.76)">${cloud}</g>`
        : `${sun}<g transform="translate(7 10) scale(.76)">${cloud}</g>`,
    cloud,
    fog: `${cloud}${fog}`,
    rain: `${cloud}${rain}`,
    snow: `${cloud}${snow}`,
    storm: `${cloud}${rain}${storm}`
  };

  return `<svg class="weather-forecast-icon weather-forecast-icon--${kind} weather-forecast-icon--${light}" viewBox="0 0 64 54" aria-hidden="true">${content[kind]}</svg>`;
};

const tinyIcon = (kind: WeatherKind, light: WeatherLight = "day") => forecastIcon(kind, light);

const windDirection = (degrees: number | undefined) => {
  if (!safeNumber(degrees)) return "--";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees! / 45) % directions.length];
};

const moonPhaseLabel = (phase: number) => {
  const phases = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent"
  ];
  return phases[Math.floor(((phase + 0.0625) % 1) * 8)];
};

const parseEventDate = (value: string | Date | undefined) => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const isDaytime = (value: string | undefined, daily: OpenMeteoWeather["daily"]) => {
  const date = parseEventDate(value);
  const dayKey = value?.slice(0, 10);
  if (!date || !dayKey) return true;
  const dayIndex = daily?.time?.findIndex((candidate) => candidate === dayKey) ?? -1;
  const sunrise = parseEventDate(dayIndex >= 0 ? daily?.sunrise?.[dayIndex] : undefined);
  const sunset = parseEventDate(dayIndex >= 0 ? daily?.sunset?.[dayIndex] : undefined);
  if (!sunrise || !sunset) return true;
  return date.getTime() >= sunrise.getTime() && date.getTime() < sunset.getTime();
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const celestialLabel = (kind: CelestialKind) => {
  const labels: Record<CelestialKind, string> = {
    moonrise: "Moonrise",
    moonset: "Moonset",
    sunrise: "Sunrise",
    sunset: "Sunset"
  };
  return labels[kind];
};

const nextCelestialEvent = (
  events: Array<Omit<CelestialEvent, "previousTime">>,
  now: Date,
  fallbackSpanMs: number
): CelestialEvent | undefined => {
  const sorted = events
    .filter((event) => !Number.isNaN(event.time.getTime()))
    .sort((a, b) => a.time.getTime() - b.time.getTime());
  const nextIndex = sorted.findIndex((event) => event.time.getTime() > now.getTime());
  if (nextIndex < 0) return undefined;
  const next = sorted[nextIndex];
  const previousTime = sorted[nextIndex - 1]?.time ?? new Date(next.time.getTime() - fallbackSpanMs);
  return { ...next, previousTime };
};

const eventProgress = (event: CelestialEvent | undefined, now: Date) => {
  if (!event?.previousTime) return 0;
  const start = event.previousTime.getTime();
  const end = event.time.getTime();
  if (end <= start) return 0;
  return clamp((now.getTime() - start) / (end - start));
};

const nextSunEvent = (daily: OpenMeteoWeather["daily"], now: Date) => {
  const events: Array<Omit<CelestialEvent, "previousTime">> = [];
  daily?.sunrise?.forEach((value) => {
    const time = parseEventDate(value);
    if (time) events.push({ kind: "sunrise", time });
  });
  daily?.sunset?.forEach((value) => {
    const time = parseEventDate(value);
    if (time) events.push({ kind: "sunset", time });
  });
  return nextCelestialEvent(events, now, 14 * hourMs);
};

const nextMoonEvent = (date: Date, latitude: number, longitude: number) => {
  const events: Array<Omit<CelestialEvent, "previousTime">> = [];
  for (let offset = -1; offset <= 7; offset += 1) {
    const searchDate = new Date(date);
    searchDate.setDate(date.getDate() + offset);
    const times = SunCalc.getMoonTimes(searchDate, latitude, longitude);
    if (times.rise) events.push({ kind: "moonrise", time: times.rise });
    if (times.set) events.push({ kind: "moonset", time: times.set });
  }
  return nextCelestialEvent(events, date, 12 * hourMs);
};

const sunSvg = (event: CelestialEvent | undefined, now: Date) => {
  const rawProgress = eventProgress(event, now);
  const displayProgress = event?.kind === "sunrise" ? 1 - rawProgress : rawProgress;
  const centerX = 80;
  const baseline = 91;
  const radiusX = 58;
  const radiusY = 43;
  const angle = Math.PI - displayProgress * Math.PI;
  const markerX = centerX + Math.cos(angle) * radiusX;
  const markerY = baseline - Math.sin(angle) * radiusY;
  return `
    <svg class="weather-sun-art" viewBox="0 0 160 112" aria-hidden="true">
      <path class="weather-sun-art__arc" d="M ${centerX - radiusX} ${baseline} A ${radiusX} ${radiusY} 0 0 1 ${centerX + radiusX} ${baseline}" />
      <line class="weather-sun-art__horizon" x1="10" y1="${baseline}" x2="150" y2="${baseline}" />
      <circle class="weather-sun-art__marker" cx="${markerX.toFixed(2)}" cy="${markerY.toFixed(2)}" r="6.4" />
      <text class="weather-sun-art__label" x="${centerX - radiusX}" y="108">E</text>
      <text class="weather-sun-art__label" x="${centerX}" y="108">S</text>
      <text class="weather-sun-art__label" x="${centerX + radiusX}" y="108">W</text>
    </svg>
  `;
};

const moonSvg = (phase: number, event: CelestialEvent | undefined, now: Date) => {
  const waxing = phase < 0.5;
  const distanceFromFull = Math.abs(phase - 0.5) * 2;
  const shadowWidth = 74 * distanceFromFull;
  const terminatorX = waxing ? 60 + shadowWidth / 2 : 60 - shadowWidth / 2;
  const shadeOpacity = Math.max(0.16, Math.min(0.74, distanceFromFull + 0.08));
  const orbitOffset = 78 - eventProgress(event, now) * 100;
  const shadeX = waxing ? 27 : terminatorX;
  const shadeWidth = waxing ? Math.max(0, terminatorX - 27) : Math.max(0, 93 - terminatorX);
  return `
    <svg class="weather-moon-art" viewBox="0 0 120 120" aria-hidden="true" style="--moon-orbit-offset:${orbitOffset.toFixed(2)}">
      <defs>
        <clipPath id="weatherMoonClip">
          <circle cx="60" cy="60" r="33" />
        </clipPath>
        <linearGradient id="weatherMoonTerminatorLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--weather-moon-dim)" stop-opacity="${shadeOpacity}" />
          <stop offset="72%" stop-color="var(--weather-moon-dim)" stop-opacity="${shadeOpacity * 0.86}" />
          <stop offset="100%" stop-color="var(--weather-moon-dim)" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="weatherMoonTerminatorRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--weather-moon-dim)" stop-opacity="0" />
          <stop offset="28%" stop-color="var(--weather-moon-dim)" stop-opacity="${shadeOpacity * 0.86}" />
          <stop offset="100%" stop-color="var(--weather-moon-dim)" stop-opacity="${shadeOpacity}" />
        </linearGradient>
      </defs>
      <circle class="weather-moon-art__orbit weather-moon-art__orbit--base" cx="60" cy="60" r="43" />
      <circle class="weather-moon-art__orbit weather-moon-art__orbit--accent" cx="60" cy="60" r="43" pathLength="100" />
      <g clip-path="url(#weatherMoonClip)">
        <image class="weather-moon-art__surface" href="/weather/img/moon-surface.png" x="27" y="27" width="66" height="66" preserveAspectRatio="xMidYMid slice" />
        <rect class="weather-moon-art__shade weather-moon-art__shade--${waxing ? "left" : "right"}" x="${shadeX.toFixed(2)}" y="27" width="${shadeWidth.toFixed(2)}" height="66" />
        <ellipse class="weather-moon-art__terminator" cx="${terminatorX.toFixed(2)}" cy="60" rx="${Math.max(8, 15 - distanceFromFull * 6).toFixed(2)}" ry="34" opacity="${shadeOpacity}" />
      </g>
      <circle class="weather-moon-art__rim" cx="60" cy="60" r="33" />
    </svg>
  `;
};

const cardIcon = (name: "sun" | "moon") => {
  const icons = {
    sun: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>`,
    moon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 15.6A7.3 7.3 0 0 1 8.4 6.2 7.6 7.6 0 1 0 17.8 15.6Z" /></svg>`
  };
  return icons[name];
};

const weatherAttributeIcon = (name: "cloud" | "sun" | "eye" | "drop") => {
  const icons = {
    cloud: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 23h16a6 6 0 0 0 .4-12 9 9 0 0 0-17.1 3A4.7 4.7 0 0 0 9 23Z" /></svg>`,
    sun: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="5" /><path d="M16 3v5M16 24v5M3 16h5M24 16h5M6.8 6.8l3.5 3.5M21.7 21.7l3.5 3.5M25.2 6.8l-3.5 3.5M10.3 21.7l-3.5 3.5" /></svg>`,
    eye: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16Z" /><circle cx="16" cy="16" r="3.5" /></svg>`,
    drop: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3s8 9 8 16a8 8 0 0 1-16 0c0-7 8-16 8-16Z" /></svg>`
  };
  return icons[name];
};

const raindropMetricSvg = (chance: number | undefined) => {
  const fillPct = safeNumber(chance) ? Math.min(100, Math.max(0, chance!)) : 0;
  const fillY = 110 - fillPct;
  return `
  <svg class="weather-drop-art" viewBox="0 0 120 120" aria-hidden="true" style="--drop-fill:${fillPct}%">
    <defs>
      <clipPath id="weatherDropClip">
        <path d="M60 10s34 40 34 68a34 34 0 0 1-68 0c0-28 34-68 34-68Z" />
      </clipPath>
      <radialGradient id="weatherDropGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#64dcff" stop-opacity=".78" />
        <stop offset="58%" stop-color="#27a9ff" stop-opacity=".72" />
        <stop offset="100%" stop-color="#0d64d8" stop-opacity=".42" />
      </radialGradient>
    </defs>
    <path class="weather-drop-art__shell" d="M60 10s34 40 34 68a34 34 0 0 1-68 0c0-28 34-68 34-68Z" />
    <g clip-path="url(#weatherDropClip)">
      <rect class="weather-drop-art__fill" x="20" y="${fillY}" width="80" height="100" />
      <path class="weather-drop-art__wave" d="M18 ${fillY}c10-7 20 7 30 0s20-7 30 0 20 7 30 0v34H18Z" />
    </g>
  </svg>
`;
};

const compassMetricSvg = (degrees: number | undefined) => {
  const angle = safeNumber(degrees) ? degrees : 0;
  return `
  <svg class="weather-compass-art" viewBox="0 0 150 150" aria-hidden="true">
    <circle cx="75" cy="75" r="52" />
    <path class="weather-compass-art__needle" d="M75 7 81 26 75 22 69 26Z" transform="rotate(${angle} 75 75)" />
    <text x="75" y="13">N</text>
    <text x="140" y="79">E</text>
    <text x="75" y="144">S</text>
    <text x="10" y="79">W</text>
  </svg>
`;
};

const pressureMetricSvg = (pressure: number | undefined) => {
  const pct = safeNumber(pressure) ? Math.min(1, Math.max(0, (pressure! - 940) / 110)) : 0.5;
  const segmentStart = Math.max(0, Math.min(84, pct * 100 - 8));
  return `
    <svg class="weather-pressure-art" viewBox="0 0 140 100" aria-hidden="true" style="--pressure-offset:${-segmentStart}">
      <path class="weather-pressure-art__track" pathLength="100" d="M18 72a52 52 0 0 1 104 0" />
      <path class="weather-pressure-art__fill" pathLength="100" d="M18 72a52 52 0 0 1 104 0" />
      <path class="weather-pressure-art__tick" d="M70 26v9M37 43l7 6M103 43l-7 6M22 68l9 3M118 68l-9 3" />
    </svg>
  `;
};

const aqiMetricSvg = () => `
  <svg class="weather-aqi-art" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="40" />
    <circle cx="60" cy="60" r="29" />
  </svg>
`;

const renderCurrentPanel = (payload: WeatherPayload) => {
  const { city, unit, weather } = payload;
  const current = weather.current;
  const todayMax = weather.daily?.temperature_2m_max?.[0];
  const todayMin = weather.daily?.temperature_2m_min?.[0];
  const info = weatherInfo(current?.weather_code);
  setText("#weather-location", city.name);
  setText("#weather-temp", formatMainTemperature(current?.temperature_2m, unit));
  setText("#weather-feels", `Feels like ${formatTemperature(current?.apparent_temperature)}`);
  const highLow = query("#weather-high-low");
  if (highLow) {
    highLow.innerHTML = `H: <b>${formatTemperature(todayMax)}</b><span>L: <i>${formatTemperature(todayMin)}</i></span>`;
  }
  setText("#weather-summary", `${info.label} in ${city.name}. ${weather.timezone ?? city.timezone ?? "Local timezone"}.`);

  const art = query("#weather-condition-art");
  if (art) {
    art.innerHTML = weatherGlyph(info.kind, false, current?.is_day === 0 ? "night" : "day");
  }

  const list = query("#weather-current-list");
  if (list) {
    const uv = safeNumber(current?.uv_index)
      ? `${round(current?.uv_index)} <small>${uvLabel(current?.uv_index)}</small>`
      : `-- <small>Low</small>`;
    list.innerHTML = `
      <div class="weather-list-item">${weatherAttributeIcon("cloud")}<span>Clouds</span><strong>${formatPercent(current?.cloud_cover)}</strong></div>
      <div class="weather-list-item">${weatherAttributeIcon("sun")}<span>UV Index</span><strong>${uv}</strong></div>
      <div class="weather-list-item">${weatherAttributeIcon("eye")}<span>Visibility</span><strong>${formatVisibility(current?.visibility, unit)}</strong></div>
      <div class="weather-list-item">${weatherAttributeIcon("drop")}<span>Humidity</span><strong>${formatPercent(current?.relative_humidity_2m)}</strong></div>
    `;
  }
};

const renderInsightCards = (payload: WeatherPayload) => {
  const current = payload.weather.current;
  const aqi = payload.aqi.current ?? {};
  const rain = dominantPrecip(current);
  const precipitationChance = payload.weather.daily?.precipitation_probability_max?.[0];

  const air = query("#weather-air");
  if (air) {
    air.innerHTML = `
      <div class="weather-metric-art weather-metric-art--aqi">${aqiMetricSvg()}<strong>${round(aqi.us_aqi)}</strong><span>${aqLabel(aqi.us_aqi)}</span></div>
      <small>PM2.5: ${round(aqi.pm2_5, 1)}</small>
    `;
  }

  const rainCard = query("#weather-rain");
  if (rainCard) {
    rainCard.innerHTML = `
      <div class="weather-metric-art weather-metric-art--drop">${raindropMetricSvg(precipitationChance)}<strong>${formatPercent(precipitationChance)}</strong></div>
      <small>${formatPrecip(rain, payload.unit)}</small>
    `;
  }

  const wind = query("#weather-wind-card");
  if (wind) {
    wind.innerHTML = `
      <div class="weather-metric-art weather-metric-art--wind">${compassMetricSvg(current?.wind_direction_10m)}<strong>${round(current?.wind_speed_10m)}</strong><span>${payload.unit === "imperial" ? "MPH" : "km/h"}</span></div>
      <small>Gusts ${formatWind(current?.wind_gusts_10m, payload.unit)} ${windDirection(current?.wind_direction_10m)}</small>
    `;
  }

  const pressure = query("#weather-pressure-card");
  if (pressure) {
    pressure.innerHTML = `
      <div class="weather-metric-art weather-metric-art--pressure">${pressureMetricSvg(current?.surface_pressure)}<strong>${round(current?.surface_pressure)}</strong><span>hPa</span></div>
      <small>Surface pressure</small>
    `;
  }
};

const renderSunPanel = (payload: WeatherPayload, now = new Date()) => {
  const panel = query("#weather-sun");
  const daily = payload.weather.daily;
  if (!panel) return;

  const event = nextSunEvent(daily, now);
  const label = event ? celestialLabel(event.kind) : "Sunrise";
  panel.innerHTML = `
    <div class="weather-astro-card__copy">
      <span class="weather-card-label weather-card-label--sun">${cardIcon("sun")}${label}</span>
      <strong>${formatTime(event?.time, payload.city.timezone)}</strong>
      <p>Daylight:<br>${formatDuration(daily?.daylight_duration?.[0])}</p>
    </div>
    <small class="weather-astro-card__duration">${formatCountdown(now, event?.time)}</small>
    ${sunSvg(event, now)}
  `;
};

const renderMoonPanel = (payload: WeatherPayload, now = new Date()) => {
  const panel = query("#weather-moon");
  if (!panel) return;

  const moon = SunCalc.getMoonIllumination(now);
  const moonTimes = SunCalc.getMoonTimes(now, payload.city.latitude, payload.city.longitude);
  const phaseLabel = moonPhaseLabel(moon.phase);
  const event = nextMoonEvent(now, payload.city.latitude, payload.city.longitude);
  const label = event ? celestialLabel(event.kind) : "Moonrise";
  const moonEventText =
    moonTimes.alwaysUp
      ? "Moon above horizon"
      : moonTimes.alwaysDown
        ? "Moon below horizon"
        : formatTime(event?.time, payload.city.timezone);

  panel.innerHTML = `
    <div class="weather-astro-card__copy">
      <span class="weather-card-label weather-card-label--moon">${cardIcon("moon")}${label}</span>
      <strong>${moonEventText}</strong>
      <p>${phaseLabel}</p>
    </div>
    <small class="weather-astro-card__duration">${formatCountdown(now, event?.time)}</small>
    ${moonSvg(moon.phase, event, now)}
  `;
};

const firstCurrentHour = (weather: OpenMeteoWeather) => {
  const times = weather.hourly?.time ?? [];
  const currentTime = weather.current?.time;
  if (!currentTime) return 0;
  const found = times.findIndex((time) => time >= currentTime);
  return found >= 0 ? found : 0;
};

const renderHourly = (payload: WeatherPayload) => {
  const container = query("#weather-hourly");
  const hourly = payload.weather.hourly;
  if (!container) return;
  clearChildren(container);
  if (!hourly?.time?.length || !hourly.temperature_2m?.length) return;

  const start = firstCurrentHour(payload.weather);
  const limit = Math.min(start + 24, hourly.time.length);
  for (let index = start; index < limit; index += 1) {
    const info = weatherInfo(hourly.weather_code?.[index]);
    const light = isDaytime(hourly.time[index], payload.weather.daily) ? "day" : "night";
    const article = document.createElement("article");
    article.className = "weather-hour-card";
    article.innerHTML = `
      <time>${index === start ? "Now" : formatHour(hourly.time[index])}</time>
      ${tinyIcon(info.kind, light)}
      <strong>${formatTemperature(hourly.temperature_2m[index])}</strong>
    `;
    container.appendChild(article);
  }
};

const renderDaily = (payload: WeatherPayload) => {
  const container = query("#weather-daily");
  const daily = payload.weather.daily;
  if (!container) return;
  clearChildren(container);
  if (!daily?.time?.length) return;

  const limit = Math.min(10, daily.time.length);
  const lows = (daily.temperature_2m_min ?? []).filter(safeNumber);
  const highs = (daily.temperature_2m_max ?? []).filter(safeNumber);
  const rangeMin = lows.length ? Math.min(...lows) : 35;
  const rangeMax = highs.length ? Math.max(...highs) : 90;
  const span = Math.max(1, rangeMax - rangeMin);

  for (let index = 0; index < limit; index += 1) {
    const info = weatherInfo(daily.weather_code?.[index]);
    const article = document.createElement("article");
    article.className = "weather-day-row";
    const high = daily.temperature_2m_max?.[index];
    const low = daily.temperature_2m_min?.[index];
    const rangeStart = safeNumber(low) ? Math.max(0, Math.min(100, ((low! - rangeMin) / span) * 100)) : 28;
    const rangeEnd = safeNumber(high) ? Math.max(rangeStart + 5, Math.min(100, ((high! - rangeMin) / span) * 100)) : 62;
    article.innerHTML = `
      <time>${formatDay(daily.time[index], index)}</time>
      ${tinyIcon(info.kind)}
      <span class="weather-pop">${formatPercent(daily.precipitation_probability_max?.[index])}</span>
      <strong class="weather-high">${formatTemperature(high)}</strong>
      <div class="weather-range" style="--range-start:${rangeStart}%;--range-width:${rangeEnd - rangeStart}%"><span></span></div>
      <strong class="weather-low">${formatTemperature(low)}</strong>
    `;
    container.appendChild(article);
  }
};

const renderAqi = (aqiData: AirQualityData) => {
  const container = query("#weather-aqi");
  if (!container) return;
  clearChildren(container);

  const currentAqi = aqiData.current ?? {};
  const items = [
    ["AQI", `${round(currentAqi.us_aqi)} ${aqLabel(currentAqi.us_aqi)}`],
    ["PM2.5", `${round(currentAqi.pm2_5, 1)} ug/m3`],
    ["PM10", `${round(currentAqi.pm10, 1)} ug/m3`],
    ["Ozone", `${round(currentAqi.ozone, 1)} ug/m3`]
  ];

  for (const [label, value] of items) {
    const item = document.createElement("span");
    item.innerHTML = `<b>${label}</b>${value}`;
    container.appendChild(item);
  }
};

const stopCelestialTicker = () => {
  if (celestialTimer) {
    window.clearInterval(celestialTimer);
    celestialTimer = undefined;
  }
};

const renderCelestialPanels = (payload: WeatherPayload) => {
  const now = new Date();
  renderSunPanel(payload, now);
  renderMoonPanel(payload, now);
};

const startCelestialTicker = (payload: WeatherPayload) => {
  stopCelestialTicker();
  renderCelestialPanels(payload);
  celestialTimer = window.setInterval(() => renderCelestialPanels(payload), 1000);
};

const renderWeather = (payload: WeatherPayload) => {
  renderCurrentPanel(payload);
  renderInsightCards(payload);
  startCelestialTicker(payload);
  renderHourly(payload);
  renderDaily(payload);
  renderAqi(payload.aqi);
  const mapLabel = [payload.city.name, payload.city.admin1, payload.city.country].filter(Boolean).join(", ");
  renderMap(payload.city.latitude, payload.city.longitude, mapLabel || "Selected location");
};

const unitParams = (unit: UnitSystem) => {
  if (unit === "imperial") {
    return "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";
  }
  return "";
};

const locationNameFromReverseGeocoding = (result: ReverseGeocodingResult) => {
  const address = result.address;
  if (!address) return undefined;
  return (
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    address.hamlet ??
    address.locality ??
    address.suburb ??
    address.county
  );
};

const loadReverseGeocodedLocation = async (request: Extract<WeatherRequest, { kind: "coordinates" }>, signal: AbortSignal) => {
  const params = new URLSearchParams({
    addressdetails: "1",
    format: "jsonv2",
    lat: String(request.latitude),
    lon: String(request.longitude),
    zoom: "10"
  });

  try {
    const result = await fetchJson<ReverseGeocodingResult>(`https://nominatim.openstreetmap.org/reverse?${params}`, signal);
    const name = locationNameFromReverseGeocoding(result) ?? request.label;
    return {
      latitude: request.latitude,
      longitude: request.longitude,
      name,
      admin1: result.address?.state,
      country: result.address?.country,
      timezone: request.timezone
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return {
      latitude: request.latitude,
      longitude: request.longitude,
      name: request.label,
      timezone: request.timezone
    };
  }
};

const loadWeatherForLocation = async (city: GeocodingResult, unit: UnitSystem, signal: AbortSignal) => {
  const variables = [
    "temperature_2m",
    "apparent_temperature",
    "wind_speed_10m",
    "wind_gusts_10m",
    "wind_direction_10m",
    "relative_humidity_2m",
    "visibility",
    "precipitation",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "cloud_cover",
    "surface_pressure",
    "uv_index",
    "is_day"
  ].join(",");
  const hourly = ["temperature_2m", "weather_code", "precipitation_probability", "cloud_cover"].join(",");
  const daily = [
    "sunrise",
    "sunset",
    "daylight_duration",
    "sunshine_duration",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max",
    "weather_code"
  ].join(",");

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
    `&current=${variables}&hourly=${hourly}&daily=${daily}&timezone=auto&forecast_days=10${unitParams(unit)}`;

  const [weather, aqi] = await Promise.all([
    fetchJson<OpenMeteoWeather>(forecastUrl, signal),
    fetchJson<AirQualityData>(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide&timezone=auto`,
      signal
    )
  ]);

  return { city, weather, aqi, unit };
};

const loadWeatherForCity = async (cityName: string, unit: UnitSystem, signal: AbortSignal) => {
  const response = await fetchJson<{ results?: GeocodingResult[] }>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
    signal
  );
  const city = response.results?.[0];
  if (!city) {
    throw new Error(`No geocoding result found for ${cityName}`);
  }

  return loadWeatherForLocation(city, unit, signal);
};

const loadWeather = async (request: WeatherRequest, unit: UnitSystem, signal: AbortSignal) => {
  if (request.kind === "city") {
    return loadWeatherForCity(request.cityName, unit, signal);
  }

  const location = await loadReverseGeocodedLocation(request, signal);
  return loadWeatherForLocation(location, unit, signal);
};

const setStatus = (text: string) => {
  setText("#weather-status", text);
};

const setLocationNotice = (text?: string) => {
  const notice = query("#weather-location-notice");
  if (!notice) return;
  if (!text) {
    notice.hidden = true;
    notice.textContent = "";
    return;
  }
  notice.hidden = false;
  notice.textContent = text;
};

const readStoredUnit = (): UnitSystem => {
  const stored = window.localStorage.getItem(unitStorageKey);
  return stored === "metric" || stored === "imperial" ? stored : "imperial";
};

const updateUnitToggle = (unit: UnitSystem) => {
  document.querySelectorAll<HTMLButtonElement>("[data-weather-unit]").forEach((button) => {
    const isActive = button.dataset.weatherUnit === unit;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("is-active", isActive);
  });
};

const weatherRequestName = (request: WeatherRequest) => (request.kind === "city" ? request.cityName : request.label);

const browserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const currentLocationRequest = (position: GeolocationPosition): WeatherRequest => ({
  kind: "coordinates",
  label: "Current location",
  latitude: position.coords.latitude,
  longitude: position.coords.longitude,
  timezone: browserTimezone()
});

const getBrowserPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!window.isSecureContext) {
      reject(new Error("Browser location requires HTTPS or localhost."));
      return;
    }

    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000,
      timeout: 10000
    });
  });

const geolocationErrorMessage = (error: unknown, fallbackToCity: boolean) => {
  const code = typeof error === "object" && error ? (error as GeolocationPositionError).code : undefined;
  const fallback = fallbackToCity ? " City weather is loading instead." : "";
  if (code === 1) return `Location permission is blocked for this site. Change the browser site permission, then use the location button again.${fallback}`;
  if (code === 2) return `Browser location is unavailable right now.${fallback}`;
  if (code === 3) return `Browser location timed out.${fallback}`;
  return error instanceof Error ? error.message : "Browser location could not be read.";
};

export const initWeatherPage = () => {
  const form = document.getElementById("weather-form") as HTMLFormElement | null;
  const input = document.getElementById("weather-city") as HTMLInputElement | null;
  const locateButton = document.getElementById("weather-locate") as HTMLButtonElement | null;
  currentUnit = readStoredUnit();
  updateUnitToggle(currentUnit);

  const submit = async (request: WeatherRequest, unit = currentUnit) => {
    if (request.kind === "city") {
      lastCity = request.cityName;
    }
    lastRequest = request;
    currentUnit = unit;
    window.localStorage.setItem(unitStorageKey, currentUnit);
    updateUnitToggle(currentUnit);

    activeController?.abort();
    activeController = new AbortController();
    const requestId = activeRequest + 1;
    activeRequest = requestId;
    stopCelestialTicker();

    setStatus(`Loading ${currentUnit === "imperial" ? "imperial" : "metric"} weather for ${weatherRequestName(request)}...`);
    try {
      const payload = await loadWeather(request, currentUnit, activeController.signal);
      if (requestId !== activeRequest) return;
      renderWeather(payload);
      if (request.kind === "coordinates" && input) input.value = payload.city.name;
      setStatus(`Loaded public weather data for ${payload.city.name}.`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const message = error instanceof Error ? error.message : "Unknown weather error";
      if (requestId === activeRequest) setStatus(message);
    }
  };

  const submitCity = (value: string | undefined, unit = currentUnit, clearNotice = true) => {
    const cityName = value?.trim() || "Chicago";
    if (cityName.toLowerCase() === "current location" && lastRequest.kind === "coordinates") {
      void submit(lastRequest, unit);
      return;
    }
    if (clearNotice) setLocationNotice();
    void submit({ kind: "city", cityName }, unit);
  };

  const requestLocation = async (fallbackToCity: boolean) => {
    activeController?.abort();
    const requestId = activeRequest + 1;
    activeRequest = requestId;
    stopCelestialTicker();
    setLocationNotice("Waiting for browser location permission...");
    setStatus("Requesting browser location...");

    try {
      const position = await getBrowserPosition();
      if (requestId !== activeRequest) return;
      const request = currentLocationRequest(position);
      if (input) input.value = request.label;
      setLocationNotice();
      await submit(request);
    } catch (error) {
      if (requestId !== activeRequest) return;
      const message = geolocationErrorMessage(error, fallbackToCity);
      setStatus(message);
      setLocationNotice(message);
      if (fallbackToCity) {
        submitCity(input?.value === "Current location" ? lastCity : input?.value, currentUnit, false);
      }
    }
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitCity(input?.value ?? lastCity);
  });

  locateButton?.addEventListener("click", () => {
    void requestLocation(false);
  });

  document.querySelectorAll<HTMLButtonElement>("[data-weather-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      const unit = button.dataset.weatherUnit === "metric" ? "metric" : "imperial";
      void submit(lastRequest, unit);
    });
  });

  void requestLocation(true);
};
