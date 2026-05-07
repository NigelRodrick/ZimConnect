import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { TabItem, TabKey } from "../types/navigation";

type BottomTabsProps = {
  tabs: TabItem[];
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

export function BottomTabs({ tabs, activeTab, onTabPress }: BottomTabsProps) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
  },
  tabItemActive: {
    backgroundColor: "#F2E9DC",
  },
  tabIcon: {
    fontSize: 17,
    color: colors.muted,
  },
  tabIconActive: {
    color: colors.primary,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: colors.primary,
  },
});

