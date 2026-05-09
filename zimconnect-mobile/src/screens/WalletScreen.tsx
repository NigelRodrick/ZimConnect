import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "../theme/colors";
import {
  fetchZigMarketRates,
  formatZarPerZig,
  formatZigPerEur,
  formatZigPerUsd,
  type ZigMarketRates,
} from "../services/zigMarketRates";

const transactions = [
  { label: "QR Payment - Mbare Market", amount: "-$12.50", tone: "debit" },
  { label: "Transfer from Tawanda", amount: "+$45.00", tone: "credit" },
  { label: "ZETDC Bill Payment", amount: "-$20.00", tone: "debit" },
];

const zimbabweBanks = [
  "CBZ Bank",
  "Steward Bank",
  "Stanbic Bank Zimbabwe",
  "CABS",
  "NMB Bank",
  "FBC Bank",
  "BancABC Zimbabwe",
  "ZB Bank",
  "Ecobank Zimbabwe",
  "First Capital Bank Zimbabwe",
  "POSB",
  "Metbank",
  "Agrisure Bank",
];

const walletActions = ["Add Funds", "Withdraw", "Transfer", "Scan"];

type WalletScreenProps = {
  searchQuery: string;
};

export function WalletScreen({ searchQuery }: WalletScreenProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState<"USD" | "ZiG">("USD");
  const [loggedInBanks, setLoggedInBanks] = useState<string[]>([]);
  const [zigRates, setZigRates] = useState<ZigMarketRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const loadRates = useCallback(async () => {
    setRatesError(null);
    try {
      const data = await fetchZigMarketRates();
      setZigRates(data);
    } catch (e) {
      setRatesError(e instanceof Error ? e.message : "Could not load rates.");
      setZigRates(null);
    } finally {
      setRatesLoading(false);
    }
  }, []);

  useEffect(() => {
    setRatesLoading(true);
    loadRates();
  }, [loadRates]);

  const activeBalance = useMemo(
    () => (activeCurrency === "USD" ? "$1,284.73" : "ZiG 13,240.55"),
    [activeCurrency]
  );
  const filteredTransactions = useMemo(() => {
    if (!normalizedQuery) return transactions;
    return transactions.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);
  const visibleBanks = useMemo(() => {
    if (!normalizedQuery) return zimbabweBanks;
    return zimbabweBanks.filter((bank) => bank.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const toggleBankLogin = (bank: string) => {
    setLoggedInBanks((current) =>
      current.includes(bank) ? current.filter((item) => item !== bank) : [...current, bank]
    );
  };

  return (
    <View>
      <View style={styles.marketRatesCard}>
        <View style={styles.marketRatesHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.marketRatesTitle}>ZiG · RBZ interbank</Text>
            <Text style={styles.marketRatesSub}>
              Official Reserve Bank of Zimbabwe tables as JSON via zimrate.statotec.com (bid / ask /
              avg). Your bank may quote differently. Falls back to open FX data if this feed is
              unavailable.
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setRatesLoading(true);
              loadRates();
            }}
            style={styles.ratesRefreshBtn}
            disabled={ratesLoading}
          >
            <Text style={styles.ratesRefreshText}>{ratesLoading ? "…" : "↻"}</Text>
          </Pressable>
        </View>
        {ratesLoading && !zigRates ? (
          <View style={styles.ratesLoadingRow}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={styles.ratesLoadingText}>Fetching rates…</Text>
          </View>
        ) : null}
        {ratesError ? <Text style={styles.ratesErrorText}>{ratesError}</Text> : null}
        {zigRates ? (
          <View style={styles.ratesBody}>
            <Text style={styles.rateProvider}>
              Source: {zigRates.provider === "rbz" ? "RBZ (ZimRate)" : "Open FX fallback"}
            </Text>
            <Text style={styles.rateLine}>{formatZigPerUsd(zigRates.usd)}</Text>
            <Text style={styles.rateLine}>{formatZarPerZig(zigRates.zarPerZig)}</Text>
            <Text style={styles.rateLine}>{formatZigPerEur(zigRates.eur)}</Text>
            {zigRates.dateLabel ? (
              <Text style={styles.rateDate}>RBZ table date: {zigRates.dateLabel}</Text>
            ) : null}
            {zigRates.lastUpdated ? (
              <Text style={styles.rateDate}>Feed updated: {zigRates.lastUpdated}</Text>
            ) : null}
          </View>
        ) : null}
      </View>

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

      <View style={styles.quickActionsGrid}>
        {walletActions.map((action) => (
          <Pressable key={action} style={styles.quickActionCard}>
            <Text style={styles.quickActionLabel}>{action}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.protectionCard}>
        <Text style={styles.protectionTitle}>Zim-Connect Buyer Protection</Text>
        <Text style={styles.protectionText}>
          Secure payments and 24/7 dispute support for wallet transactions.
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

      <Text style={styles.sectionTitle}>Linked Banks (Zimbabwe)</Text>
      <Text style={styles.banksHint}>
        Tap a bank to log in. You can be logged into multiple banks at the same time.
      </Text>
      {visibleBanks.map((bank) => {
        const isLoggedIn = loggedInBanks.includes(bank);
        return (
          <Pressable
            key={bank}
            onPress={() => toggleBankLogin(bank)}
            style={[styles.bankRow, isLoggedIn && styles.bankRowActive]}
          >
            <Text style={[styles.bankName, isLoggedIn && styles.bankNameActive]}>{bank}</Text>
            <Text style={[styles.bankStatus, isLoggedIn && styles.bankStatusActive]}>
              {isLoggedIn ? "Logged in" : "Log in"}
            </Text>
          </Pressable>
        );
      })}
      {!visibleBanks.length ? (
        <Text style={styles.emptyText}>No bank found for this search.</Text>
      ) : null}
      <Text style={styles.signatureText}>Fidinsky Tech Solutions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  marketRatesCard: {
    backgroundColor: "#EEF6FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C5D9F5",
    padding: 12,
    marginBottom: 14,
  },
  marketRatesHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  marketRatesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  marketRatesSub: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
  },
  ratesRefreshBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C5D9F5",
  },
  ratesRefreshText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.info,
  },
  ratesLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  ratesLoadingText: {
    fontSize: 13,
    color: colors.muted,
  },
  ratesErrorText: {
    color: "#B42318",
    fontSize: 13,
    marginTop: 4,
  },
  ratesBody: {
    gap: 6,
  },
  rateProvider: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: 2,
  },
  rateLine: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "600",
    lineHeight: 19,
  },
  rateDate: {
    marginTop: 6,
    fontSize: 11,
    color: colors.muted,
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
  quickActionsGrid: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  quickActionLabel: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  protectionCard: {
    backgroundColor: "#F3F7F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 4,
  },
  protectionTitle: {
    color: colors.text,
    fontWeight: "700",
  },
  protectionText: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 18,
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
  banksHint: {
    color: colors.muted,
    marginBottom: 8,
    lineHeight: 18,
  },
  bankRow: {
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
  bankRowActive: {
    borderColor: colors.primary,
    backgroundColor: "#F0F6F4",
  },
  bankName: {
    color: colors.text,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  bankNameActive: {
    color: colors.primary,
  },
  bankStatus: {
    color: colors.info,
    fontSize: 12,
    fontWeight: "700",
  },
  bankStatusActive: {
    color: colors.success,
  },
  signatureText: {
    marginTop: 4,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});

