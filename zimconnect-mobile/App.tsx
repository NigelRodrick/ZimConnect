import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const content = useMemo(() => {
    if (activeTab === "home") return <HomeScreen />;
    if (activeTab === "chat") return <ChatScreen />;
    if (activeTab === "wallet") return <WalletScreen />;
    if (activeTab === "mall") return <MallScreen />;
    return <ServicesScreen />;
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {content}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
});
