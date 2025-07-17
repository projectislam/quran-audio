import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/surah.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const VerseCount = () => {
  const { currentSurah, isDarkMode } = useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  const themeStyle = useMemo(
    () => ({
      arabic: {
        color: isDarkMode ? "#ffffff" : "#1e293b",
      },
      verseCount: {
        color: isDarkMode ? "#64748b" : "#94a3b8",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={styles.root}>
      <Text style={[styles.arabic, themeStyle.arabic]}>{surah?.arabic}</Text>
      <Text style={[styles.verseCount, themeStyle.verseCount]}>
        {surah?.verses} verses
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  arabic: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
  },
  verseCount: {
    fontSize: 12,
  },
});
