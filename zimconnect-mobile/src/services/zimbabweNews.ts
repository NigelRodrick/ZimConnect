import { ZIMBABWE_NEWS_FEEDS } from "../config/zimbabweFreeApis";

export type ZimbabweNewsItem = {
  title: string;
  link: string;
  pubDate: string | null;
};

const FEEDS = [...ZIMBABWE_NEWS_FEEDS];

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  let v = m[1].trim();
  v = v.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1").trim();
  v = v.replace(/<[^>]+>/g, "");
  return v.replace(/\s+/g, " ").trim();
}

function parseRssItems(xml: string): ZimbabweNewsItem[] {
  const items: ZimbabweNewsItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    let link = extractTag(block, "link");
    if (!link) link = extractTag(block, "guid");
    const pubDateRaw = extractTag(block, "pubDate");
    if (title && link) {
      items.push({
        title,
        link: link.trim(),
        pubDate: pubDateRaw || null,
      });
    }
  }
  return items;
}

function dedupeByTitle(items: ZimbabweNewsItem[]): ZimbabweNewsItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchZimbabweNews(): Promise<ZimbabweNewsItem[]> {
  const all: ZimbabweNewsItem[] = [];
  const errors: string[] = [];

  for (const url of FEEDS) {
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
      const parsed = parseRssItems(xml);
      all.push(...parsed);
    } catch (e) {
      errors.push(`${url}: ${e instanceof Error ? e.message : "network error"}`);
    }
  }

  if (!all.length) {
    throw new Error(
      errors.length
        ? `Could not load news. ${errors[0]}`
        : "Could not load Zimbabwe news. Check your connection and try again."
    );
  }

  return dedupeByTitle(all).slice(0, 40);
}
