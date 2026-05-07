import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";
import { colors } from "../theme/colors";

const transactions = [
  { label: "QR Payment - Mbare Market", amount: "-$12.50", tone: "debit" },
  { label: "Transfer from Tawanda", amount: "+$45.00", tone: "credit" },
  { label: "ZETDC Bill Payment", amount: "-$20.00", tone: "debit" },
];

type WalletScreenProps = {
  searchQuery: string;
};

export function WalletScreen({ searchQuery }: WalletScreenProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState<"USD" | "ZiG">("USD");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const activeBalance = useMemo(
    () => (activeCurrency === "USD" ? "$1,284.73" : "ZiG 13,240.55"),
    [activeCurrency]
  );
  const filteredTransactions = useMemo(() => {
    if (!normalizedQuery) return transactions;
    return transactions.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  return (
    <View>
      <Text style={styles.title}>Zim-Wallet</Text>
      <Text style={styles.subtitle}>Multi-currency, QR pay, and P2P transfers.</Text>

      <View style={styles.toggleRow}>
        <Pressable
          onPress={() => setActiveCurrency("USD")}
          style={[
            styles.currencyChip,
            activeCurrency === "USD" && styles.currencyChipActive,
          ]}
        >
          <Text
            style={[
              styles.currencyChipText,
              activeCurrency === "USD" && styles.currencyChipTextActive,
            ]}
          >
            USD
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveCurrency("ZiG")}
          style={[
            styles.currencyChip,
            activeCurrency === "ZiG" && styles.currencyChipActive,
          ]}
        >
          <Text
            style={[
              styles.currencyChipText,
              activeCurrency === "ZiG" && styles.currencyChipTextActive,
            ]}
          >
            ZiG
          </Text>
        </Pressable>
        <Pressable onPress={() => setShowBalances((prev) => !prev)} style={styles.visibilityBtn}>
          <Text style={styles.visibilityBtnText}>{showBalances ? "Hide" : "Show"} balances</Text>
        </Pressable>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>USD Balance</Text>
          <Text style={styles.balanceValue}>{showBalances ? "$1,284.73" : "******"}</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>ZiG Balance</Text>
          <Text style={styles.balanceValue}>{showBalances ? "ZiG 13,240.55" : "******"}</Text>
        </View>
      </View>

      <View style={styles.rateCard}>
        <Text style={styles.rateTitle}>Selected Balance</Text>
        <Text style={styles.rateText}>
          {activeCurrency}: {showBalances ? activeBalance : "******"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {filteredTransactions.map((item) => (
        <View key={item.label} style={styles.txRow}>
          <Text style={styles.txLabel}>{item.label}</Text>
          <Text
            style={[
              styles.txAmount,
              item.tone === "credit" ? styles.credit : styles.debit,
            ]}
          >
            {item.amount}
          </Text>
        </View>
      ))}
      {!filteredTransactions.length ? (
        <Text style={styles.emptyText}>No transactions found for this search.</Text>
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
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  currencyChip: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  currencyChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  currencyChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  currencyChipTextActive: {
    color: "#FFFFFF",
  },
  visibilityBtn: {
    marginLeft: "auto",
  },
  visibilityBtnText: {
    color: colors.info,
    fontSize: 12,
    fontWeight: "600",
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  balanceBlock: {
    flex: 1,
  },
  balanceDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#3D6059",
    marginHorizontal: 12,
  },
  balanceLabel: {
    color: "#D4E3DE",
    fontSize: 12,
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  rateCard: {
    marginTop: 10,
    backgroundColor: "#FFF8EE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  rateTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  rateText: {
    marginTop: 4,
    color: colors.muted,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  txRow: {
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
  txLabel: {
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  txAmount: {
    fontWeight: "700",
  },
  credit: {
    color: colors.success,
  },
  debit: {
    color: "#B42318",
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

