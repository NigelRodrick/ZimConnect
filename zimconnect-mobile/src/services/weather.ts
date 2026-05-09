/**
 * Weather: Open-Meteo (no API key) + optional place label via BigDataCloud reverse geocode (no key for client).
 * https://open-meteo.com/en/docs
 */

import {
  BIGDATACLOUD_REVERSE_GEOCODE,
  OPEN_METEO_FORECAST,
  OPEN_METEO_GEOCODING,
} from "../config/zimbabweFreeApis";

export type WeatherSnapshot = {
  temperatureC: number;
  humidity: number;
  windKmh: number;
  weatherCode: number;
  condition: string;
  isDay: boolean;
  /** ISO time from API */
  time: string;
};

export type WeatherResult = {
  snapshot: WeatherSnapshot;
  /** Human place name when geocode succeeds */
  placeLabel: string;
  /** True when using Harare coords because permission denied or error */
  usingFallbackLocation: boolean;
  /** How coordinates were chosen */
  locationMode: "device" | "harare_fallback" | "city_search";
};

export type GeocodePlace = {
  name: string;
  latitude: number;
  longitude: number;
  /** e.g. "Manicaland, Zimbabwe" */
  detail: string;
  countryCode: string;
};

/** Harare — used when location unavailable */
export const DEFAULT_ZW_COORDS = { latitude: -17.8252, longitude: 31.0335 };

/** Search places by name (Open-Meteo). Zimbabwe hits are listed first. */
export async function searchPlacesByName(query: string, limit = 10): Promise<GeocodePlace[]> {
  const q = query.trim();
  if (!q) return [];
  const params = new URLSearchParams({
    name: q,
    count: String(Math.min(50, Math.max(5, limit))),
    language: "en",
  });
  const url = `${OPEN_METEO_GEOCODING}?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Places search failed (${res.status})`);
  }
  const data = (await res.json()) as {
    results?: Array<{
      name: string;
      latitude: number;
      longitude: number;
      country_code?: string;
      country?: string;
      admin1?: string;
    }>;
  };
  const raw = data.results ?? [];
  const mapped: GeocodePlace[] = raw.map((r) => {
    const detail = [r.admin1, r.country].filter(Boolean).join(", ");
    return {
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      detail,
      countryCode: r.country_code ?? "",
    };
  });
  const zw = mapped.filter((p) => p.countryCode === "ZW");
  const other = mapped.filter((p) => p.countryCode !== "ZW");
  return [...zw, ...other].slice(0, limit);
}

function wmoWeatherLabel(code: number, isDay: boolean): string {
  const day = isDay;
  const map: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Freezing drizzle",
    61: "Slight rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Slight snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm & hail",
    99: "Thunderstorm & hail",
  };
  const base = map[code] ?? "Weather";
  if (!day && (code === 1 || code === 2 || code === 3)) {
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    return "Overcast";
  }
  return base;
}

export async function fetchWeatherAt(
  latitude: number,
  longitude: number
): Promise<WeatherSnapshot> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),
    timezone: "auto",
  });
  const url = `${OPEN_METEO_FORECAST}?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Weather HTTP ${res.status}`);
  }
  const data = (await res.json()) as {
    current?: {
      temperature_2m: number;
      relative_humidity_2m: number;
      weather_code: number;
      wind_speed_10m: number;
      is_day: number;
      time: string;
    };
  };
  const cur = data.current;
  if (!cur) {
    throw new Error("Weather payload missing current");
  }
  const isDay = cur.is_day === 1;
  return {
    temperatureC: cur.temperature_2m,
    humidity: cur.relative_humidity_2m,
    windKmh: cur.wind_speed_10m,
    weatherCode: cur.weather_code,
    condition: wmoWeatherLabel(cur.weather_code, isDay),
    isDay,
    time: cur.time,
  };
}

/** Reverse geocode for a short place label (city / town). */
export async function fetchPlaceLabel(latitude: number, longitude: number): Promise<string> {
  try {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      localityLanguage: "en",
    });
    const url = `${BIGDATACLOUD_REVERSE_GEOCODE}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return "";
    const j = (await res.json()) as {
      city?: string;
      locality?: string;
      principalSubdivision?: string;
      countryName?: string;
    };
    const parts = [j.city || j.locality, j.principalSubdivision, j.countryName].filter(Boolean);
    return parts.length ? parts.join(", ") : "";
  } catch {
    return "";
  }
}
