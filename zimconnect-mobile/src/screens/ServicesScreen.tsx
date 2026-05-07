import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const services = [
  {
    title: "Zim-Health",
    description: "Book doctors, tele-health, and manage family records.",
  },
  {
    title: "Zim-Housing",
    description: "Verified rentals, property listings, and student housing.",
  },
  {
    title: "Zim-Transport",
    description: "Route tracking, bus bookings, and digital tickets.",
  },
  {
    title: "Zim-Education",
    description: "School fee payments and learning material access.",
  },
];

export function ServicesScreen() {
  return (
    <View>
      <Text style={styles.title}>Services</Text>
      <Text style={styles.subtitle}>Mini-programs for everyday life in Zimbabwe.</Text>

      {services.map((service) => (
        <View key={service.title} style={styles.serviceCard}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
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
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  serviceTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  serviceDescription: {
    marginTop: 4,
    color: colors.muted,
    lineHeight: 20,
  },
});

