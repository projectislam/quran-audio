import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { getSurahByNumber } from "../utils/surah.data";

export const SurahHeader = () => {
  const { currentSurah, isDarkMode } = useAppContext();
  const surah = getSurahByNumber(currentSurah);

  const styles = StyleSheet.create({
    surahItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      paddingHorizontal: 20,
      paddingVertical: 16,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 16,
    },
    surahNumber: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 20,
    },

    backButton: {
      padding: 4,
    },
    surahNumberText: {
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
      color: isDarkMode ? "#e2e8f0" : "#374151",
    },
    surahTranslation: {
      fontSize: 14,
      color: isDarkMode ? "#94a3b8" : "#64748b",
    },
    surahRight: {
      alignItems: "flex-end",
      marginLeft: 16,
    },
    surahArabic: {
      fontWeight: "bold",
      marginBottom: 4,
      fontSize: 18,
      color: isDarkMode ? "#ffffff" : "#1e293b",
    },
    surahVerses: {
      fontSize: 12,
      color: isDarkMode ? "#64748b" : "#94a3b8",
    },
  });

  return (
    <View style={styles.surahItem}>
      <View style={styles.surahNumber}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "#10b981"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.surahContent}>
        <View style={styles.surahLeft}>
          <Text style={styles.surahEnglish}>{surah?.english}</Text>
          <Text style={styles.surahTranslation}>{surah?.translation}</Text>
        </View>

        <View style={styles.surahRight}>
          <Text style={styles.surahArabic}>{surah?.arabic}</Text>
          <Text style={styles.surahVerses}>{surah?.verses} verses</Text>
        </View>
      </View>
    </View>
  );
};
