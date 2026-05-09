import {
  ActivityIndicator,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../theme/colors";
import { fetchZimbabweNews, type ZimbabweNewsItem } from "../services/zimbabweNews";

type OfficialNewsScreenProps = {
  onClose: () => void;
};

export function OfficialNewsScreen({ onClose }: OfficialNewsScreenProps) {
  const [items, setItems] = useState<ZimbabweNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchZimbabweNews();
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load news.");
      setItems([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const openArticle = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Official News</Text>
        <Text style={styles.subtitle}>Live Zimbabwe headlines (RSS)</Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.hint}>Loading current news…</Text>
        </View>
      ) : null}

      {error && !loading ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => load()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <Text style={styles.empty}>No articles found.</Text>
      ) : null}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <Pressable
            key={`${item.link}-${index}`}
            onPress={() => openArticle(item.link)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.pubDate ? <Text style={styles.cardMeta}>{item.pubDate}</Text> : null}
            <Text style={styles.cardLink}>Read article →</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minHeight: 400,
  },
  header: {
    marginBottom: 12,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 8,
    paddingVertical: 4,
  },
  backText: {
    color: colors.info,
    fontWeight: "700",
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },
  centered: {
    paddingVertical: 24,
    alignItems: "center",
    gap: 8,
  },
  hint: {
    color: colors.muted,
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: "#FFF4F4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: "#B42318",
    lineHeight: 20,
  },
  retryBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  empty: {
    color: colors.muted,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 21,
  },
  cardMeta: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 12,
  },
  cardLink: {
    marginTop: 8,
    color: colors.info,
    fontWeight: "600",
    fontSize: 13,
  },
});
