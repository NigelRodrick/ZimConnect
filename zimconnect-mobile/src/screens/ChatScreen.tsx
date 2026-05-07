import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const conversations = [
  {
    name: "Mai Chipo",
    preview: "Ndatuma quote for uniforms.",
    time: "14:03",
    badge: "2",
  },
  {
    name: "ZETDC Official",
    preview: "Token purchase issue resolved.",
    time: "12:22",
    badge: "",
  },
  {
    name: "GreenGrocer",
    preview: "Your order is out for delivery.",
    time: "09:17",
    badge: "1",
  },
];

export function ChatScreen() {
  return (
    <View>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>
        Voice notes, translation, and trusted official accounts.
      </Text>

      {conversations.map((item) => (
        <View key={item.name} style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
          <View style={styles.messageBody}>
            <Text style={styles.name}>{item.name}</Text>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF5F2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.primary,
    fontWeight: "700",
  },
  messageBody: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: colors.text,
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
});

