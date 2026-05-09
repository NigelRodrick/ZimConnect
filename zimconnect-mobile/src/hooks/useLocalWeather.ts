import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_ZW_COORDS,
  fetchPlaceLabel,
  fetchWeatherAt,
  type WeatherResult,
} from "../services/weather";

export type CityOverride = { latitude: number; longitude: number; label: string };

export function useLocalWeather() {
  const [data, setData] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityOverride, setCityOverride] = useState<CityOverride | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      if (cityOverride) {
        const snapshot = await fetchWeatherAt(cityOverride.latitude, cityOverride.longitude);
        setData({
          snapshot,
          placeLabel: cityOverride.label,
          usingFallbackLocation: false,
          locationMode: "city_search",
        });
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      const usingFallback = status !== "granted";
      let lat = DEFAULT_ZW_COORDS.latitude;
      let lon = DEFAULT_ZW_COORDS.longitude;
      if (!usingFallback) {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
      }
      const snapshot = await fetchWeatherAt(lat, lon);
      let placeLabel: string;
      if (usingFallback) {
        placeLabel = "Harare (default — enable location)";
      } else {
        const geo = await fetchPlaceLabel(lat, lon);
        placeLabel = geo.trim() || "Your area";
      }
      setData({
        snapshot,
        placeLabel,
        usingFallbackLocation: usingFallback,
        locationMode: usingFallback ? "harare_fallback" : "device",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load weather.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [cityOverride]);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  const selectCity = useCallback((latitude: number, longitude: number, label: string) => {
    setCityOverride({ latitude, longitude, label });
  }, []);

  const clearCitySearch = useCallback(() => {
    setCityOverride(null);
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    selectCity,
    clearCitySearch,
    citySearchActive: cityOverride !== null,
  };
}
