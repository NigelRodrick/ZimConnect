import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import { BottomTabs } from "./src/components/BottomTabs";
import { ChatScreen } from "./src/screens/ChatScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MallScreen } from "./src/screens/MallScreen";
import { ServicesScreen } from "./src/screens/ServicesScreen";
import { WalletScreen } from "./src/screens/WalletScreen";
import { colors } from "./src/theme/colors";
import { TabItem, TabKey } from "./src/types/navigation";

const tabs: TabItem[] = [
  { key: "home", label: "Home", icon: "⌂" },
  { key: "chat", label: "Chat", icon: "✉" },
  { key: "wallet", label: "Wallet", icon: "$" },
  { key: "mall", label: "Mall", icon: "🛍" },
  { key: "services", label: "Services", icon: "◫" },
];

function getTimeBasedGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const greeting = getTimeBasedGreeting(new Date().getHours());

  const goToTab = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const content = useMemo(() => {
    if (activeTab === "home") {
      return <HomeScreen searchQuery={searchQuery} onQuickAction={goToTab} />;
    }
    if (activeTab === "chat") return <ChatScreen searchQuery={searchQuery} />;
    if (activeTab === "wallet") return <WalletScreen searchQuery={searchQuery} />;
    if (activeTab === "mall") return <MallScreen searchQuery={searchQuery} />;
    return <ServicesScreen searchQuery={searchQuery} />;
  }, [activeTab, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.shellHeader}>
            <View>
              <Text style={styles.greeting}>{`${greeting}, Nigel`}</Text>
              <Text style={styles.identityMeta}>Verified Account - Harare</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </View>

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search services, merchants, chats..."
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />

          {content}
          <Text style={styles.ownershipText}>
            Developed and owned by Fidinsky Tech Solutions
          </Text>
        </ScrollView>
        <BottomTabs tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 110,
  },
  shellHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  greeting: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  identityMeta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  notificationBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  notificationText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
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
  ownershipText: {
    marginTop: 10,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});
