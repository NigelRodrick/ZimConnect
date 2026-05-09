import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "../theme/colors";
import {
  CURATED_ONLINE_STORES,
  fetchMallRetailSpotlight,
  spotlightMatchesCategory,
  type MallSpotlightItem,
} from "../services/zimMall";

const categories = ["All", "Groceries", "Electronics", "Fashion", "Wholesale"] as const;

const storeTypes = [
  "Supermarkets",
  "Hardware",
  "Pharmacies",
  "Electronics",
  "Fashion",
  "Home & Furniture",
  "Wholesale",
] as const;
type StoreType = (typeof storeTypes)[number];

type MallScreenProps = {
  searchQuery: string;
};

export function MallScreen({ searchQuery }: MallScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStoreType, setSelectedStoreType] = useState<StoreType>("Supermarkets");
  const [spotlight, setSpotlight] = useState<MallSpotlightItem[]>([]);
  const [spotlightLoading, setSpotlightLoading] = useState(true);
  const [spotlightError, setSpotlightError] = useState<string | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const loadSpotlight = useCallback(async () => {
    setSpotlightError(null);
    try {
      const data = await fetchMallRetailSpotlight();
      setSpotlight(data);
    } catch (e) {
      setSpotlightError(e instanceof Error ? e.message : "Could not load highlights.");
      setSpotlight([]);
    } finally {
      setSpotlightLoading(false);
    }
  }, []);

  useEffect(() => {
    setSpotlightLoading(true);
    loadSpotlight();
  }, [loadSpotlight]);

  const filteredSpotlight = useMemo(
    () =>
      spotlight.filter(
        (item) =>
          spotlightMatchesCategory(item.title, selectedCategory) &&
          (!normalizedQuery || item.title.toLowerCase().includes(normalizedQuery))
      ),
    [spotlight, selectedCategory, normalizedQuery]
  );

  const flashItems = useMemo(() => {
    const base = spotlight.filter(
      (item) => !normalizedQuery || item.title.toLowerCase().includes(normalizedQuery)
    );
    return base.slice(0, 5);
  }, [spotlight, normalizedQuery]);

  const verifiedVendors = useMemo(
    () => CURATED_ONLINE_STORES.filter((s) => s.verified),
    []
  );

  const filteredStores = useMemo(
    () =>
      CURATED_ONLINE_STORES.filter(
        (store) =>
          store.type === selectedStoreType &&
          (!normalizedQuery ||
            store.name.toLowerCase().includes(normalizedQuery) ||
            store.city.toLowerCase().includes(normalizedQuery))
      ),
    [selectedStoreType, normalizedQuery]
  );

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Zim-Mall</Text>
          <Text style={styles.subtitle}>B2C, C2C, and B2B shopping in one place.</Text>
        </View>
        <Pressable
          onPress={() => {
            setSpotlightLoading(true);
            loadSpotlight();
          }}
          style={styles.refreshBtn}
          disabled={spotlightLoading}
        >
          <Text style={styles.refreshBtnText}>{spotlightLoading ? "…" : "↻"}</Text>
        </Pressable>
      </View>

      {spotlightError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{spotlightError}</Text>
          <Pressable onPress={loadSpotlight}>
            <Text style={styles.retryLink}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Retail headlines (online)</Text>
      <Text style={styles.hint}>
        Latest Zimbabwe retail & shopping news — tap a card to read. Stores below use real shop
        links.
      </Text>

      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {spotlightLoading && !spotlight.length ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Loading retail headlines…</Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Top stories — {selectedCategory}</Text>
      {filteredSpotlight.map((item, i) => (
        <Pressable key={`${item.link}-${i}`} onPress={() => openUrl(item.link)} style={styles.dealCard}>
          <View style={styles.dealTextCol}>
            <Text style={styles.dealTitle}>{item.title}</Text>
            <Text style={styles.dealMeta}>{item.pubDate ?? "Recent"}</Text>
          </View>
          <Text style={styles.dealAction}>Read →</Text>
        </Pressable>
      ))}
      {!spotlightLoading && !filteredSpotlight.length ? (
        <Text style={styles.emptyText}>No headlines for this category/search.</Text>
      ) : null}

      <View style={styles.flashDealsCard}>
        <View style={styles.flashDealsHeader}>
          <Text style={styles.flashDealsTitle}>Flash · newest first</Text>
          <Text style={styles.flashDealsTimer}>From live RSS</Text>
        </View>
        {flashItems.map((item, i) => (
          <Pressable
            key={`flash-${item.link}-${i}`}
            onPress={() => openUrl(item.link)}
            style={styles.flashRow}
          >
            <View style={styles.flashTextCol}>
              <Text style={styles.dealTitle}>{item.title}</Text>
              <Text style={styles.flashDate}>{item.pubDate ?? ""}</Text>
            </View>
            <Text style={styles.dealAction}>Open</Text>
          </Pressable>
        ))}
        {!flashItems.length && !spotlightLoading ? (
          <Text style={styles.emptyTextSmall}>No flash items yet.</Text>
        ) : null}
      </View>

      <Text style={styles.sectionTitle}>Verified local stores (directory)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vendorScroll}>
        {verifiedVendors.map((vendor) => (
          <Pressable
            key={vendor.name + vendor.url}
            onPress={() => openUrl(vendor.url)}
            style={styles.vendorCard}
          >
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Text style={styles.vendorMeta}>{vendor.type}</Text>
            <Text style={styles.vendorLink}>Shop online →</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Online stores in Zimbabwe</Text>
      <Text style={styles.subtitle}>
        Curated public shop links — tap a row to open in your browser.
      </Text>
      <View style={styles.categoryRow}>
        {storeTypes.map((type) => (
          <Pressable
            key={type}
            onPress={() => setSelectedStoreType(type)}
            style={[styles.chip, selectedStoreType === type && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedStoreType === type && styles.chipTextActive]}>
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredStores.map((store) => (
        <Pressable
          key={store.name + store.url}
          onPress={() => openUrl(store.url)}
          style={styles.dealCard}
        >
          <View style={styles.dealTextCol}>
            <Text style={styles.dealTitle}>{store.name}</Text>
            <Text style={styles.dealMeta}>{store.city}</Text>
          </View>
          <Text style={styles.dealAction}>{store.type}</Text>
        </Pressable>
      ))}
      {!filteredStores.length ? (
        <Text style={styles.emptyText}>No stores found for this type/search.</Text>
      ) : null}
      <Text style={styles.signatureText}>Fidinsky Tech Solutions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  refreshBtn: {
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#EEF4F2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE9E5",
  },
  refreshBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  errorBanner: {
    backgroundColor: "#FFF4F4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorText: {
    color: "#B42318",
    fontSize: 13,
  },
  retryLink: {
    marginTop: 6,
    color: colors.info,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    color: colors.muted,
  },
  hint: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 10,
    lineHeight: 17,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 13,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: "#EEF4F2",
    borderColor: "#DDE9E5",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 12,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  dealCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  dealTextCol: {
    flex: 1,
    marginRight: 8,
  },
  dealTitle: {
    color: colors.text,
    fontWeight: "700",
  },
  dealMeta: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
  },
  dealAction: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  flashDealsCard: {
    backgroundColor: "#FFF8EE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
  },
  flashDealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  flashDealsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
  },
  flashDealsTimer: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 12,
  },
  flashRow: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  flashTextCol: {
    flex: 1,
    marginRight: 8,
  },
  flashDate: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 11,
  },
  emptyText: {
    color: colors.muted,
    marginTop: 8,
  },
  emptyTextSmall: {
    color: colors.muted,
    fontSize: 12,
  },
  vendorScroll: {
    marginBottom: 14,
  },
  vendorCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginRight: 8,
    minWidth: 160,
  },
  vendorName: {
    color: colors.text,
    fontWeight: "700",
  },
  vendorMeta: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 12,
  },
  vendorLink: {
    marginTop: 8,
    color: colors.info,
    fontWeight: "600",
    fontSize: 12,
  },
  signatureText: {
    marginTop: 4,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});
