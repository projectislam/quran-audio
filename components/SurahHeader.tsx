import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { getSurahByNumber } from "../utils/surah.data";

export const SurahHeader = () => {
  const { currentSurah, isDarkMode } = useAppContext();
  const surah = getSurahByNumber(currentSurah);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    backButton: {
      padding: 4,
    },
    headerText: {
      gap: 2,
    },
    surahName: {
      fontSize: 20,
      fontWeight: "600",
      color: isDarkMode ? "white" : "#1e293b",
    },
    surahMeaning: {
      fontSize: 14,
      color: isDarkMode ? "#d1d5db" : "#64748b",
    },
    arabicName: {
      fontSize: 24,
      color: isDarkMode ? "white" : "#1e293b",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "#10b981"}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.surahName}>{surah?.english}</Text>
          <Text style={styles.surahMeaning}>{surah?.translation}</Text>
        </View>
      </View>
      <Text style={styles.arabicName}>{surah?.arabic}</Text>
    </View>
  );
};
