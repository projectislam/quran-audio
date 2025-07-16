import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/quran.data";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export const LastPlayedDetail = () => {
  const { isDarkMode, currentSurah, currentVerse } = useAppContext();
  const currentSurahData = useMemo(
    () => getSurahByNumber(currentSurah),
    [currentSurah]
  );

  const themeStyle = useMemo(
    () => ({
      surah: {
        color: isDarkMode ? "#ffffff" : "#1e293b",
      },
      ayaInfo: {
        color: isDarkMode ? "#94a3b8" : "#64748b",
      },
    }),
    [isDarkMode]
  );

  return (
    <>
      <Text style={[styles.surahName, themeStyle.surah]}>
        {currentSurahData?.name || `Surah ${currentSurah}`}
      </Text>
      <Text style={[styles.ayaInfo, themeStyle.ayaInfo]}>
        Verse {currentVerse}
        {currentSurahData?.ayas.length
          ? ` of ${currentSurahData.ayas.length}`
          : ""}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  surahName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ayaInfo: {
    fontSize: 14,
    marginBottom: 16,
  },
});
