import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import { colors } from "../theme/colors";
import { TabKey } from "../types/navigation";

type QuickAction = {
  title: string;
  subtitle: string;
  targetTab: TabKey;
};

const quickActions: QuickAction[] = [
  { title: "Scan to Pay", subtitle: "Instant QR payments", targetTab: "wallet" },
  { title: "Wallet", subtitle: "USD / ZiG balances", targetTab: "wallet" },
  { title: "Official News", subtitle: "Local updates", targetTab: "chat" },
  { title: "Pay Fees", subtitle: "School and utility", targetTab: "services" },
];

const coreServices = [
  "Housing",
  "News",
  "Education",
  "Tourism",
  "Groceries",
  "Business",
  "Services",
  "Utilities",
];

type HomeScreenProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onQuickAction: (tab: TabKey) => void;
};

export function HomeScreen({ searchQuery, onSearchChange, onQuickAction }: HomeScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleActions = useMemo(() => {
    if (!normalizedQuery) return quickActions;
    return quickActions.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.subtitle.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  return (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Welcome to Zim-Connect</Text>
        <Text style={styles.heroSubtitle}>
          One app for chat, wallet, commerce, and services.
        </Text>
      </View>
      <TextInput
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder="Search services, merchants, chats..."
        placeholderTextColor={colors.muted}
        style={styles.searchInput}
      />

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {visibleActions.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => {
              setSelectedAction(item.title);
              onQuickAction(item.targetTab);
            }}
            style={[
              styles.actionCard,
              selectedAction === item.title && styles.actionCardSelected,
            ]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </Pressable>
        ))}
      </View>
      {!visibleActions.length ? (
        <Text style={styles.emptyText}>No quick actions match your search.</Text>
      ) : null}
      {selectedAction ? (
        <View style={styles.selectionCard}>
          <Text style={styles.selectionTitle}>{selectedAction}</Text>
          <Text style={styles.selectionText}>
            Shortcut selected. This will route to the full flow in the next build.
          </Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Core Services</Text>
      <View style={styles.serviceGrid}>
        {coreServices.map((service) => (
          <View key={service} style={styles.servicePill}>
            <Text style={styles.servicePillText}>{service}</Text>
          </View>
        ))}
      </View>

      <View style={styles.promoCard}>
        <Text style={styles.promoLabel}>PROMOTED</Text>
        <Text style={styles.promoTitle}>Invest in Zim-Bonds</Text>
        <Text style={styles.promoText}>Start today with as little as $10.</Text>
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
      <Text style={styles.signatureText}>Fidinsky Tech Solutions</Text>
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
  searchInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    color: colors.text,
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
  actionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: "#F0F6F4",
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
  selectionCard: {
    backgroundColor: "#FFF8EE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
  },
  selectionTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: 4,
  },
  selectionText: {
    color: colors.muted,
    lineHeight: 20,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  servicePill: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  servicePillText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  promoCard: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  promoLabel: {
    color: "#CFE5DD",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  promoText: {
    color: "#E3EFEA",
    marginTop: 2,
  },
  emptyText: {
    color: colors.muted,
    marginBottom: 12,
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
  signatureText: {
    marginTop: 4,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});

