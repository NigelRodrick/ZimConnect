import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const categories = ["Groceries", "Electronics", "Fashion", "Wholesale"];

const deals = [
  { title: "Family Grocery Pack", merchant: "GreenGrocer", price: "$24.99" },
  { title: "Solar Lantern", merchant: "Harare Tech", price: "$18.00" },
  { title: "Bulk Cooking Oil", merchant: "B2B Supplies", price: "$54.30" },
];

export function MallScreen() {
  return (
    <View>
      <Text style={styles.title}>Zim-Mall</Text>
      <Text style={styles.subtitle}>B2C, C2C, and B2B shopping in one place.</Text>

      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <View key={cat} style={styles.chip}>
            <Text style={styles.chipText}>{cat}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Top Deals</Text>
      {deals.map((deal) => (
        <View key={deal.title} style={styles.dealCard}>
          <View>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <Text style={styles.dealMeta}>{deal.merchant}</Text>
          </View>
          <Text style={styles.dealPrice}>{deal.price}</Text>
        </View>
      ))}
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
  chipText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 12,
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
});

