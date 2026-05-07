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

type MallScreenProps = {
  searchQuery: string;
};

export function MallScreen({ searchQuery }: MallScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Groceries");
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

