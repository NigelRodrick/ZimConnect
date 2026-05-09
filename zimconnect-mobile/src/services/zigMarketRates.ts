/**
 * ZiG (ZWG) rates: primary source is RBZ interbank data exposed as JSON by ZimRate (statotec).
 * Fallback: open currency-api if that request fails.
 */

import { CURRENCY_API_ZWG_JSON, ZIMRATE_RBZ_JSON } from "../config/zimbabweFreeApis";

export type ZigTriBand = {
  bid: number | null;
  ask: number | null;
  mid: number;
};

export type ZigMarketRates = {
  provider: "rbz" | "openfx";
  /** RBZ/ZimRate table date (often DD-MM-YYYY) */
  dateLabel: string;
  lastUpdated: string | null;
  /** ZiG per 1 USD */
  usd: ZigTriBand;
  /** ZiG per 1 EUR */
  eur: ZigTriBand;
  /** Rand per 1 ZiG (RBZ pair ZWG/ZAR) */
  zarPerZig: ZigTriBand;
};

type ZimrateRow = {
  currency_pair: string;
  bid: string;
  ask: string;
  avg: string;
  date_label: string;
  scraped_at: string;
};

type ZimrateApi = {
  rates: ZimrateRow[];
  lastUpdated?: string;
};

function parseNum(s: string): number {
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
}

function tri(bid: number | null, ask: number | null, mid: number): ZigTriBand {
  return {
    bid: bid != null && Number.isFinite(bid) ? bid : null,
    ask: ask != null && Number.isFinite(ask) ? ask : null,
    mid: Number.isFinite(mid) ? mid : NaN,
  };
}

export async function fetchZigMarketRates(): Promise<ZigMarketRates> {
  try {
    return await fetchRbzFromZimrate();
  } catch {
    return await fetchOpenFxFallback();
  }
}

async function fetchRbzFromZimrate(): Promise<ZigMarketRates> {
  const res = await fetch(ZIMRATE_RBZ_JSON, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`RBZ rates HTTP ${res.status}`);
  }
  const raw = (await res.json()) as ZimrateApi;
  const rows = raw.rates;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("RBZ rates empty");
  }
  const usdRow = rows.find((r) => r.currency_pair === "USD/ZWG");
  const eurRow = rows.find((r) => r.currency_pair === "EUR/ZWG");
  const zarRow = rows.find((r) => r.currency_pair === "ZWG/ZAR");
  if (!usdRow || !eurRow || !zarRow) {
    throw new Error("RBZ rates missing USD, EUR or ZAR pair");
  }
  const usdMid = parseNum(usdRow.avg);
  const eurMid = parseNum(eurRow.avg);
  const zarMid = parseNum(zarRow.avg);
  if (!Number.isFinite(usdMid) || !Number.isFinite(eurMid) || !Number.isFinite(zarMid)) {
    throw new Error("RBZ rates invalid numbers");
  }
  return {
    provider: "rbz",
    dateLabel: usdRow.date_label || "",
    lastUpdated: raw.lastUpdated ?? null,
    usd: tri(parseNum(usdRow.bid), parseNum(usdRow.ask), usdMid),
    eur: tri(parseNum(eurRow.bid), parseNum(eurRow.ask), eurMid),
    zarPerZig: tri(parseNum(zarRow.bid), parseNum(zarRow.ask), zarMid),
  };
}

function num(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : NaN;
}

async function fetchOpenFxFallback(): Promise<ZigMarketRates> {
  const res = await fetch(CURRENCY_API_ZWG_JSON, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Fallback rates failed (${res.status})`);
  }
  const data = (await res.json()) as { date?: string; zwg?: Record<string, number> };
  const z = data.zwg;
  if (!z) {
    throw new Error("Invalid fallback payload");
  }
  const oneUsd = num(z.usd);
  const oneEur = num(z.eur);
  const oneZar = num(z.zar);
  if (!oneUsd || !oneEur || !oneZar) {
    throw new Error("Fallback missing pairs");
  }
  const dateLabel = typeof data.date === "string" ? data.date : "";
  return {
    provider: "openfx",
    dateLabel,
    lastUpdated: null,
    usd: tri(null, null, 1 / oneUsd),
    eur: tri(null, null, 1 / oneEur),
    zarPerZig: tri(null, null, oneZar),
  };
}

/** One line for wallet: ZiG per unit foreign, with optional bid/ask. */
export function formatZigPerUsd(tb: ZigTriBand): string {
  if (!Number.isFinite(tb.mid)) return "US$: —";
  const mid = tb.mid.toFixed(4);
  if (tb.bid != null && tb.ask != null) {
    return `US$: bid ${tb.bid.toFixed(4)} · ask ${tb.ask.toFixed(4)} · avg ${mid} ZiG per US$`;
  }
  return `US$: ≈ ${mid} ZiG per US$ (mid only)`;
}

export function formatZigPerEur(tb: ZigTriBand): string {
  if (!Number.isFinite(tb.mid)) return "EUR: —";
  const mid = tb.mid.toFixed(4);
  if (tb.bid != null && tb.ask != null) {
    return `EUR: bid ${tb.bid.toFixed(4)} · ask ${tb.ask.toFixed(4)} · avg ${mid} ZiG per €`;
  }
  return `EUR: ≈ ${mid} ZiG per € (mid only)`;
}

/** ZWG/ZAR: rand per 1 ZiG */
export function formatZarPerZig(tb: ZigTriBand): string {
  if (!Number.isFinite(tb.mid)) return "ZAR: —";
  const mid = tb.mid.toFixed(4);
  if (tb.bid != null && tb.ask != null) {
    return `ZAR: bid R ${tb.bid.toFixed(4)} · ask R ${tb.ask.toFixed(4)} · avg R ${mid} per 1 ZiG`;
  }
  return `ZAR: ≈ R ${mid} per 1 ZiG (mid only)`;
}
