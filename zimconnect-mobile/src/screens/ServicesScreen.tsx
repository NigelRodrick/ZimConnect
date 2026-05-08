import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { colors } from "../theme/colors";

const services = [
  {
    title: "Zim-Bill",
    description: "Pay utility bills, buy tokens, and manage recurring payments.",
  },
  {
    title: "zim-government",
    description: "Access key government payments, renewals, and service requests.",
  },
  {
    title: "zim-agric",
    description: "Farm input marketplace, weather insights, and produce price updates.",
  },
  {
    title: "zim-jobs",
    description: "Find jobs, gigs, and verified service providers near you.",
  },
  {
    title: "Zim-Health",
    description: "Ambulance, polyclinics, hospitals, and all related health services.",
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
const zimHealthServices = [
  "Ambulance",
  "Polyclinics",
  "Hospitals",
  "Doctor Appointments",
  "Tele-health",
  "Pharmacies",
  "Laboratory Tests",
  "Maternal Care",
  "Emergency Care",
  "Family Health Records",
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
          {service.title === "Zim-Health" ? (
            <View style={styles.healthTags}>
              {zimHealthServices.map((item) => (
                <View key={item} style={styles.healthTag}>
                  <Text style={styles.healthTagText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}
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
  healthTags: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  healthTag: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  healthTagText: {
    color: colors.primary,
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

