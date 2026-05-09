import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { colors } from "../theme/colors";
import { useLocalWeather } from "../hooks/useLocalWeather";
import { searchPlacesByName, type GeocodePlace } from "../services/weather";

function placeRowLabel(p: GeocodePlace): string {
  return p.detail ? `${p.name} · ${p.detail}` : p.name;
}

export function WeatherHomeCard() {
  const {
    data,
    loading,
    error,
    refresh,
    selectCity,
    clearCitySearch,
    citySearchActive,
  } = useLocalWeather();

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<GeocodePlace[]>([]);

  const runSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) {
      setCandidates([]);
      return;
    }
    setSearchError(null);
    setSearching(true);
    setCandidates([]);
    try {
      const hits = await searchPlacesByName(q, 8);
      setCandidates(hits);
      if (!hits.length) {
        setSearchError("No places found. Try another spelling.");
      }
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : "Search failed.");
    } finally {
      setSearching(false);
    }
  }, [query]);

  const pickPlace = useCallback(
    (p: GeocodePlace) => {
      selectCity(p.latitude, p.longitude, placeRowLabel(p));
      setCandidates([]);
      setQuery("");
    },
    [selectCity]
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Weather</Text>
          <Text style={styles.sub}>
            Open-Meteo forecast · GPS or search a city (e.g. Mutare, Bulawayo)
          </Text>
        </View>
        <Pressable onPress={refresh} style={styles.refresh} disabled={loading}>
          <Text style={styles.refreshText}>{loading ? "…" : "↻"}</Text>
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search city or town…"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={runSearch}
        />
        <Pressable onPress={runSearch} style={styles.searchBtn} disabled={searching}>
          <Text style={styles.searchBtnText}>{searching ? "…" : "Search"}</Text>
        </Pressable>
      </View>

      {citySearchActive ? (
        <Pressable onPress={clearCitySearch} style={styles.useGpsBtn}>
          <Text style={styles.useGpsText}>Use device location instead</Text>
        </Pressable>
      ) : null}

      {searchError ? <Text style={styles.searchErr}>{searchError}</Text> : null}

      {candidates.length > 0 ? (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Pick a place</Text>
          {candidates.map((p) => (
            <Pressable
              key={`${p.latitude}-${p.longitude}-${p.name}`}
              onPress={() => pickPlace(p)}
              style={styles.resultRow}
            >
              <Text style={styles.resultName}>{p.name}</Text>
              <Text style={styles.resultDetail}>{p.detail || p.countryCode || "—"}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {loading && !data ? (
        <View style={styles.centerRow}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={styles.muted}>Loading forecast…</Text>
        </View>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data ? (
        <View style={styles.body}>
          <Text style={styles.place}>{data.placeLabel}</Text>
          {data.locationMode === "city_search" ? (
            <Text style={styles.modeHint}>City search · not GPS</Text>
          ) : null}
          <Text style={styles.temp}>{Math.round(data.snapshot.temperatureC)}°C</Text>
          <Text style={styles.condition}>{data.snapshot.condition}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>Humidity {data.snapshot.humidity}%</Text>
            <Text style={styles.meta}>Wind {data.snapshot.windKmh.toFixed(0)} km/h</Text>
          </View>
          {data.usingFallbackLocation ? (
            <Text style={styles.hint}>Turn on location, or search for your city above.</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E8F4FC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C5DDF0",
    padding: 12,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  sub: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
  },
  refresh: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C5DDF0",
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.info,
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C5DDF0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
  },
  searchBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  useGpsBtn: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  useGpsText: {
    color: colors.info,
    fontWeight: "700",
    fontSize: 13,
  },
  searchErr: {
    color: "#B42318",
    fontSize: 12,
    marginBottom: 6,
  },
  results: {
    marginBottom: 10,
    gap: 6,
  },
  resultsTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: 4,
  },
  resultRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C5DDF0",
    padding: 10,
  },
  resultName: {
    fontWeight: "700",
    color: colors.text,
    fontSize: 14,
  },
  resultDetail: {
    marginTop: 2,
    fontSize: 12,
    color: colors.muted,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  muted: {
    fontSize: 13,
    color: colors.muted,
  },
  error: {
    color: "#B42318",
    fontSize: 13,
  },
  body: {
    marginTop: 4,
  },
  place: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  modeHint: {
    marginTop: 2,
    fontSize: 11,
    color: colors.muted,
    fontStyle: "italic",
  },
  temp: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 4,
  },
  condition: {
    fontSize: 15,
    color: colors.text,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  hint: {
    marginTop: 8,
    fontSize: 11,
    color: colors.muted,
    fontStyle: "italic",
  },
});
