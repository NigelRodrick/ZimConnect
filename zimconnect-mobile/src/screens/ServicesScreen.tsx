import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
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

type ServicesScreenProps = {
  searchQuery: string;
};

export function ServicesScreen({ searchQuery }: ServicesScreenProps) {
  const [savedServices, setSavedServices] = useState<string[]>([]);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const toggleService = (serviceTitle: string) => {
    setSavedServices((current) =>
      current.includes(serviceTitle)
        ? current.filter((item) => item !== serviceTitle)
        : [...current, serviceTitle]
    );
  };
  const visibleServices = services.filter(
    (item) =>
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
  );

  return (
    <View>
      <Text style={styles.title}>Services</Text>
      <Text style={styles.subtitle}>Mini-programs for everyday life in Zimbabwe.</Text>

      {visibleServices.map((service) => (
        <Pressable
          key={service.title}
          onPress={() => toggleService(service.title)}
          style={[
            styles.serviceCard,
            savedServices.includes(service.title) && styles.serviceCardSaved,
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.saveText}>
              {savedServices.includes(service.title) ? "Saved" : "Tap to save"}
            </Text>
          </View>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </Pressable>
      ))}
      {!visibleServices.length ? (
        <Text style={styles.emptyText}>No services found for this search.</Text>
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
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  serviceCardSaved: {
    borderColor: colors.primary,
    backgroundColor: "#F0F6F4",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  serviceTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  saveText: {
    color: colors.info,
    fontSize: 12,
    fontWeight: "600",
  },
  serviceDescription: {
    marginTop: 4,
    color: colors.muted,
    lineHeight: 20,
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

