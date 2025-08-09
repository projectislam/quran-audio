import { useAppContext } from "@/context/AppContext";
import { getSurahByNumber } from "@/utils/surah.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const EnglishName = () => {
  const { currentSurah, theme } = useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  return (
    <View style={styles.root}>
      <Text style={[styles.name, { color: theme.primaryText }]}>
        {surah?.english}
      </Text>
      <Text style={[styles.translation, { color: theme.secondaryText }]}>
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
