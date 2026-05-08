import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import { colors } from "../theme/colors";

const conversations = [
  {
    name: "Mai Chipo",
    preview: "Ndatuma quote for uniforms.",
    time: "14:03",
    badge: "2",
    unread: true,
    official: false,
    online: true,
  },
  {
    name: "ZETDC Official",
    preview: "Token purchase issue resolved.",
    time: "12:22",
    badge: "",
    unread: false,
    official: true,
    online: false,
  },
  {
    name: "GreenGrocer",
    preview: "Your order is out for delivery.",
    time: "09:17",
    badge: "1",
    unread: true,
    official: false,
    online: true,
  },
];

const zimbabweProviders = ["Econet", "NetOne", "Telecel"];

type ChatScreenProps = {
  searchQuery: string;
};

export function ChatScreen({ searchQuery }: ChatScreenProps) {
  const [filter, setFilter] = useState<"all" | "unread" | "official">("all");
  const [chatTab, setChatTab] = useState<"friends" | "official">("friends");
  const [selectedProvider, setSelectedProvider] = useState<string>("Econet");
  const [mainNumber, setMainNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [dataSaverEnabled, setDataSaverEnabled] = useState(true);
  const [autoDownloadMode, setAutoDownloadMode] = useState<"off" | "wifi" | "mobile">("wifi");
  const [lowDataCallsEnabled, setLowDataCallsEnabled] = useState(true);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleConversations = useMemo(() => {
    const byTab =
      chatTab === "official"
        ? conversations.filter((item) => item.official)
        : conversations.filter((item) => !item.official || item.unread);
    const byFilter =
      filter === "unread"
        ? byTab.filter((item) => item.unread)
        : filter === "official"
          ? byTab.filter((item) => item.official)
          : byTab;

    if (!normalizedQuery) return byFilter;
    return byFilter.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.preview.toLowerCase().includes(normalizedQuery)
    );
  }, [chatTab, filter, normalizedQuery]);

  const normalizedNumber = useMemo(
    () => mainNumber.replace(/\s+/g, "").replace(/-/g, ""),
    [mainNumber]
  );
  const canCreateAccount = normalizedNumber.length >= 9;

  const handleCreateAccount = () => {
    if (!canCreateAccount) return;
    setAccountName(`${selectedProvider} ${normalizedNumber}`);
  };

  const estimatedDataUsage = useMemo(() => {
    if (dataSaverEnabled) return "~18 MB / month";
    if (autoDownloadMode === "mobile") return "~240 MB / month";
    if (autoDownloadMode === "wifi") return "~90 MB / month";
    return "~55 MB / month";
  }, [autoDownloadMode, dataSaverEnabled]);

  return (
    <View>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>Voice notes, translation, and trusted official accounts.</Text>
      <View style={styles.quickBar}>
        <Pressable style={styles.quickButton}>
          <Text style={styles.quickButtonText}>New Chat</Text>
        </Pressable>
        <Pressable style={styles.quickButton}>
          <Text style={styles.quickButtonText}>Broadcast</Text>
        </Pressable>
      </View>
      <View style={styles.topTabs}>
        <Pressable
          onPress={() => setChatTab("friends")}
          style={[styles.topTab, chatTab === "friends" && styles.topTabActive]}
        >
          <Text style={[styles.topTabText, chatTab === "friends" && styles.topTabTextActive]}>
            Friends
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setChatTab("official")}
          style={[styles.topTab, chatTab === "official" && styles.topTabActive]}
        >
          <Text style={[styles.topTabText, chatTab === "official" && styles.topTabTextActive]}>
            Official Accounts
          </Text>
        </Pressable>
      </View>

      <View style={styles.accountCard}>
        <Text style={styles.accountTitle}>Create Chat Account</Text>
        <Text style={styles.accountHint}>
          Use your main Zimbabwe mobile number. It becomes your account name.
        </Text>
        <View style={styles.providerRow}>
          {zimbabweProviders.map((provider) => (
            <Pressable
              key={provider}
              onPress={() => setSelectedProvider(provider)}
              style={[
                styles.providerChip,
                selectedProvider === provider && styles.providerChipActive,
              ]}
            >
              <Text
                style={[
                  styles.providerChipText,
                  selectedProvider === provider && styles.providerChipTextActive,
                ]}
              >
                {provider}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.numberRow}>
          <Text style={styles.numberLabel}>Main Number</Text>
          <TextInput
            value={mainNumber}
            onChangeText={setMainNumber}
            placeholder="+263 77 123 4567"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            style={styles.numberInput}
          />
        </View>
        <Pressable
          onPress={handleCreateAccount}
          style={[styles.createButton, !canCreateAccount && styles.createButtonDisabled]}
        >
          <Text style={styles.createButtonText}>Create Account Name</Text>
        </Pressable>
        {accountName ? <Text style={styles.accountNameText}>Account name: {accountName}</Text> : null}
      </View>

      <View style={styles.dataCard}>
        <Text style={styles.dataTitle}>Mobile Data</Text>
        <Text style={styles.dataHint}>
          Control how Chat uses your mobile data for messages, media, and calls.
        </Text>
        <Pressable
          onPress={() => setDataSaverEnabled((prev) => !prev)}
          style={[styles.dataRow, dataSaverEnabled && styles.dataRowActive]}
        >
          <Text style={styles.dataRowLabel}>Data Saver</Text>
          <Text style={[styles.dataRowValue, dataSaverEnabled && styles.dataRowValueActive]}>
            {dataSaverEnabled ? "On" : "Off"}
          </Text>
        </Pressable>
        <Text style={styles.modeTitle}>Auto-download media</Text>
        <View style={styles.modeRow}>
          {(["off", "wifi", "mobile"] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => setAutoDownloadMode(mode)}
              style={[styles.modeChip, autoDownloadMode === mode && styles.modeChipActive]}
            >
              <Text
                style={[
                  styles.modeChipText,
                  autoDownloadMode === mode && styles.modeChipTextActive,
                ]}
              >
                {mode === "off" ? "Off" : mode === "wifi" ? "Wi-Fi only" : "Mobile + Wi-Fi"}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => setLowDataCallsEnabled((prev) => !prev)}
          style={[styles.dataRow, lowDataCallsEnabled && styles.dataRowActive]}
        >
          <Text style={styles.dataRowLabel}>Low-data voice calls</Text>
          <Text style={[styles.dataRowValue, lowDataCallsEnabled && styles.dataRowValueActive]}>
            {lowDataCallsEnabled ? "Enabled" : "Disabled"}
          </Text>
        </Pressable>
        <View style={styles.usageBox}>
          <Text style={styles.usageTitle}>Estimated Chat usage</Text>
          <Text style={styles.usageValue}>{estimatedDataUsage}</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Pressable
          onPress={() => setFilter("all")}
          style={[styles.filterChip, filter === "all" && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>All</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("unread")}
          style={[styles.filterChip, filter === "unread" && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, filter === "unread" && styles.filterTextActive]}>
            Unread
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("official")}
          style={[styles.filterChip, filter === "official" && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, filter === "official" && styles.filterTextActive]}>
            Official
          </Text>
        </Pressable>
      </View>

      {visibleConversations.map((item) => (
        <View key={item.name} style={styles.row}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            {item.online ? <View style={styles.onlineDot} /> : null}
          </View>
          <View style={styles.messageBody}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              {item.official ? <Text style={styles.officialBadge}>Official</Text> : null}
            </View>
            <Text style={styles.preview}>{item.preview}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.time}>{item.time}</Text>
            {item.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
      <Pressable style={styles.loadOlderCard}>
        <Text style={styles.loadOlderText}>Load older messages</Text>
      </Pressable>
      {!visibleConversations.length ? (
        <Text style={styles.emptyText}>No conversations found for this search/filter.</Text>
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
    marginBottom: 10,
    fontSize: 14,
    color: colors.muted,
  },
  quickBar: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  quickButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  quickButtonText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  topTabs: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginBottom: 12,
  },
  topTab: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
  },
  topTabActive: {
    backgroundColor: "#F0F6F4",
  },
  topTabText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  topTabTextActive: {
    color: colors.primary,
  },
  accountCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  accountTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  accountHint: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  providerRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  providerChip: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  providerChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  providerChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  providerChipTextActive: {
    color: "#FFFFFF",
  },
  numberRow: {
    backgroundColor: "#F8FAF9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 10,
  },
  numberLabel: {
    color: colors.muted,
    fontSize: 11,
    marginBottom: 3,
  },
  numberInput: {
    color: colors.text,
    fontWeight: "600",
    paddingVertical: 0,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  createButtonDisabled: {
    opacity: 0.55,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  accountNameText: {
    marginTop: 8,
    color: colors.success,
    fontWeight: "600",
  },
  dataCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  dataTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  dataHint: {
    marginTop: 4,
    marginBottom: 10,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  dataRow: {
    backgroundColor: "#F8FAF9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataRowActive: {
    borderColor: colors.primary,
    backgroundColor: "#F0F6F4",
  },
  dataRowLabel: {
    color: colors.text,
    fontWeight: "600",
  },
  dataRowValue: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  dataRowValueActive: {
    color: colors.primary,
  },
  modeTitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
  },
  modeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  modeChip: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  modeChipTextActive: {
    color: "#FFFFFF",
  },
  usageBox: {
    marginTop: 2,
    backgroundColor: "#FFF8EE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
  },
  usageTitle: {
    color: colors.muted,
    fontSize: 12,
  },
  usageValue: {
    marginTop: 2,
    color: colors.text,
    fontWeight: "700",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  avatarWrap: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF5F2",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  avatarText: {
    color: colors.primary,
    fontWeight: "700",
  },
  messageBody: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    color: colors.text,
    fontWeight: "700",
  },
  officialBadge: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
  },
  preview: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  meta: {
    alignItems: "flex-end",
    gap: 6,
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  loadOlderCard: {
    marginTop: 2,
    marginBottom: 6,
    backgroundColor: "#F8FAF9",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    paddingVertical: 12,
    alignItems: "center",
  },
  loadOlderText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
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

