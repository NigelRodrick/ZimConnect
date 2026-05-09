/**
 * Free / no-API-key data sources for Zim-Connect (Zimbabwe context).
 * Prefer RSS + public JSON; bank on official sites publishing feeds where possible.
 *
 * More you can add later (policy / rate limits apply — read each provider’s terms):
 * - World Bank (ZW indicators): https://api.worldbank.org/v2/country/ZWE/indicator/SP.POP.TOTL?format=json&mrnev=1
 * - Nominatim OSM (strict User-Agent + usage limits): https://nominatim.openstreetmap.org/
 */

const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search";

/** Google News RSS tuned for Zimbabwe (gl=ZW, ceid=ZW:en). */
export function googleNewsRssUrl(searchQuery: string): string {
  const p = new URLSearchParams({
    q: searchQuery,
    hl: "en",
    gl: "ZW",
    ceid: "ZW:en",
  });
  return `${GOOGLE_NEWS_RSS}?${p.toString()}`;
}

// --- News (Official News screen) ---
export const ZIMBABWE_NEWS_FEEDS = [
  googleNewsRssUrl("Zimbabwe"),
  googleNewsRssUrl("Harare OR Bulawayo Zimbabwe"),
] as const;

// --- Jobs (Zim Jobs) ---
export const ZIMBABWE_JOB_FEEDS = [
  { url: "https://vacancymail.co.zw/feed/", source: "VacancyMail" as const },
  { url: "https://ihararejobs.com/feed/", source: "iHarare Jobs" as const },
  {
    url: googleNewsRssUrl("Zimbabwe+jobs+OR+vacancies+OR+recruitment"),
    source: "News · Jobs" as const,
  },
  {
    url: googleNewsRssUrl("Zimbabwe+classified+jobs+OR+employment+OR+gigs"),
    source: "News · Classifieds" as const,
  },
] as const;

// --- Mall retail headlines ---
export const ZIMBABWE_RETAIL_NEWS_FEEDS = [
  googleNewsRssUrl("Zimbabwe+retail+OR+supermarket+OR+online+shopping"),
  googleNewsRssUrl("Zimbabwe+ecommerce+OR+consumer+prices+OR+shopping+malls"),
] as const;

// --- Wallet: ZiG / RBZ-style rates (third party JSON mirroring RBZ tables) ---
export const ZIMRATE_RBZ_JSON = "https://zimrate.statotec.com/api/rates";

/** Fallback ZWG crosses when ZimRate is unreachable (jsDelivr, no key). */
export const CURRENCY_API_ZWG_JSON =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/zwg.json";

// --- Home weather (device location + city search) ---
export const OPEN_METEO_FORECAST = "https://api.open-meteo.com/v1/forecast";

/** Forward geocode (city / town name → coordinates). No API key. */
export const OPEN_METEO_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";

/** Reverse geocode for city label (no key for light client use). */
export const BIGDATACLOUD_REVERSE_GEOCODE =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
