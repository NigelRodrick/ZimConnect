/**
 * Mall data: curated Zimbabwe online retailers (public URLs) + live retail headlines (RSS).
 */

import { ZIMBABWE_RETAIL_NEWS_FEEDS } from "../config/zimbabweFreeApis";

export type CuratedOnlineStore = {
  name: string;
  type: string;
  city: string;
  url: string;
  /** Shown in “Verified” strip when true */
  verified?: boolean;
};

export type MallSpotlightItem = {
  title: string;
  link: string;
  pubDate: string | null;
  postedAtMs: number;
};

const RETAIL_FEEDS = [...ZIMBABWE_RETAIL_NEWS_FEEDS];

/** Major Zimbabwe retailers with public shop or corporate sites (maintain as real URLs change). */
export const CURATED_ONLINE_STORES: CuratedOnlineStore[] = [
  {
    name: "OK Zimbabwe — OK Online",
    type: "Supermarkets",
    city: "Harare · click & collect / delivery",
    url: "https://okonline.co.zw/",
    verified: true,
  },
  {
    name: "SPAR Zimbabwe",
    type: "Supermarkets",
    city: "Harare, Bulawayo, Mutare, Kwekwe, Marondera",
    url: "https://spar.co.zw/",
    verified: true,
  },
  {
    name: "Choppies Zimbabwe",
    type: "Supermarkets",
    city: "Multiple cities",
    url: "https://www.choppies.co.zw/",
    verified: true,
  },
  {
    name: "N. Richards Group",
    type: "Hardware",
    city: "Harare · branches nationwide",
    url: "https://www.nrichards.co.zw/",
    verified: true,
  },
  {
    name: "Halsted Builders Express",
    type: "Hardware",
    city: "Harare, Bulawayo, Mutare…",
    url: "https://www.halsted.co.zw/",
    verified: true,
  },
  {
    name: "Beta Holdings (builders & paint)",
    type: "Hardware",
    city: "National network",
    url: "https://www.beta.co.zw/",
    verified: false,
  },
  {
    name: "PG Timbers",
    type: "Hardware",
    city: "Timber & boards",
    url: "https://www.pgtimbers.co.zw/",
    verified: true,
  },
  {
    name: "MedOrange Pharmacy",
    type: "Pharmacies",
    city: "Online · Harare focus",
    url: "https://medorange.co.zw/",
    verified: true,
  },
  {
    name: "Heritage Pharmacy",
    type: "Pharmacies",
    city: "Harare",
    url: "https://heritagepharmacy.co.zw/",
    verified: false,
  },
  {
    name: "Electrosales (appliances & tech)",
    type: "Electronics",
    city: "Harare · TVs, audio & more",
    url: "https://www.electrosales.co.zw/",
    verified: true,
  },
  {
    name: "Gain Cash & Carry (wholesale)",
    type: "Wholesale",
    city: "Harare",
    url: "https://www.gain.co.zw/",
    verified: false,
  },
  {
    name: "Mahomed Mussa Wholesalers",
    type: "Wholesale",
    city: "Harare",
    url: "https://www.mmwholesalers.co.zw/",
    verified: true,
  },
  {
    name: "Edgars Zimbabwe",
    type: "Fashion",
    city: "Stores & online",
    url: "https://www.edgars.co.zw/",
    verified: true,
  },
  {
    name: "Jet Stores Zimbabwe",
    type: "Fashion",
    city: "Stores & online",
    url: "https://www.jet.co.zw/",
    verified: true,
  },
  {
    name: "Truworths Zimbabwe",
    type: "Fashion",
    city: "Stores",
    url: "https://www.truworths.co.zw/",
    verified: true,
  },
  {
    name: "TV Sales & Home",
    type: "Home & Furniture",
    city: "Harare · furniture & appliances",
    url: "https://www.tvsales.co.zw/",
    verified: true,
  },
  {
    name: "Croco Motors (parts & showroom)",
    type: "Electronics",
    city: "Harare",
    url: "https://www.crocomotors.co.zw/",
    verified: true,
  },
];

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  let v = m[1].trim();
  v = v.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1").trim();
  v = v.replace(/<[^>]+>/g, "");
  return v.replace(/\s+/g, " ").trim();
}

function parseRssSpotlight(xml: string): MallSpotlightItem[] {
  const items: MallSpotlightItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    let link = extractTag(block, "link");
    if (!link) link = extractTag(block, "guid");
    const pubDateRaw = extractTag(block, "pubDate");
    const pubDate = pubDateRaw || null;
    const postedAtMs = pubDate ? Date.parse(pubDate) : 0;
    if (title && link) {
      items.push({
        title,
        link: link.trim(),
        pubDate,
        postedAtMs: Number.isFinite(postedAtMs) ? postedAtMs : 0,
      });
    }
  }
  return items;
}

function dedupeSpotlight(items: MallSpotlightItem[]): MallSpotlightItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const k = item.link.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export async function fetchMallRetailSpotlight(): Promise<MallSpotlightItem[]> {
  const all: MallSpotlightItem[] = [];
  const errors: string[] = [];

  for (const url of RETAIL_FEEDS) {
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
      all.push(...parseRssSpotlight(xml));
    } catch (e) {
      errors.push(`${url}: ${e instanceof Error ? e.message : "network error"}`);
    }
  }

  if (!all.length) {
    throw new Error(
      errors.length
        ? `Could not load mall highlights. ${errors[0]}`
        : "Could not load mall highlights. Check your connection."
    );
  }

  return dedupeSpotlight(all).sort((a, b) => b.postedAtMs - a.postedAtMs);
}

/** Map deal category chips to keywords in RSS titles (Zimbabwe retail context). */
export function spotlightMatchesCategory(title: string, category: string): boolean {
  const t = title.toLowerCase();
  switch (category) {
    case "All":
      return true;
    case "Groceries":
      return (
        /grocery|supermarket|food|spar|ok zimbabwe|dairy|meal|maize|bread|retail chain/i.test(
          title
        ) || /\b(ok|pick|food|shop)\b/.test(t)
      );
    case "Electronics":
      return /electronic|phone|mobile|laptop|gadget|appliance|solar|tech\b|digital/i.test(title);
    case "Fashion":
      return /fashion|clothing|textile|apparel|edgars|truworths|jet\b|shoe/i.test(title);
    case "Wholesale":
      return /wholesale|bulk|supplier|distribution|cash\s*&\s*carry|mm\s*wholesale|inflation.*price/i.test(
        title
      );
    default:
      return true;
  }
}
