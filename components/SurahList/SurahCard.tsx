import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onPress: () => void;
  surah: {
    number: number;
    arabic: string;
    english: string;
    translation: string;
    verses: number;
  };
};

export const SurahCard: React.FC<Props> = ({ onPress, surah }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      root: {
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      },
      number: {
        backgroundColor: isDarkMode ? "#10b981" : "#10b981",
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
    <TouchableOpacity style={[styles.root, themeStyle.root]} onPress={onPress}>
      <View style={[styles.number, themeStyle.number]}>
        <Text style={styles.numberText}>{surah.number}</Text>
      </View>
      <View style={styles.surahContent}>
        <View style={styles.surahLeft}>
          <Text style={[styles.surahEnglish, themeStyle.surahEnglish]}>
            {surah.english}
          </Text>
          <Text style={[styles.surahTranslation, themeStyle.surahTranslation]}>
            {surah.translation}
          </Text>
        </View>

        <View style={styles.surahRight}>
          <Text style={[styles.surahArabic, themeStyle.surahArabic]}>
            {surah.arabic}
          </Text>
          <Text style={[styles.surahVerses, themeStyle.surahVerses]}>
            {surah.verses} verses
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  numberText: {
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
