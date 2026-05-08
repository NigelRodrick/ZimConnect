import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";
import { colors } from "../theme/colors";

const categories = ["Groceries", "Electronics", "Fashion", "Wholesale"];

const deals = [
  {
    title: "Family Grocery Pack",
    merchant: "GreenGrocer",
    price: "$24.99",
    category: "Groceries",
  },
  { title: "Solar Lantern", merchant: "Harare Tech", price: "$18.00", category: "Electronics" },
  {
    title: "Bulk Cooking Oil",
    merchant: "B2B Supplies",
    price: "$54.30",
    category: "Wholesale",
  },
  { title: "Weekend Outfit Bundle", merchant: "City Fashion", price: "$31.20", category: "Fashion" },
];

const storeTypes = [
  "Supermarkets",
  "Hardware",
  "Pharmacies",
  "Electronics",
  "Fashion",
  "Home & Furniture",
] as const;
type StoreType = (typeof storeTypes)[number];

const onlineStores: { name: string; type: StoreType; city: string }[] = [
  { name: "OK Zimbabwe Online", type: "Supermarkets", city: "Harare" },
  { name: "TM Pick n Pay Online", type: "Supermarkets", city: "Bulawayo" },
  { name: "Food World Online", type: "Supermarkets", city: "Mutare" },
  { name: "Spar Zimbabwe Online", type: "Supermarkets", city: "Gweru" },
  { name: "N. Richards Hardware", type: "Hardware", city: "Harare" },
  { name: "Electrosales Hardware", type: "Hardware", city: "Bulawayo" },
  { name: "Halsted Brothers", type: "Hardware", city: "Mutare" },
  { name: "PG Timbers Online", type: "Hardware", city: "Masvingo" },
  { name: "Booties Pharmacy Online", type: "Pharmacies", city: "Harare" },
  { name: "HealthPoint Pharmacy", type: "Pharmacies", city: "Bulawayo" },
  { name: "PlusB Pharmacy", type: "Pharmacies", city: "Gweru" },
  { name: "Sam Levy Electronics Hub", type: "Electronics", city: "Harare" },
  { name: "Techzim Marketplace", type: "Electronics", city: "Mutare" },
  { name: "Gadget Zone ZW", type: "Electronics", city: "Bulawayo" },
  { name: "Edgars Zimbabwe Online", type: "Fashion", city: "Harare" },
  { name: "Jet Zimbabwe Online", type: "Fashion", city: "Bulawayo" },
  { name: "Truworths Zimbabwe", type: "Fashion", city: "Gweru" },
  { name: "TV Sales & Home", type: "Home & Furniture", city: "Harare" },
  { name: "Restapedic ZW Online", type: "Home & Furniture", city: "Bulawayo" },
  { name: "City Home Centre", type: "Home & Furniture", city: "Mutare" },
];

type MallScreenProps = {
  searchQuery: string;
};

export function MallScreen({ searchQuery }: MallScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Groceries");
  const [selectedStoreType, setSelectedStoreType] = useState<StoreType>("Supermarkets");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredDeals = useMemo(
    () =>
      deals.filter(
        (deal) =>
          deal.category === selectedCategory &&
          (!normalizedQuery ||
            deal.title.toLowerCase().includes(normalizedQuery) ||
            deal.merchant.toLowerCase().includes(normalizedQuery))
      ),
    [selectedCategory, normalizedQuery]
  );
  const filteredStores = useMemo(
    () =>
      onlineStores.filter(
        (store) =>
          store.type === selectedStoreType &&
          (!normalizedQuery ||
            store.name.toLowerCase().includes(normalizedQuery) ||
            store.city.toLowerCase().includes(normalizedQuery))
      ),
    [selectedStoreType, normalizedQuery]
  );

  return (
    <View>
      <Text style={styles.title}>Zim-Mall</Text>
      <Text style={styles.subtitle}>B2C, C2C, and B2B shopping in one place.</Text>

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

      <Text style={styles.sectionTitle}>Top Deals - {selectedCategory}</Text>
      {filteredDeals.map((deal) => (
        <View key={deal.title} style={styles.dealCard}>
          <View>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <Text style={styles.dealMeta}>{deal.merchant}</Text>
          </View>
          <Text style={styles.dealPrice}>{deal.price}</Text>
        </View>
      ))}
      {!filteredDeals.length ? (
        <Text style={styles.emptyText}>No deals found for this category/search.</Text>
      ) : null}

      <Text style={styles.sectionTitle}>Online Stores in Zimbabwe</Text>
      <Text style={styles.subtitle}>
        Browse by store type: supermarkets, hardware, pharmacies, electronics, fashion, and home.
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
        <View key={store.name} style={styles.dealCard}>
          <View>
            <Text style={styles.dealTitle}>{store.name}</Text>
            <Text style={styles.dealMeta}>{store.city}</Text>
          </View>
          <Text style={styles.dealPrice}>{store.type}</Text>
        </View>
      ))}
      {!filteredStores.length ? (
        <Text style={styles.emptyText}>No stores found for this type/search.</Text>
      ) : null}
      <Text style={styles.signatureText}>Fidinsky Tech Solutions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  dealPrice: {
    color: colors.primary,
    fontWeight: "700",
  },
  emptyText: {
    color: colors.muted,
    marginTop: 8,
  },
  signatureText: {
    marginTop: 4,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});

