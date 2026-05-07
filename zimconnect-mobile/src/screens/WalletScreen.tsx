import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const transactions = [
  { label: "QR Payment - Mbare Market", amount: "-$12.50", tone: "debit" },
  { label: "Transfer from Tawanda", amount: "+$45.00", tone: "credit" },
  { label: "ZETDC Bill Payment", amount: "-$20.00", tone: "debit" },
];

export function WalletScreen() {
  return (
    <View>
      <Text style={styles.title}>Zim-Wallet</Text>
      <Text style={styles.subtitle}>Multi-currency, QR pay, and P2P transfers.</Text>

      <View style={styles.balanceCard}>
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>USD Balance</Text>
          <Text style={styles.balanceValue}>$1,284.73</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>ZiG Balance</Text>
          <Text style={styles.balanceValue}>ZiG 13,240.55</Text>
        </View>
      </View>

      <View style={styles.rateCard}>
        <Text style={styles.rateTitle}>Live FX</Text>
        <Text style={styles.rateText}>1 USD = 10.31 ZiG</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {transactions.map((item) => (
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
});

