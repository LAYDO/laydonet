import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

type GeocodingResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
};

type OpenMeteoWeather = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    wind_speed_10m?: number;
    relative_humidity_2m?: number;
    visibility?: number;
    precipitation?: number;
    rain?: number;
    showers?: number;
    snowfall?: number;
    weather_code?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    weather_code?: number[];
    precipitation_probability?: number[];
  };
  daily?: {
    time?: string[];
    sunrise?: string[];
    sunset?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
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

const weatherCodes: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow fall",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Violent showers",
  95: "Thunderstorm"
};

const formatNumber = (value: number | undefined, suffix = "") => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "--";
  }
  return `${Math.round(value)}${suffix}`;
};

const formatTime = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
};

const getWeatherLabel = (code: number | undefined) => {
  if (typeof code !== "number") {
    return "Weather unavailable";
  }
  return weatherCodes[code] ?? `Weather code ${code}`;
};

const aqLabel = (value: number | undefined) => {
  if (typeof value !== "number") {
    return "Unavailable";
  }
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy for sensitive groups";
  if (value <= 200) return "Unhealthy";
  if (value <= 300) return "Very unhealthy";
  return "Hazardous";
};

const fetchJson = async <T,>(url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const clearChildren = (element: HTMLElement | null) => {
  if (!element) return;
  element.replaceChildren();
};

let map: L.Map | null = null;
let marker: L.CircleMarker | null = null;

const renderMap = (latitude: number, longitude: number, label: string) => {
  const mapElement = document.getElementById("weather-map");
  if (!mapElement) return;

  if (!map) {
    map = L.map(mapElement, {
      zoomControl: true,
      scrollWheelZoom: false
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  }

  marker?.remove();
  marker = L.circleMarker([latitude, longitude], {
    radius: 9,
    color: "#1f1f1b",
    weight: 2,
    fillColor: "#eaa86f",
    fillOpacity: 0.9
  }).addTo(map);
  marker.bindTooltip(label, { permanent: false });
  map.setView([latitude, longitude], 9);
  setTimeout(() => map?.invalidateSize(), 0);
};

const renderCurrent = (weather: OpenMeteoWeather, aqiData: AirQualityData, city: GeocodingResult) => {
  const current = weather.current;
  const hourly = weather.hourly;
  const daily = weather.daily;
  const location = document.getElementById("weather-location");
  const summary = document.getElementById("weather-summary");

  if (location) {
    location.textContent = `${city.name}${city.admin1 ? `, ${city.admin1}` : ""}${city.country ? `, ${city.country}` : ""}`;
  }

  if (summary) {
    summary.textContent = `${getWeatherLabel(current?.weather_code)} in ${city.name}. Timezone: ${city.timezone ?? "local browser timezone"}.`;
  }

  const mapLabel = `${city.name}, ${city.country ?? ""}`.trim();
  renderMap(city.latitude, city.longitude, mapLabel);

  const metrics = [
    ["weather-temp", formatNumber(current?.temperature_2m, "°")],
    ["weather-feels", formatNumber(current?.apparent_temperature, "°")],
    ["weather-wind", formatNumber(current?.wind_speed_10m, " km/h")],
    ["weather-humidity", formatNumber(current?.relative_humidity_2m, "%")],
    ["weather-visibility", formatNumber(current?.visibility, " m")],
    ["weather-precip", formatNumber(current?.precipitation ?? current?.rain ?? current?.showers ?? current?.snowfall, " mm")]
  ] as const;

  for (const [id, value] of metrics) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  const hourlyContainer = document.getElementById("weather-hourly");
  if (hourlyContainer && hourly?.time?.length && hourly.temperature_2m?.length) {
    clearChildren(hourlyContainer);
    const limit = Math.min(12, hourly.time.length);
    for (let index = 0; index < limit; index += 1) {
      const article = document.createElement("article");
      article.innerHTML = `
        <div class="eyebrow">${index === 0 ? "Now" : formatTime(hourly.time![index])}</div>
        <strong>${formatNumber(hourly.temperature_2m![index], "°")}</strong>
        <p>${getWeatherLabel(hourly.weather_code?.[index])}</p>
        <p>${formatNumber(hourly.precipitation_probability?.[index], "%")} chance of rain</p>
      `;
      hourlyContainer.appendChild(article);
    }
  }

  const aqiContainer = document.getElementById("weather-aqi");
  if (aqiContainer) {
    const currentAqi = aqiData.current ?? {};
    clearChildren(aqiContainer);
    const items = [
      ["AQI", `${formatNumber(currentAqi.us_aqi)} (${aqLabel(currentAqi.us_aqi)})`],
      ["PM2.5", formatNumber(currentAqi.pm2_5, " μg/m³")],
      ["PM10", formatNumber(currentAqi.pm10, " μg/m³")],
      ["Ozone", formatNumber(currentAqi.ozone, " μg/m³")],
      ["NO2", formatNumber(currentAqi.nitrogen_dioxide, " μg/m³")],
      ["SO2", formatNumber(currentAqi.sulphur_dioxide, " μg/m³")]
    ];

    for (const [label, value] of items) {
      const article = document.createElement("article");
      article.innerHTML = `<div class="eyebrow">${label}</div><strong>${value}</strong>`;
      aqiContainer.appendChild(article);
    }
  }

  const airStatus = document.getElementById("weather-status");
  if (airStatus) {
    airStatus.textContent = `${getWeatherLabel(current?.weather_code)}. ${daily?.time?.[0] ? `Today: ${formatDate(daily.time[0])}` : ""}`;
  }
};

const loadWeather = async (cityName: string) => {
  const response = await fetchJson<{ results?: GeocodingResult[] }>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
  );
  const city = response.results?.[0];
  if (!city) {
    throw new Error(`No geocoding result found for ${cityName}`);
  }

  const weather = await fetchJson<OpenMeteoWeather>(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,visibility,precipitation,rain,showers,snowfall,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
  );

  const aqi = await fetchJson<AirQualityData>(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide&timezone=auto`
  );

  return { city, weather, aqi };
};

const setStatus = (text: string) => {
  const el = document.getElementById("weather-status");
  if (el) {
    el.textContent = text;
  }
};

export const initWeatherPage = () => {
  const form = document.getElementById("weather-form") as HTMLFormElement | null;
  const input = document.getElementById("weather-city") as HTMLInputElement | null;

  const submit = async (value: string) => {
    setStatus(`Loading weather for ${value}...`);
    try {
      const payload = await loadWeather(value);
      renderCurrent(payload.weather, payload.aqi, payload.city);
      setStatus(`Loaded public weather data for ${payload.city.name}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown weather error";
      setStatus(message);
    }
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input?.value.trim() || "Seattle";
    void submit(value);
  });

  void submit(input?.value.trim() || "Seattle");
};
