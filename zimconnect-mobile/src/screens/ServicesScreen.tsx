import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";
import { colors } from "../theme/colors";

const services = [
  {
    title: "Zim-Bill",
    description: "Pay utility bills, buy tokens, and manage recurring payments.",
    category: "Utilities",
    featured: true,
  },
  {
    title: "zim-government",
    description: "Access key government payments, renewals, and service requests.",
    category: "Public",
    featured: true,
  },
  {
    title: "zim-agric",
    description: "Farm input marketplace, weather insights, and produce price updates.",
    category: "Agriculture",
    featured: false,
  },
  {
    title: "zim-jobs",
    description: "Find jobs, gigs, and verified service providers near you.",
    category: "Work",
    featured: true,
  },
  {
    title: "Zim-Health",
    description: "Ambulance, polyclinics, hospitals, and all related health services.",
    category: "Health",
    featured: true,
  },
  {
    title: "Zim-Housing",
    description: "Verified rentals, property listings, and student housing.",
    category: "Housing",
    featured: false,
  },
  {
    title: "Zim-Transport",
    description: "Route tracking, bus bookings, and digital tickets.",
    category: "Mobility",
    featured: false,
  },
  {
    title: "Zim-Education",
    description: "School fee payments and learning material access.",
    category: "Education",
    featured: false,
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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((item) => item.category)))],
    []
  );

  const toggleService = (serviceTitle: string) => {
    setSavedServices((current) =>
      current.includes(serviceTitle)
        ? current.filter((item) => item !== serviceTitle)
        : [...current, serviceTitle]
    );
  };
  const visibleServices = services.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery);
    return categoryMatch && searchMatch;
  });
  const featuredServices = services.filter((item) => item.featured);

  return (
    <View>
      <Text style={styles.title}>Services</Text>
      <Text style={styles.subtitle}>Mini-programs for everyday life in Zimbabwe.</Text>
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{services.length}</Text>
          <Text style={styles.metricLabel}>Total Services</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{savedServices.length}</Text>
          <Text style={styles.metricLabel}>Saved</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{featuredServices.length}</Text>
          <Text style={styles.metricLabel}>Featured</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[styles.categoryChip, activeCategory === category && styles.categoryChipActive]}
          >
            <Text
              style={[styles.categoryChipText, activeCategory === category && styles.categoryChipTextActive]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Programs</Text>
      <View style={styles.featuredRow}>
        {featuredServices.map((service) => (
          <View key={service.title} style={styles.featuredCard}>
            <Text style={styles.featuredTitle}>{service.title}</Text>
            <Text style={styles.featuredMeta}>{service.category}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>All Services</Text>

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
            <View style={styles.serviceTitleWrap}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceCategory}>{service.category}</Text>
            </View>
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
    marginBottom: 10,
    fontSize: 14,
    color: colors.muted,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    alignItems: "center",
  },
  metricValue: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: "#EEF4F2",
    borderWidth: 1,
    borderColor: "#DDE9E5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  featuredRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: "#FFF8EE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  featuredTitle: {
    color: colors.text,
    fontWeight: "700",
  },
  featuredMeta: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
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
    alignItems: "flex-start",
    gap: 8,
  },
  serviceTitleWrap: {
    flex: 1,
    marginRight: 8,
  },
  serviceTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  serviceCategory: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
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

