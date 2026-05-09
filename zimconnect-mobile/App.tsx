import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabs } from "./src/components/BottomTabs";
import { ChatScreen } from "./src/screens/ChatScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MallScreen } from "./src/screens/MallScreen";
import { ServicesScreen } from "./src/screens/ServicesScreen";
import { OfficialNewsScreen } from "./src/screens/OfficialNewsScreen";
import { ZimJobsScreen } from "./src/screens/ZimJobsScreen";
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

export default function App() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [officialNewsOpen, setOfficialNewsOpen] = useState(false);
  const [zimJobsOpen, setZimJobsOpen] = useState(false);
  const scrollBottomPad = 140 + Math.max(insets.bottom, 0);

  const goToTab = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const handleTabPress = (tab: TabKey) => {
    setOfficialNewsOpen(false);
    setZimJobsOpen(false);
    setActiveTab(tab);
  };

  const content = useMemo(() => {
    if (officialNewsOpen) {
      return <OfficialNewsScreen onClose={() => setOfficialNewsOpen(false)} />;
    }
    if (zimJobsOpen) {
      return <ZimJobsScreen onClose={() => setZimJobsOpen(false)} />;
    }
    if (activeTab === "home") {
      return (
        <HomeScreen
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAction={goToTab}
          onOpenOfficialNews={() => setOfficialNewsOpen(true)}
        />
      );
    }
    if (activeTab === "chat") return <ChatScreen searchQuery={searchQuery} />;
    if (activeTab === "wallet") return <WalletScreen searchQuery={searchQuery} />;
    if (activeTab === "mall") return <MallScreen searchQuery={searchQuery} />;
    return <ServicesScreen searchQuery={searchQuery} onOpenZimJobs={() => setZimJobsOpen(true)} />;
  }, [activeTab, officialNewsOpen, zimJobsOpen, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollBottomPad }]}
          scrollEnabled
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
          <Text style={styles.ownershipText}>
            Developed and owned by Fidinsky Tech Solutions
          </Text>
        </ScrollView>
        <BottomTabs tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
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
    padding: 16,
  },
  ownershipText: {
    marginTop: 10,
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});
