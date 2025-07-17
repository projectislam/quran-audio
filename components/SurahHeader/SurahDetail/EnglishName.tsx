import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/surah.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const EnglishName = () => {
  const { currentSurah, isDarkMode } = useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [isDarkMode]);

  const themeStyle = useMemo(
    () => ({
      name: {
        color: isDarkMode ? "#e2e8f0" : "#374151",
      },
      translation: {
        color: isDarkMode ? "#94a3b8" : "#64748b",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={styles.root}>
      <Text style={[styles.name, themeStyle.name]}>{surah?.english}</Text>
      <Text style={[styles.translation, themeStyle.translation]}>
        {surah?.translation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  translation: {
    fontSize: 14,
  },
});
