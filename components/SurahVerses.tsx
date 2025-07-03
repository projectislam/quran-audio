import { useAppContext } from "@/context/AppContext";
import { numberToArabic } from "@/utils/numberToArabic";
import { getSurahByNumber } from "@/utils/quran.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const SurahVerses = () => {
  const { currentSurah, currentVerse, setCurrentVerse, isDarkMode } =
    useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  const styles = StyleSheet.create({
    versesContent: {
      paddingHorizontal: 4,
      paddingVertical: 16,
    },
    versesText: {
      alignItems: "flex-end",
    },
    arabicText: {
      fontSize: 24,
      lineHeight: 40,
      color: isDarkMode ? "white" : "black",
      textAlign: "right",
      writingDirection: "rtl",
      fontFamily: "hafs",
    },
    currentArabicText: {
      color: "#6ee7b7",
    },
  });

  return (
    <View style={styles.versesContent}>
      <View style={styles.versesText}>
        <Text
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {surah?.ayas.map((verse) => (
            <Text
              key={verse.index}
              style={[
                styles.arabicText,
                currentVerse === verse.index && styles.currentArabicText,
              ]}
              onPress={() => setCurrentVerse(verse.index)}
            >
              {verse.text +
                " " +
                String.fromCharCode(0xfd3f) +
                numberToArabic(verse.index) +
                String.fromCharCode(0xfd3e) +
                " "}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
};
