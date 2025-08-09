import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/surah.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const VerseCount = () => {
  const { currentSurah, theme } = useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  return (
    <View style={styles.root}>
      <Text style={[styles.arabic, { color: theme.primaryText }]}>
        {surah?.arabic}
      </Text>
      <Text style={[styles.verseCount, { color: theme.secondaryText }]}>
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
