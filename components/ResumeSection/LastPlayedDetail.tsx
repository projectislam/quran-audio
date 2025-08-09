import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/quran.data";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export const LastPlayedDetail = () => {
  const { theme, currentSurah, currentVerse } = useAppContext();
  const currentSurahData = useMemo(
    () => getSurahByNumber(currentSurah),
    [currentSurah]
  );

  return (
    <>
      <Text style={[styles.surahName, { color: theme.primaryText }]}>
        {currentSurahData?.name || `Surah ${currentSurah}`}
      </Text>
      <Text style={[styles.ayaInfo, { color: theme.secondaryText }]}>
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
