import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { getSurahByNumber } from "../utils/surah.data";

export const SurahHeader = () => {
  const { currentSurah, isDarkMode } = useAppContext();
  const surah = getSurahByNumber(currentSurah);

  const themeStyle = useMemo(
    () => ({
      root: {
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      },
      surahEnglish: {
        color: isDarkMode ? "#e2e8f0" : "#374151",
      },
      surahTranslation: {
        color: isDarkMode ? "#94a3b8" : "#64748b",
      },
      surahArabic: {
        color: isDarkMode ? "#ffffff" : "#1e293b",
      },
      surahVerses: {
        color: isDarkMode ? "#64748b" : "#94a3b8",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={[styles.root, themeStyle.root]}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "#10b981"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.surahContent}>
        <View style={styles.surahLeft}>
          <Text style={[styles.surahEnglish, themeStyle.surahEnglish]}>
            {surah?.english}
          </Text>
          <Text style={[styles.surahTranslation, themeStyle.surahTranslation]}>
            {surah?.translation}
          </Text>
        </View>

        <View style={styles.surahRight}>
          <Text style={[styles.surahArabic, themeStyle.surahArabic]}>
            {surah?.arabic}
          </Text>
          <Text style={[styles.surahVerses, themeStyle.surahVerses]}>
            {surah?.verses} verses
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  backButton: {
    padding: 4,
  },
  buttonWrapperText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  surahContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surahLeft: {
    flex: 1,
  },
  surahEnglish: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  surahTranslation: {
    fontSize: 14,
  },
  surahRight: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  surahArabic: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
  },
  surahVerses: {
    fontSize: 12,
  },
});
