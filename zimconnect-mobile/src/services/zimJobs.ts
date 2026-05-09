import { ZIMBABWE_JOB_FEEDS } from "../config/zimbabweFreeApis";

export type ZimJobListing = {
  title: string;
  link: string;
  /** Raw RSS pubDate when present */
  pubDate: string | null;
  /** Epoch ms used for sorting (newest first) */
  postedAtMs: number;
  /** Feed origin label */
  source: string;
};

const FEEDS: { url: string; source: string }[] = [...ZIMBABWE_JOB_FEEDS];

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  let v = m[1].trim();
  v = v.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1").trim();
  v = v.replace(/<[^>]+>/g, "");
  return v.replace(/\s+/g, " ").trim();
}

function firstMatch(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return "";
  let v = m[1].trim();
  v = v.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1").trim();
  v = v.replace(/<[^>]+>/g, "");
  return v.replace(/\s+/g, " ").trim();
}

function parseRssItemsWithFallback(xml: string): {
  items: { title: string; link: string; pubDate: string | null }[];
  channelBuildMs: number;
} {
  const lastBuildRaw = firstMatch(xml, "lastBuildDate");
  const channelBuildMs = lastBuildRaw ? Date.parse(lastBuildRaw) : NaN;
  const baseMs = Number.isFinite(channelBuildMs) ? channelBuildMs : 0;

  const items: { title: string; link: string; pubDate: string | null }[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    let link = extractTag(block, "link");
    if (!link) link = extractTag(block, "guid");
    const pubDateRaw = extractTag(block, "pubDate");
    const pubDate = pubDateRaw || null;
    if (title && link) {
      items.push({ title, link: link.trim(), pubDate });
    }
  }

  return { items, channelBuildMs: baseMs };
}

function postedAtForItem(
  pubDate: string | null,
  channelBuildMs: number,
  feedOrderIndex: number
): number {
  if (pubDate) {
    const d = Date.parse(pubDate);
    if (Number.isFinite(d)) return d;
  }
  if (channelBuildMs > 0) {
    return channelBuildMs - feedOrderIndex;
  }
  return 0;
}

function dedupeByLinkThenTitle(items: ZimJobListing[]): ZimJobListing[] {
  const seenLink = new Set<string>();
  const seenTitle = new Set<string>();
  return items.filter((item) => {
    const lk = item.link.toLowerCase();
    if (seenLink.has(lk)) return false;
    seenLink.add(lk);
    const tk = item.title.toLowerCase().replace(/\s+/g, " ").trim();
    if (seenTitle.has(tk)) return false;
    seenTitle.add(tk);
    return true;
  });
}

export async function fetchZimJobListings(): Promise<ZimJobListing[]> {
  const all: ZimJobListing[] = [];
  const errors: string[] = [];

  for (const { url, source } of FEEDS) {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml, */*",
        },
      });
      if (!res.ok) {
        errors.push(`${url}: ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const { items, channelBuildMs } = parseRssItemsWithFallback(xml);
      items.forEach((row, idx) => {
        const postedAtMs = postedAtForItem(row.pubDate, channelBuildMs, idx);
        all.push({
          title: row.title,
          link: row.link,
          pubDate: row.pubDate,
          postedAtMs,
          source,
        });
      });
    } catch (e) {
      errors.push(`${url}: ${e instanceof Error ? e.message : "network error"}`);
    }
  }

  if (!all.length) {
    throw new Error(
      errors.length
        ? `Could not load job listings. ${errors[0]}`
        : "Could not load job listings. Check your connection and try again."
    );
  }

  const sorted = dedupeByLinkThenTitle(all).sort((a, b) => b.postedAtMs - a.postedAtMs);
  return sorted.slice(0, 80);
}
