import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type QuickAction = {
  title: string;
  subtitle: string;
};

const quickActions: QuickAction[] = [
  { title: "Scan to Pay", subtitle: "Instant QR payments" },
  { title: "Wallet", subtitle: "USD / ZiG balances" },
  { title: "News", subtitle: "Local updates" },
  { title: "Pay Fees", subtitle: "School and utility" },
];

export function HomeScreen() {
  return (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Welcome to Zim-Connect</Text>
        <Text style={styles.heroSubtitle}>
          One app for chat, wallet, commerce, and services.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {quickActions.map((item) => (
          <View key={item.title} style={styles.actionCard}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Updates</Text>
      <View style={styles.feedCard}>
        <Text style={styles.feedTitle}>ZETDC Official Account</Text>
        <Text style={styles.feedText}>
          Planned maintenance update for Harare suburbs this Friday.
        </Text>
      </View>
      <View style={styles.feedCard}>
        <Text style={styles.feedTitle}>Zim-Mall</Text>
        <Text style={styles.feedText}>
          Fresh groceries now available with same-day delivery.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#E5EFEA",
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 18,
  },
  actionCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },
  feedCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  feedText: {
    marginTop: 4,
    color: colors.muted,
    lineHeight: 20,
  },
});

